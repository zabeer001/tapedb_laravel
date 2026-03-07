<?php

use App\Http\Controllers\Ui\DashBoardController;
use Illuminate\Support\Facades\Route;

Route::get('/tapes', [DashBoardController::class, 'tapes']);
Route::get('/tapes/create', [DashBoardController::class, 'tapeCreate']);
Route::get('/tapes/{tape}', [DashBoardController::class, 'tapeShow'])->whereNumber('tape');
Route::get('/tapes/{tape}/edit', [DashBoardController::class, 'tapeEdit'])->whereNumber('tape');
Route::get('/users', [DashBoardController::class, 'users']);
Route::get('/users/create', [DashBoardController::class, 'userCreate']);
Route::get('/users/{user}', [DashBoardController::class, 'userShow'])->whereNumber('user');
Route::get('/users/{user}/edit', [DashBoardController::class, 'userEdit'])->whereNumber('user');
Route::get('/', [DashBoardController::class, 'index']);
Route::get('/', [DashBoardController::class, 'reports']);
Route::get('/settings', [DashBoardController::class, 'settings']);
