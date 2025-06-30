<?php

use App\Http\Controllers\SpaceController;
use Illuminate\Support\Facades\Route;
use Laravel\Sanctum\Http\Middleware\EnsureFrontendRequestsAreStateful;
Route::get('spaces/filter', [SpaceController::class, 'filter'])->prefix('api');
Route::get('spaces', [SpaceController::class, 'index'])->prefix('api');


Route::middleware([
    EnsureFrontendRequestsAreStateful::class,
    'auth:sanctum'
    ])->prefix('api')->group(function () {      
        Route::apiResource('spaces', SpaceController::class);
});
