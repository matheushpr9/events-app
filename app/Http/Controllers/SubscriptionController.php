<?php

namespace App\Http\Controllers;

use Illuminate\Container\Attributes\Log;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log as FacadesLog;

class SubscriptionController extends Controller
{
    public function status()
    {
        $user = Auth::user();
        if (!$user) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }
        $subscription = $user->subscriptions()->where('stripe_status', 'active')->first();

        FacadesLog::info('Subscription details', [
        'user_id' => $user->id,
        'subscription' => $subscription ? $subscription->toArray() : null,
    ]);

        return response()->json([
            'isActive' => (bool) $subscription,
            'price' => $subscription ? $subscription->stripe_price : null,
            'planName' => $subscription ? $subscription->items[0]->stripe_product : null,
            'createdAt' => $subscription ? $subscription->created_at : null,
        ]);
    }
}
