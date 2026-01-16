# UcusModu Monorepo

Bu repo istemci (`client/`) ve sunucu (`server/`) katmanlarını aynı kökte toplar.

```
.
├─ client/          React + Tailwind (Next.js)
│  ├─ app/
│  ├─ public/
│  └─ package.json
├─ server/          ASP.NET Core API
│  ├─ Controllers/
│  ├─ Program.cs
│  ├─ appsettings.json
│  └─ UcusModu.Api.csproj
├─ .gitignore
├─ UcusModuWebApp.sln
└─ (docker-compose.yml gerektiğinde eklenebilir)
```

## Çalıştırma

- İstemci: `cd client && npm install && npm run dev`
- Sunucu: `cd server && dotnet restore && dotnet run`

## Notlar

- Solution dosyası `server/UcusModu.Api.csproj` yoluna güncellendi.
- `server/Controllers/.gitkeep` boş dizinin takibine yardım eder; ilk kontrolcüyü eklerken silebilirsiniz.
