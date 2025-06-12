<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Spaces/Home');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {

    Route::get('/register-space', function () {
        return Inertia::render(component: 'Spaces/Register');
    })->name('register-space');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
