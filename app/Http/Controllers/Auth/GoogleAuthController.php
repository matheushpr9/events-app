<?php

namespace App\Http\Controllers\Auth;

use Laravel\Socialite\Facades\Socialite;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class GoogleAuthController
{
    public function redirectToGoogle()
    {
        return Socialite::driver('google')->redirect();
    }

    public function handleGoogleCallback()
    {
        try {
            $googleUser = Socialite::driver('google')->user();

            $email = $googleUser->getEmail();
            if (!$email) {
                throw new \Exception('Google não retornou e-mail.');
            }

            $user = User::firstOrCreate(
                ['email' => $email],
                [
                    'name' => $googleUser->getName() ?? 'Usuário Google',
                    'password' => bcrypt(uniqid()),
                ]
            );

            Auth::login($user);

            // Regenerar a sessão após login
            session()->regenerate();

            if (!$user->hasVerifiedEmail()) {
                $user->sendEmailVerificationNotification();
            }

            return redirect()->intended(route('register-space', absolute: false));
        } catch (\Throwable $e) {
            \Log::error('Erro no login Google', [
                'msg' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
                'googleUser' => isset($googleUser) ? (array)$googleUser : null,
            ]);
            return redirect('/login')->with('error', 'Erro ao autenticar com o Google: ' . $e->getMessage());
        }
    }
}
