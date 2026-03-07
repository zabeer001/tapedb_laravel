<?php

use App\Http\Controllers\Api\Auth\AuthController;
use App\Http\Controllers\Api\EmployeeController;
use App\Http\Controllers\Api\GoogleMeet\GoogleMeetController;
use App\Http\Controllers\Api\Profile\ProfileController;
use App\Http\Controllers\Api\Report\ReportController;
use App\Http\Controllers\Api\Tape\TapeController;
use App\Http\Controllers\Api\User\UserController;
use Illuminate\Support\Facades\Route;

Route::post('signin', [AuthController::class, 'signin']);
Route::post('refresh', [AuthController::class, 'refresh']);
Route::post('signout', [AuthController::class, 'signout']);



Route::apiResource('users', UserController::class);
Route::apiResource('employees', EmployeeController::class);
Route::get('tapes/stats', [TapeController::class, 'stats']);
Route::apiResource('tapes', TapeController::class);
Route::get('reports/stats', [ReportController::class, 'stats']);

Route::prefix('profile')->middleware('auth:api')->group(function (): void {
    Route::get('/', [ProfileController::class, 'show']);
    Route::post('/password', [ProfileController::class, 'updatePassword']);
    Route::post('/avatar', [ProfileController::class, 'updateAvatar']);
});

Route::prefix('google-meet')->group(function (): void {
    Route::get('auth-url', [GoogleMeetController::class, 'authUrl']);
    Route::get('callback', [GoogleMeetController::class, 'callback']);
});
