<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Http\Request;

Route::get('/', function () {
    return Inertia::render('Spaces/Home');
})->name('home');
Route::get('/space/details/{id}', function (Request $request, $id) {
    return Inertia::render('Spaces/Details', [
        'id' => $id,
        'userAgent' => $request->header('User-Agent'),
    ]);
})->name('details');

Route::middleware(['auth', 'verified'])->group(function () {

    Route::get('/register-space', function () {
        return Inertia::render(component: 'Spaces/Register');
    })->name('register-space');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
