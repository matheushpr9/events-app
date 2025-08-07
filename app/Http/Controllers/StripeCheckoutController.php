<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Stripe\Stripe;
use Stripe\Checkout\Session;

class StripeCheckoutController extends Controller
{
    public function create(Request $request)
    {
        $user = Auth::user();
        $priceId = $request->input('price_id'); // Recebe do frontend

        Stripe::setApiKey(env('STRIPE_SECRET'));

        $session = Session::create([
            'payment_method_types' => ['card'],
            'mode' => 'subscription',
            'customer_email' => $user->email,
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
