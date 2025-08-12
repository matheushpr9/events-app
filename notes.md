php artisan make:model Produto -mc
php artisan migrate
php artisan route:list
php artisan tinker
{space.images.map(img => (
  <img key={img.id} src={`/storage/${img.image_path}`} alt="Imagem do espaço" />
))}


Para rodar o checkout do stripe localmente devemos seguir o passo a passo:
Instale o Stripe CLI
Guia de instalação oficial
Faça login no Stripe CLI
bash
stripe login
Inicie o listener para webhooks
Supondo que seu endpoint local seja http://localhost:8000/api/stripe/webhook:
bash
stripe listen --forward-to localhost:8000/api/stripe/webhook

Sera exibida a chave secret para o webhook, devemos cadastrala no .env:
STRIPE_WEBHOOK_SECRET
