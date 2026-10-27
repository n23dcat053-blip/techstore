using System.ComponentModel.DataAnnotations;

namespace TechStore.Api.Dtos;

public class CategoryRequest
{
    [Required, StringLength(100)]
    public string Name { get; set; } = string.Empty;

    [StringLength(10)]
    public string Icon { get; set; } = string.Empty;
}
