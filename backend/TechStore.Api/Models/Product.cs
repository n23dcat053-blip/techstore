namespace TechStore.Api.Models;

public class Product
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Icon { get; set; } = "📦";
    public decimal Price { get; set; }
    public decimal OldPrice { get; set; }
    public double Rating { get; set; }
    public string Badge { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;

    // Các thông số, ngăn cách nhau bằng dấu '|'
    public string Specs { get; set; } = string.Empty;

    public int CategoryId { get; set; }
    public Category? Category { get; set; }
}
