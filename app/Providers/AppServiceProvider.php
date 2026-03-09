<?php

namespace App\Providers;

use App\Http\Controllers\Api\Tape\Interfaces\AuthenticatedUserResolverInterface;
use App\Http\Controllers\Api\Tape\Services\Shared\Utils\TapeAuthenticatedUserResolver;
use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->bind(
            AuthenticatedUserResolverInterface::class,
            TapeAuthenticatedUserResolver::class
        );
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Vite::prefetch(concurrency: 3);
    }
}
