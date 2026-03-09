<?php

namespace App\Http\Controllers\Api\Tape\Interfaces;

use Illuminate\Http\Request;

interface AuthenticatedUserResolverInterface
{
    public function resolve(Request $request): int;
}
