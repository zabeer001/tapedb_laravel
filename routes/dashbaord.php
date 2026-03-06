<?php

use App\Http\Controllers\Ui\FrontendController;
use Illuminate\Support\Facades\Route;

Route::get('/tapes', [FrontendController::class, 'tapes']);
Route::get('/tapes/create', [FrontendController::class, 'tapeCreate']);
Route::get('/tapes/{tape}', [FrontendController::class, 'tapeShow'])->whereNumber('tape');
Route::get('/tapes/{tape}/edit', [FrontendController::class, 'tapeEdit'])->whereNumber('tape');
Route::get('/users', [FrontendController::class, 'users']);
Route::get('/users/create', [FrontendController::class, 'userCreate']);
Route::get('/users/{user}', [FrontendController::class, 'userShow'])->whereNumber('user');
Route::get('/users/{user}/edit', [FrontendController::class, 'userEdit'])->whereNumber('user');
Route::get('/bookings', [FrontendController::class, 'bookings']);
Route::get('/bookings/create', [FrontendController::class, 'bookingCreate'])->defaults('layoutContext', 'backend');
Route::get('/bookings/{uniqId}/edit', [FrontendController::class, 'bookingEdit'])->whereUuid('uniqId');
Route::get('/reports', [FrontendController::class, 'reports']);
Route::get('/settings', [FrontendController::class, 'settings']);
