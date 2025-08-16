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
Configure DNS de oficialfloov.com.br e www.oficialfloov.com.br para o IP do seu servidor.
Garanta APP_URL=https://oficialfloov.com.br no .env de produção.
Suba com proxy e Let’s Encrypt:
docker compose --profile prod up -d
Se estiver em fase de testes de SSL, ative ACME staging na seção do letsencrypt (para não bater rate limit), valide tudo, depois remova a variável e recrie os serviços.
