<?php

namespace App\Providers;

use App\Http\Controllers\Api\Tape\Interfaces\AuthenticatedUserResolverInterface;
use App\Http\Controllers\Api\Tape\Interfaces\TapeValidatedStringNormalizerInterface;
use App\Http\Controllers\Api\Tape\Shared\Utils\TapeAuthenticatedUserResolver;
use App\Http\Controllers\Api\Tape\Services\TapeStoreService\utils\TapeValidatedStringNormalizer;
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

        $this->app->bind(
            TapeValidatedStringNormalizerInterface::class,
            TapeValidatedStringNormalizer::class
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
