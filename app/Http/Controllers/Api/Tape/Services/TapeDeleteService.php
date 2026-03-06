<?php

namespace App\Http\Controllers\Api\Tape\Services;

use App\Models\Tape;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Storage;

class TapeDeleteService
{
    public function handle(Tape $tape): JsonResponse
    {
        foreach (['img1', 'img2', 'img3', 'img4', 'img5', 'img6'] as $field) {
            if (! empty($tape->$field) && Storage::disk('public')->exists($tape->$field)) {
                Storage::disk('public')->delete($tape->$field);
            }
        }

        $tape->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Tape deleted successfully.',
        ]);
    }
}
