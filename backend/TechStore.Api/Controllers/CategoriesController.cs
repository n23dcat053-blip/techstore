using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TechStore.Api.Data;
using TechStore.Api.Dtos;
using TechStore.Api.Models;

namespace TechStore.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CategoriesController : ControllerBase
{
    private readonly AppDbContext _db;

    public CategoriesController(AppDbContext db) => _db = db;

    public record CategoryResponse(int Id, string Name, string Icon);

    // GET api/categories
    [HttpGet]
    public async Task<ActionResult<IEnumerable<CategoryResponse>>> GetAll()
    {
        var items = await _db.Categories.AsNoTracking()
            .OrderBy(c => c.Id)
            .Select(c => new CategoryResponse(c.Id, c.Name, c.Icon))
            .ToListAsync();
        return Ok(items);
    }

    // GET api/categories/1
    [HttpGet("{id:int}")]
    public async Task<ActionResult<CategoryResponse>> GetById(int id)
    {
        var c = await _db.Categories.AsNoTracking().FirstOrDefaultAsync(x => x.Id == id);
        return c is null ? NotFound(new { message = "Không tìm thấy danh mục" }) : Ok(new CategoryResponse(c.Id, c.Name, c.Icon));
    }

    // POST api/categories
    [Authorize(Roles = "Admin")]
    [HttpPost]
    public async Task<ActionResult<CategoryResponse>> Create(CategoryRequest request)
    {
        var c = new Category { Name = request.Name.Trim(), Icon = request.Icon };
        _db.Categories.Add(c);
        await _db.SaveChangesAsync();
        return CreatedAtAction(nameof(GetById), new { id = c.Id }, new CategoryResponse(c.Id, c.Name, c.Icon));
    }

    // PUT api/categories/1
    [Authorize(Roles = "Admin")]
    [HttpPut("{id:int}")]
    public async Task<ActionResult<CategoryResponse>> Update(int id, CategoryRequest request)
    {
        var c = await _db.Categories.FindAsync(id);
        if (c is null)
            return NotFound(new { message = "Không tìm thấy danh mục" });

        c.Name = request.Name.Trim();
        c.Icon = request.Icon;
        await _db.SaveChangesAsync();
        return Ok(new CategoryResponse(c.Id, c.Name, c.Icon));
    }

    // DELETE api/categories/1
    [Authorize(Roles = "Admin")]
    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete(int id)
    {
        var c = await _db.Categories.FindAsync(id);
        if (c is null)
            return NotFound(new { message = "Không tìm thấy danh mục" });

        if (await _db.Products.AnyAsync(p => p.CategoryId == id))
            return Conflict(new { message = "Không thể xóa danh mục đang có sản phẩm" });

        _db.Categories.Remove(c);
        await _db.SaveChangesAsync();
        return NoContent();
    }
}
