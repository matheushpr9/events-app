<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
class StripeWebhookController extends Controller
{
    public function handle(Request $request)
    {
        $payload = $request->getContent();
        $sigHeader = $request->header('Stripe-Signature');
        $secret = config('services.stripe.webhook_secret');

        try {
            $event = \Stripe\Webhook::constructEvent($payload, $sigHeader, $secret);
        } catch (\UnexpectedValueException $e) {
            return response('Invalid payload', 400);
        } catch (\Stripe\Exception\SignatureVerificationException $e) {
            return response('Invalid signature', 400);
        }

        if ($event->type === 'checkout.session.completed') {
            $session = $event->data->object;
            $userId = $session->metadata->user_id ?? null;

            if ($userId) {
                $user = \App\Models\User::find($userId);
                if ($user) {
                    if (!$user->stripe_id) {
                        $user->stripe_id = $session->customer;
                        $user->save();
                    }

                    $priceId = $session->metadata->price_id ?? null;

                    $user->subscriptions()->updateOrCreate(
                        ['stripe_id' => $session->subscription],
                        [
                            'type' => 'default',
                            'stripe_status' => 'active',
                            'stripe_price' => $priceId,
                            'quantity' => 1,
                        ]
                    );
                }
            }
        }

        return response('Webhook recebido', 200);
    }
}
