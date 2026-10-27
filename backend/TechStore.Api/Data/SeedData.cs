using Microsoft.EntityFrameworkCore;
using TechStore.Api.Models;

namespace TechStore.Api.Data;

// Dữ liệu mẫu được đưa vào database qua migration (HasData)
public static class SeedData
{
    public static void Apply(ModelBuilder mb)
    {
        mb.Entity<Category>().HasData(
            new Category { Id = 1, Name = "Điện thoại", Icon = "📱" },
            new Category { Id = 2, Name = "Laptop", Icon = "💻" },
            new Category { Id = 3, Name = "Tai nghe", Icon = "🎧" },
            new Category { Id = 4, Name = "Đồng hồ thông minh", Icon = "⌚" },
            new Category { Id = 5, Name = "Máy tính bảng", Icon = "📲" },
            new Category { Id = 6, Name = "Phụ kiện", Icon = "🔌" }
        );

        mb.Entity<Product>().HasData(
            new Product { Id = 1, CategoryId = 1, Name = "Smartphone Nova X12 128GB", Icon = "📱", Price = 12990000, OldPrice = 14990000, Rating = 4.7, Badge = "Giảm 13%",
                Description = "Màn hình AMOLED 6.7 inch 120Hz, chip hiệu năng cao, camera 50MP chống rung quang học, pin 5000mAh sạc nhanh 67W.",
                Specs = "Màn hình 6.7\" AMOLED 120Hz|RAM 8GB / ROM 128GB|Camera 50MP + 12MP|Pin 5000mAh, sạc 67W" },
            new Product { Id = 2, CategoryId = 1, Name = "Smartphone Pixel Lite 256GB", Icon = "📱", Price = 8490000, OldPrice = 9490000, Rating = 4.5, Badge = "Bán chạy",
                Description = "Thiết kế mỏng nhẹ, camera AI thông minh, hỗ trợ 5G, bộ nhớ lớn cho nhu cầu hằng ngày.",
                Specs = "Màn hình 6.4\" OLED 90Hz|RAM 8GB / ROM 256GB|Camera 48MP|Pin 4500mAh" },
            new Product { Id = 3, CategoryId = 2, Name = "Laptop UltraBook Pro 14", Icon = "💻", Price = 24990000, OldPrice = 27990000, Rating = 4.8, Badge = "Mới",
                Description = "Laptop mỏng nhẹ 1.2kg, màn hình 2.8K, thời lượng pin đến 18 giờ, phù hợp sinh viên và dân văn phòng.",
                Specs = "CPU 12 nhân, RAM 16GB|SSD 512GB NVMe|Màn hình 14\" 2.8K OLED|Pin 18 giờ" },
            new Product { Id = 4, CategoryId = 2, Name = "Laptop Gaming Titan 15", Icon = "💻", Price = 32990000, OldPrice = 35990000, Rating = 4.6, Badge = "Hot",
                Description = "Card đồ họa rời mạnh mẽ, màn hình 165Hz, tản nhiệt kép, bàn phím RGB cho game thủ.",
                Specs = "CPU 14 nhân, RAM 16GB|GPU rời 8GB|SSD 1TB|Màn hình 15.6\" 165Hz" },
            new Product { Id = 5, CategoryId = 3, Name = "Tai nghe không dây AirBeat Pro", Icon = "🎧", Price = 2490000, OldPrice = 2990000, Rating = 4.6, Badge = "Giảm 17%",
                Description = "Chống ồn chủ động ANC, âm bass sâu, pin 30 giờ, kết nối Bluetooth 5.3 ổn định.",
                Specs = "Chống ồn chủ động ANC|Pin 30 giờ|Bluetooth 5.3|Kháng nước IPX4" },
            new Product { Id = 6, CategoryId = 3, Name = "Tai nghe chụp tai StudioMax", Icon = "🎧", Price = 3990000, OldPrice = 4490000, Rating = 4.4, Badge = "",
                Description = "Âm thanh chuẩn phòng thu, đệm tai êm ái, hỗ trợ đàm thoại rõ ràng.",
                Specs = "Driver 40mm|Pin 40 giờ|Có dây & không dây|Micro khử ồn" },
            new Product { Id = 7, CategoryId = 4, Name = "Đồng hồ thông minh FitWatch S3", Icon = "⌚", Price = 3290000, OldPrice = 3790000, Rating = 4.5, Badge = "Bán chạy",
                Description = "Theo dõi nhịp tim, SpO2, giấc ngủ, hơn 100 chế độ thể thao, GPS tích hợp.",
                Specs = "Màn hình AMOLED 1.43\"|GPS tích hợp|Pin 14 ngày|Chống nước 5ATM" },
            new Product { Id = 8, CategoryId = 5, Name = "Máy tính bảng TabPro 11", Icon = "📲", Price = 9990000, OldPrice = 11490000, Rating = 4.6, Badge = "Mới",
                Description = "Màn hình 11 inch 120Hz, hỗ trợ bút cảm ứng, lý tưởng cho học tập và giải trí.",
                Specs = "Màn hình 11\" 120Hz|RAM 8GB / ROM 128GB|Hỗ trợ bút|Pin 8000mAh" },
            new Product { Id = 9, CategoryId = 6, Name = "Sạc nhanh GaN 65W 3 cổng", Icon = "🔌", Price = 590000, OldPrice = 790000, Rating = 4.7, Badge = "Giảm 25%",
                Description = "Sạc nhanh công nghệ GaN nhỏ gọn, sạc đồng thời laptop, điện thoại và tai nghe.",
                Specs = "Công suất 65W|2 cổng USB-C + 1 USB-A|Công nghệ GaN|Bảo hành 12 tháng" },
            new Product { Id = 10, CategoryId = 6, Name = "Pin dự phòng 20.000mAh", Icon = "🔋", Price = 690000, OldPrice = 890000, Rating = 4.5, Badge = "",
                Description = "Dung lượng lớn, sạc nhanh PD 22.5W, màn hình hiển thị phần trăm pin.",
                Specs = "20.000mAh|Sạc nhanh PD 22.5W|2 cổng ra|Màn hình LED" },
            new Product { Id = 11, CategoryId = 6, Name = "Loa Bluetooth SoundBox Mini", Icon = "🔊", Price = 1190000, OldPrice = 1490000, Rating = 4.3, Badge = "Hot",
                Description = "Loa nhỏ gọn âm thanh 360°, chống nước IP67, pin 12 giờ.",
                Specs = "Công suất 20W|Chống nước IP67|Pin 12 giờ|Ghép đôi 2 loa" },
            new Product { Id = 12, CategoryId = 6, Name = "Bàn phím cơ không dây K87", Icon = "⌨️", Price = 1490000, OldPrice = 1790000, Rating = 4.6, Badge = "",
                Description = "Bàn phím cơ layout TKL, hot-swap switch, kết nối 3 chế độ, đèn nền RGB.",
                Specs = "Layout 87 phím|Hot-swap|Bluetooth / 2.4G / USB-C|Đèn RGB" }
        );
    }
}
