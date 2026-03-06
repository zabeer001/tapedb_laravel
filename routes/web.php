<?php

use Illuminate\Support\Facades\Route;

require __DIR__.'/frontend.php';

Route::prefix('dashbaord')->group(function () {
    require __DIR__.'/dashbaord.php';
});
