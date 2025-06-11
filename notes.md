php artisan make:model Produto -mc
php artisan migrate
php artisan route:list
php artisan tinker
{space.images.map(img => (
  <img key={img.id} src={`/storage/${img.image_path}`} alt="Imagem do espaço" />
))}
