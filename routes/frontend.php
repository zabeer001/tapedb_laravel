<?php

use App\Http\Controllers\Api\GoogleMeet\GoogleMeetController;
use App\Http\Controllers\Ui\FrontendController;
use Illuminate\Support\Facades\Route;


Route::get('/sign-in', [FrontendController::class, 'signIn']);
Route::get('/', [FrontendController::class, 'index'])->defaults('layoutContext', 'frontend');

Route::get('/dashbaord', [FrontendController::class, 'dashboard']);
Route::get('/google/callback', [GoogleMeetController::class, 'callback']);
Route::get('/google/meet/public-link', [GoogleMeetController::class, 'publicLink']);
