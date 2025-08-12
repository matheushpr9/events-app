<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Stripe\Stripe;
use Stripe\Customer;
use Stripe\Checkout\Session;

class StripeCheckoutController extends Controller
{
    public function create(Request $request)
{
    $user = Auth::user();

    Stripe::setApiKey(env('STRIPE_SECRET'));

    if (!$user->stripe_id) {
        $customer = Customer::create([
            'email' => $user->email,
            'name' => $user->name,
        ]);
        $user->stripe_id = $customer->id;
        $user->save();
    }

    $priceId = $request->input('price_id');

    $session = Session::create([
        'payment_method_types' => ['card'],
        'mode' => 'subscription',
        'customer' => $user->stripe_id,
        'line_items' => [[
            'price' => $priceId,
            'quantity' => 1,
        ]],
        'success_url' => env('APP_URL') . '/account?success=1',
        'cancel_url' => env('APP_URL') . '/checkout?canceled=1',
        'metadata' => [
            'user_id' => $user->id,
        ],
    ]);

    return response()->json(['url' => $session->url]);
}
}
