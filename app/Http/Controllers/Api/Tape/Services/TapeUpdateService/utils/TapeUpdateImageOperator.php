<?php

namespace App\Http\Controllers\Api\Tape\Services\TapeUpdateService\utils;

use App\Models\Tape;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;

class TapeUpdateImageOperator
{
    private const IMAGE_FIELDS = ['img1', 'img2', 'img3', 'img4', 'img5', 'img6'];

    public function apply(Request $request, Tape $tape, array $validated): array
    {
        $disk = config('filesystems.tape_image_disk', 'public');
        $storage = Storage::disk($disk);

        foreach (self::IMAGE_FIELDS as $field) {
            $currentPath = $tape->{$field};

            if ($request->hasFile($field)) {
                $file = $request->file($field);
                $extension = $file->getClientOriginalExtension() ?: $file->extension();
                $filename = time() . '_' . Str::random(10) . '.' . $extension;
                $validated[$field] = $file->storeAs('tapes', $filename, $disk);

                if (! empty($currentPath) && $storage->exists($currentPath)) {
                    $storage->delete($currentPath);
                }

                continue;
            }

            if ($request->exists($field) && blank($request->input($field))) {
                if (! empty($currentPath) && $storage->exists($currentPath)) {
                    $storage->delete($currentPath);
                }

                $validated[$field] = null;
            }
        }

        return $validated;
    }
}
