# TechAuth Styling Rules

Tüm frontend geliştirmelerinde aşağıdaki kurallara uyulmalıdır:

1. **Vanilla CSS**: Kesinlikle Tailwind CSS veya kütüphane bazlı (Bootstrap, AntD) sınıflar kullanılmamalıdır. Tüm stiller `index.css` içindeki değişkenler kullanılarak saf CSS ile yazılmalıdır.
2. **Premium Dark Mode**: Tasarım her zaman karanlık tema (`#0c0c0e`) üzerine kurgulanmalı, glassmorphism (cam efekti) ve yumuşak gradyanlar kullanılmalıdır.
3. **Responsive**: Mobil uyumluluk öncelikli olmalı, `header` ve `sidebar` değişimleri CSS medya sorguları ile yönetilmelidir.
4. **Tutarlılık**: Butonlar için `.btn-primary`, kartlar için `.data-card` sınıfları kullanılmalıdır.
