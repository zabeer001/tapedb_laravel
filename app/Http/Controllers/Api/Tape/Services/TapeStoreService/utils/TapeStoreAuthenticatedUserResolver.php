<?php

namespace App\Http\Controllers\Api\Tape\Services\TapeStoreService\utils;

use Illuminate\Http\Request;

class TapeStoreAuthenticatedUserResolver
{
    public function resolve(Request $request): int
    {
        $userId = $request->user('api')?->id ?? auth('api')->id();

        if (! $userId) {
            abort(401, 'Unauthenticated.');
        }

        return (int) $userId;
    }
}
