<?php

namespace App\Http\Controllers\Api\Tape\Services;

use App\Models\Tape;
use Illuminate\Http\JsonResponse;

class TapeShowService
{
    public function handle(Tape $tape): JsonResponse
    {
        return response()->json([
            'status' => 'success',
            'data' => $tape,
        ], 200, [], JSON_UNESCAPED_SLASHES);
    }
}
