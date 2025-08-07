<?php

namespace App\Http\Controllers;

use App\Models\User;


class SubscriptionController extends Controller
{
    public function status()
    {
        $user = new User();
        if (!$user) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }
        $subscription = $user->subscriptions()->where('stripe_status', 'active')->first();

        return response()->json([
            'isActive' => !!$subscription,
            'planName' => $subscription ? $subscription->stripe_price : null,
            'expiryDate' => $subscription ? $subscription->ends_at : null,
        ]);
    }
}
