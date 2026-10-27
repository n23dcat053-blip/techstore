using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using TechStore.Api.Data;
using TechStore.Api.Dtos;
using TechStore.Api.Models;
using TechStore.Api.Security;

namespace TechStore.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly AppDbContext _db;
    private readonly IConfiguration _config;

    public AuthController(AppDbContext db, IConfiguration config)
    {
        _db = db;
        _config = config;
    }

    // POST api/auth/register -> tạo tài khoản khách hàng (role User) và đăng nhập luôn
    [HttpPost("register")]
    public async Task<ActionResult<LoginResponse>> Register(RegisterRequest request)
    {
        var username = request.Username.Trim().ToLowerInvariant();

        if (await _db.Users.AnyAsync(u => u.Username == username))
            return Conflict(new { message = "Tên đăng nhập đã tồn tại" });

        var user = new User
        {
            Username = username,
            PasswordHash = PasswordHasher.Hash(request.Password),
            FullName = request.FullName.Trim(),
            Role = "User",
        };
        _db.Users.Add(user);
        await _db.SaveChangesAsync();

        return Ok(CreateToken(user));
    }

    // POST api/auth/login -> trả về JWT nếu đúng tài khoản
    [HttpPost("login")]
    public async Task<ActionResult<LoginResponse>> Login(LoginRequest request)
    {
        var username = request.Username.Trim().ToLowerInvariant();
        var user = await _db.Users.FirstOrDefaultAsync(u => u.Username == username);

        if (user is null || !PasswordHasher.Verify(request.Password, user.PasswordHash))
            return Unauthorized(new { message = "Sai tên đăng nhập hoặc mật khẩu" });

        return Ok(CreateToken(user));
    }

    // GET api/auth/me -> thông tin người đang đăng nhập
    [Authorize]
    [HttpGet("me")]
    public IActionResult Me() => Ok(new
    {
        username = User.Identity?.Name,
        role = User.FindFirstValue(ClaimTypes.Role),
    });

    private LoginResponse CreateToken(User user)
    {
        var expires = DateTime.UtcNow.AddMinutes(_config.GetValue("Jwt:ExpireMinutes", 120));
        var claims = new[]
        {
            new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
            new Claim(ClaimTypes.Name, user.Username),
            new Claim(ClaimTypes.Role, user.Role),
        };

        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]!));
        var token = new JwtSecurityToken(
            issuer: _config["Jwt:Issuer"],
            audience: _config["Jwt:Audience"],
            claims: claims,
            expires: expires,
            signingCredentials: new SigningCredentials(key, SecurityAlgorithms.HmacSha256));

        return new LoginResponse(new JwtSecurityTokenHandler().WriteToken(token), user.Username, user.FullName, user.Role, expires);
    }
}
