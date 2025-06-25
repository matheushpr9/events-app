<?php

use App\Http\Controllers\SpaceController;
use Illuminate\Support\Facades\Route;
use Laravel\Sanctum\Http\Middleware\EnsureFrontendRequestsAreStateful;

Route::middleware([
    EnsureFrontendRequestsAreStateful::class,
    'auth:sanctum'
    ])->prefix('api')->group(function () {
        Route::apiResource('spaces', SpaceController::class);
});
