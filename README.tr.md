<div align="center">

# SkyCast

**React ile geliştirilmiş, karanlık temalı bir hava durumu uygulaması — OpenWeatherMap API ile gerçek zamanlı hava durumu ve 5 günlük tahmin.**

![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white)
![OpenWeatherMap](https://img.shields.io/badge/OpenWeatherMap-API-EB6E4B?style=for-the-badge&logo=openweathermap&logoColor=white)
![License](https://img.shields.io/badge/license-MIT-blue?style=for-the-badge)

[Canlı Demo](https://skycast-react.vercel.app) · [Hata Bildir](https://github.com/zikreddincikla) · [Yazar](https://github.com/zikreddincikla)

[🇬🇧 English](README.md) | 🇹🇷 Türkçe

</div>

---

## Genel Bakış

SkyCast, istediğiniz herhangi bir şehri arayarak anlık hava durumunu ve 5 günlük tahminini görebileceğiniz bir hava durumu uygulamasıdır. Ön yüzü React ile geliştirilmiştir ve `axios` üzerinden doğrudan OpenWeatherMap API'sine istek atar — kendine ait bir backend'i yoktur, güçlü bir hava durumu API'sinin üzerine kurulmuş sade bir arayüzdür.

Arayüz karanlık ve minimal bir estetik izler: navbar'da bir arama çubuğu, öne çıkan bir güncel durum kartı ve altında bir sıra tahmin kartı.

> [!TIP]
> Uygulamanın çalışması için bir OpenWeatherMap API anahtarına ihtiyacı vardır. Çalıştırmadan önce bunu `.env` dosyasına `VITE_WEATHER_API_KEY` olarak ekleyin — bkz. [Başlarken](#başlarken).

## Özellikler

- **Şehir araması** — herhangi bir şehrin adını yazarak güncel hava durumunu sorgulayın
- **Güncel durum** — aranan şehir için sıcaklık, hava durumu açıklaması ve ikon
- **5 günlük tahmin** — günlük tahmin kartları (gün adı, ikon, sıcaklık, durum)
- **Hata yönetimi** — geçersiz aramalarda net bir "Şehir bulunamadı" mesajı
- **Ülke bilgisi gösterimi** — şehir adı, ülke koduyla birlikte gösterilir (örn. `London (GB)`)
- **Duyarlı (responsive) tahmin ızgarası** — tahmin kartları mevcut genişliğe göre sarılıp büyür
- **Hover geri bildirimli karanlık tema** — navbar, kartlar ve linkler arasında ince ölçek ve arka plan geçişleri
- **SEO'ya hazır markup** — link önizlemeleri için gerçek bir görselle bağlanmış Open Graph ve Twitter Card meta etiketleri

## Teknoloji Yığını

| Katman | Teknoloji | Notlar |
|---|---|---|
| Kütüphane | React 19 | Fonksiyon bileşenleri, `useState` |
| Build aracı | Vite 8 | Geliştirme sunucusu + production bundling |
| HTTP istemcisi | Axios | OpenWeatherMap API'sine istekler |
| Veri kaynağı | [OpenWeatherMap API](https://openweathermap.org/api) | Güncel hava durumu + 5 günlük / 3 saatlik tahmin endpoint'leri |
| Linting | oxlint | `react` + `oxc` eklentileri, `rules-of-hooks` hata olarak zorunlu kılınmış |
| Stil | CSS3 | Flexbox tabanlı yerleşim, CSS framework kullanılmıyor |
| Paket yöneticisi | npm | — |

## Başlarken

Bu projeyi çalıştırmak için [OpenWeatherMap](https://openweathermap.org/api)'ten ücretsiz bir API anahtarına ihtiyacınız olacak.

```bash
git clone https://github.com/zikreddincikla/skycast-react.git
cd skycast-react
npm install
```

Proje kök dizininde bir `.env` dosyası oluşturup API anahtarınızı ekleyin:

```env
VITE_WEATHER_API_KEY=your_openweathermap_api_key
```

```bash
npm run dev
```

Geliştirme sunucusu varsayılan olarak `http://localhost:5173` adresinde çalışır.

```bash
npm run build     # production build (dist/)
npm run preview   # production build'i yerel olarak önizle
npm run lint       # oxlint çalıştır
```

<details>
<summary><b>Proje yapısı</b></summary>

```
skycast-react/
├── image/
│   ├── icon.ico            # Favicon
│   └── image.png            # Open Graph / Twitter Card önizleme görseli
├── public/
├── src/
│   ├── App.jsx               # Kök bileşen — arama durumu, API çağrıları, yerleşim
│   ├── App.css                # Navbar, kart ve tahmin stilleri
│   ├── CurrentWeather.jsx      # Güncel durum kartı
│   ├── WeatherForecast.jsx      # 5 günlük tahmin kartları
│   ├── main.jsx                  # React giriş noktası
│   └── index.css                  # Genel stiller
├── index.html
├── vite.config.js
└── .oxlintrc.json
```

</details>

<details>
<summary><b>Veri akışı nasıl işliyor</b></summary>

Arama formunun gönderilmesi `App.jsx` içindeki `handleSearch()` fonksiyonunu tetikler; bu fonksiyon ruh olarak paralel[^1] iki istek başlatır: biri güncel durum için `/weather` endpoint'ine, diğeri 5 günlük tahmin için `/forecast` endpoint'ine. Tahmin yanıtı verileri 3 saatlik aralıklarla döndürdüğü için, `WeatherForecast`'e iletilmeden önce her gün için sadece `12:00:00` kaydına filtrelenir. Hem `CurrentWeather` hem de `WeatherForecast` sunum (presentational) bileşenleridir — gerçek veri gelene kadar `null` render ederler ve kendilerine ait bir state ya da API mantığı yoktur.

[^1]: İki istek gerçekten `Promise.all` ile paralel çalıştırılmak yerine sırayla `await` edilir — bu kullanım senaryosu için işlevsel olarak sorun teşkil etmez, ama hız optimizasyonu yapıyorsanız bilmekte fayda var.

</details>

## Yazar

**Zikreddin** tarafından geliştirildi ve sürdürülüyor.

[![GitHub](https://img.shields.io/badge/GitHub-100000?style=flat-square&logo=github&logoColor=white)](https://github.com/zikreddincikla)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=flat-square&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/zikreddin-%C3%A7%C4%B1klasa%C4%9F%C4%B1rc%C4%B1o%C4%9Flu-64667a395/)

## Lisans

MIT Lisansı altında dağıtılmaktadır. Detaylar için `LICENSE` dosyasına bakın.

---

<div align="center">

© 2026 Zikreddin — Tüm hakları saklıdır.

</div>