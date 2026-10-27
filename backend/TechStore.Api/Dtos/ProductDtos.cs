using System.ComponentModel.DataAnnotations;
using TechStore.Api.Models;

namespace TechStore.Api.Dtos;

// Dữ liệu client gửi lên khi POST / PUT
public class ProductRequest
{
    [Required, StringLength(200)]
    public string Name { get; set; } = string.Empty;

    [StringLength(10)]
    public string Icon { get; set; } = "📦";

    [Range(0, double.MaxValue)]
    public decimal Price { get; set; }

    [Range(0, double.MaxValue)]
    public decimal OldPrice { get; set; }

    [Range(0, 5)]
    public double Rating { get; set; }

    [StringLength(50)]
    public string Badge { get; set; } = string.Empty;

    [StringLength(2000)]
    public string Description { get; set; } = string.Empty;

    public List<string> Specs { get; set; } = new();

    [Range(1, int.MaxValue, ErrorMessage = "Vui lòng chọn danh mục")]
    public int CategoryId { get; set; }
}

// Dữ liệu trả về cho client
public class ProductResponse
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Icon { get; set; } = string.Empty;
    public decimal Price { get; set; }
    public decimal OldPrice { get; set; }
    public double Rating { get; set; }
    public string Badge { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public List<string> Specs { get; set; } = new();
    public int CategoryId { get; set; }
    public string? CategoryName { get; set; }

    public static ProductResponse From(Product p) => new()
    {
        Id = p.Id,
        Name = p.Name,
        Icon = p.Icon,
        Price = p.Price,
        OldPrice = p.OldPrice,
        Rating = p.Rating,
        Badge = p.Badge,
        Description = p.Description,
        Specs = p.Specs.Split('|', StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries).ToList(),
        CategoryId = p.CategoryId,
        CategoryName = p.Category?.Name,
    };
}

public static class ProductMapping
{
    public static void Apply(this Product p, ProductRequest r)
    {
        p.Name = r.Name.Trim();
        p.Icon = string.IsNullOrWhiteSpace(r.Icon) ? "📦" : r.Icon;
        p.Price = r.Price;
        p.OldPrice = r.OldPrice;
        p.Rating = r.Rating;
        p.Badge = r.Badge ?? string.Empty;
        p.Description = r.Description ?? string.Empty;
        p.Specs = string.Join('|', r.Specs.Where(s => !string.IsNullOrWhiteSpace(s)).Select(s => s.Trim()));
        p.CategoryId = r.CategoryId;
    }
}
