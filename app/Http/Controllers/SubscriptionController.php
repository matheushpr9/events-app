<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;

class SubscriptionController extends Controller
{
    public function status()
    {
        $user = Auth::user();
        if (!$user) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }
        $subscription = $user->subscriptions()
            ->where('stripe_status', 'active')
            ->where(function ($query) {
                $query->whereNull('ends_at')
                    ->orWhere('ends_at', '>', now());
            })
            ->first();

        $isActive = (bool) $subscription;

        return response()->json([
            'isActive' => $isActive,
            'price' => $subscription ? $subscription->stripe_price : null,
            'planName' => $subscription ? $subscription->items[0]->stripe_product : null,
            'createdAt' => $subscription ? $subscription->created_at : null,
            'endsAt' => $subscription ? $subscription->ends_at : null,
        ]);
    }

    public function cancel()
    {
        $user = Auth::user();
        if (!$user) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        $subscription = $user->subscription('default');

        if (!$subscription) {
            return response()->json(['message' => 'Usuário não possui assinatura.'], 404);
        }

        if (!$subscription->valid()) {
            return response()->json(['message' => 'Nenhuma assinatura ativa para cancelar.'], 409);
        }

        if ($subscription->onGracePeriod()) {
            return response()->json([
                'message' => 'Assinatura já está programada para cancelamento ao fim do período.',
                'cancel_at' => $subscription->ends_at,
            ], 200);
        }

        $subscription->cancel();

        return response()->json([
            'message' => 'Assinatura será cancelada ao final do período atual.',
            'cancel_at' => $subscription->fresh()->ends_at,
        ], 200);
    }
}
