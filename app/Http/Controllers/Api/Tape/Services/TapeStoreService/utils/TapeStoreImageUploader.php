<?php

namespace App\Http\Controllers\Api\Tape\Services\TapeStoreService\utils;

use Illuminate\Http\Request;
use Illuminate\Support\Str;

class TapeStoreImageUploader
{
    private const IMAGE_FIELDS = ['img1', 'img2', 'img3', 'img4', 'img5', 'img6'];

    public function attachStoredPaths(Request $request, array $validated): array
    {
        foreach (self::IMAGE_FIELDS as $field) {
            if ($request->hasFile($field)) {
                $file = $request->file($field);
                $extension = $file->getClientOriginalExtension() ?: $file->extension();
                $filename = time() . '_' . Str::random(10) . '.' . $extension;

                $validated[$field] = $file->storeAs('tapes', $filename, 'public');
            }
        }

        return $validated;
    }
}
