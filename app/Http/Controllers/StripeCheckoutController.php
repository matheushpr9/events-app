<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Stripe\Stripe;

class StripeCheckoutController extends Controller
{
    public function create(Request $request)
    {
        $user = Auth::user();

        \Stripe\Stripe::setApiKey(config('services.stripe.secret'));

        if (!$user->stripe_id) {
            $customer = \Stripe\Customer::create([
                'email' => $user->email,
                'name' => $user->name,
            ]);
            $user->stripe_id = $customer->id;
            $user->save();
        }

        $priceId = $request->input('price_id');

        $session = \Stripe\Checkout\Session::create([
            'payment_method_types' => ['card'],
            'mode' => 'subscription',
            'customer' => $user->stripe_id,
            'line_items' => [[
                'price' => $priceId,
                'quantity' => 1,
            ]],
            'success_url' => config('app.url') . '/account?success=1',
            'cancel_url' => config('app.url') . '/checkout?canceled=1',
            'metadata' => [
                'user_id' => $user->id,
                'price_id' => $priceId,
            ],
        ]);

        return response()->json(['url' => $session->url]);
    }
}
