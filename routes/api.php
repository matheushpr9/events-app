<?php

use App\Http\Controllers\SpaceController;
use Illuminate\Support\Facades\Route;
use Laravel\Sanctum\Http\Middleware\EnsureFrontendRequestsAreStateful;

Route::get('spaces/filter', [SpaceController::class, 'filter'])->prefix('api');
Route::get('spaces/{id}', [SpaceController::class, 'show'])->prefix('api');
Route::get('spaces', [SpaceController::class, 'index'])->prefix('api');
Route::get('amenities', [SpaceController::class, 'getAmenities'])->prefix('api');
Route::get('localities', [SpaceController::class, 'getLocalities'])->prefix('api');
Route::get('services', [SpaceController::class, 'getServices'])->prefix('api');
Route::get('types', [SpaceController::class, 'getTypes'])->prefix('api');
Route::get('capacities', [SpaceController::class, 'getCapacities'])->prefix('api');

Route::middleware([
    EnsureFrontendRequestsAreStateful::class,
    'auth:sanctum'
    ])->prefix('api')->group(function () {      
        Route::apiResource('spaces', SpaceController::class);
});
