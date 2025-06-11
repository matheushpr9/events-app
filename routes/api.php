<?php

use App\Http\Controllers\SpaceController;
use Illuminate\Support\Facades\Route;

Route::prefix('api')->group(function () {
    Route::apiResource('spaces', SpaceController::class);
});
