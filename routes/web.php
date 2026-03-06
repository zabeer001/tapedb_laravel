<?php

use App\Http\Controllers\Api\GoogleMeet\GoogleMeetController;
use App\Http\Controllers\Ui\FrontendController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Route;

Route::get('/sign-in', [FrontendController::class, 'signIn']);
Route::get('/', [FrontendController::class, 'index'])->defaults('layoutContext', 'frontend');
Route::get('/dashbaord', [FrontendController::class, 'dashboard']);
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
Route::get('/google/callback', [GoogleMeetController::class, 'callback']);
Route::get('/google/meet/public-link', [GoogleMeetController::class, 'publicLink']);
