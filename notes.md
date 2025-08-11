php artisan make:model Produto -mc
php artisan migrate
php artisan route:list
php artisan tinker
{space.images.map(img => (
  <img key={img.id} src={`/storage/${img.image_path}`} alt="Imagem do espaço" />
))}
src/
  ├── app.tsx
  ├── ssr.tsx
  ├── index.css
  ├── tailwind.config.js
  ├── README.md
  ├── components/
  │   ├── atoms/
  │   ├── molecules/
  │   ├── organisms/
  │   ├── templates/
  │   └── pages/
  ├── hooks/
  ├── interfaces/
  ├── lib/
  ├── types/
  ├── api/
  └── helpers/
