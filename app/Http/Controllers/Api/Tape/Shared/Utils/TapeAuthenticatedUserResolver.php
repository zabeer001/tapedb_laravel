<?php

namespace App\Http\Controllers\Api\Tape\Shared\Utils;

use App\Http\Controllers\Api\Tape\Interfaces\AuthenticatedUserResolverInterface;
use Illuminate\Http\Request;

class TapeAuthenticatedUserResolver implements AuthenticatedUserResolverInterface
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
