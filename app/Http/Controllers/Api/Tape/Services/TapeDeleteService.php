<?php

namespace App\Http\Controllers\Api\Tape\Services;

use App\Models\Tape;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Storage;

class TapeDeleteService
{
    public function handle(Tape $tape): JsonResponse
    {
        $storage = Storage::disk(config('filesystems.tape_image_disk', 'public'));

        foreach (['img1', 'img2', 'img3', 'img4', 'img5', 'img6'] as $field) {
            if (! empty($tape->$field) && $storage->exists($tape->$field)) {
                $storage->delete($tape->$field);
            }
        }

        $tape->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Tape deleted successfully.',
        ]);
    }
}
