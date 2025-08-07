<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Stripe\Webhook;

class StripeWebhookController extends Controller
{
    public function handle(Request $request)
    {
        $payload = $request->getContent();
        $sigHeader = $request->header('Stripe-Signature');
        $secret = env('STRIPE_WEBHOOK_SECRET');

        try {
            $event = Webhook::constructEvent($payload, $sigHeader, $secret);
        } catch (\UnexpectedValueException $e) {
            // Payload inválido
            return response('Invalid payload', 400);
        } catch (\Stripe\Exception\SignatureVerificationException $e) {
            // Assinatura inválida
            return response('Invalid signature', 400);
        }

        // Processar o evento
        if ($event->type === 'checkout.session.completed') {
    $session = $event->data->object;
    $userId = $session->metadata->user_id ?? null;

    if ($userId) {
        $user = \App\Models\User::find($userId);
        if ($user) {
            // Associe o stripe_id ao usuário, se ainda não tiver
            if (!$user->stripe_id) {
                $user->stripe_id = $session->customer;
                $user->save();
            }

            // Crie ou atualize a assinatura
            $subscription = $user->subscriptions()->updateOrCreate(
                ['stripe_id' => $session->subscription],
                [
                    'type' => 'default',
                    'stripe_status' => 'active',
                    'stripe_price' => $session->display_items[[0]]()->price->id ?? null,
                    'quantity' => 1,
                ]
            );
        }
    }
}

        return response('Webhook recebido', 200);
    }
}
