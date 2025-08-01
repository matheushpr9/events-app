<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Http\Request;

Route::get('/', function () {
    return Inertia::render('Spaces/Home');
})->name('home');
Route::get('/space/details/{id}', function ( $id) {
    return Inertia::render('Spaces/Details', [
        'id' => $id,
    ]);
})->name('details');

Route::get('/space/review/{id}', function ($id) {
    return Inertia::render('Spaces/SpaceReview', [
        'id' => $id,
    ]);
})->name('review');

Route::middleware(['auth', 'verified'])->group(function () {

    Route::get('/register-space', function () {
        return Inertia::render(component: 'Spaces/Register');
    })->name('register-space');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
