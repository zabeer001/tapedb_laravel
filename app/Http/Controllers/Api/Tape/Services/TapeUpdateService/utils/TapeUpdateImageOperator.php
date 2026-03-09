<?php

namespace App\Http\Controllers\Api\Tape\Services\TapeUpdateService\utils;

use App\Models\Tape;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class TapeUpdateImageOperator
{
    private const IMAGE_FIELDS = ['img1', 'img2', 'img3', 'img4', 'img5', 'img6'];

    public function apply(Request $request, Tape $tape, array $validated): array
    {
        foreach (self::IMAGE_FIELDS as $field) {
            $currentPath = $tape->{$field};

            if ($request->hasFile($field)) {
                $validated[$field] = $request->file($field)->store('tapes', 'public');

                if (! empty($currentPath) && Storage::disk('public')->exists($currentPath)) {
                    Storage::disk('public')->delete($currentPath);
                }

                continue;
            }

            if ($request->exists($field) && blank($request->input($field))) {
                if (! empty($currentPath) && Storage::disk('public')->exists($currentPath)) {
                    Storage::disk('public')->delete($currentPath);
                }

                $validated[$field] = null;
            }
        }

        return $validated;
    }
}
