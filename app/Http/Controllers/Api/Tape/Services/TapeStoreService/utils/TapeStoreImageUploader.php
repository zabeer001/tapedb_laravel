<?php

namespace App\Http\Controllers\Api\Tape\Services\TapeStoreService\utils;

use Illuminate\Contracts\Filesystem\Cloud;
use Illuminate\Filesystem\FilesystemAdapter;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class TapeStoreImageUploader
{
    private const IMAGE_FIELDS = ['img1', 'img2', 'img3', 'img4', 'img5', 'img6'];

    public function attachStoredPaths(Request $request, array $validated): array
    {
        $disk = config('filesystems.tape_image_disk', 'public');
        /** @var Cloud|FilesystemAdapter $storage */
        $storage = Storage::disk($disk);

        foreach (self::IMAGE_FIELDS as $field) {
            if ($request->hasFile($field)) {
                $file = $request->file($field);
                $extension = $file->getClientOriginalExtension() ?: $file->extension();
                $filename = time() . '_' . Str::random(10) . '.' . $extension;
                $storedPath = $file->storeAs('tapes', $filename, $disk);

                if ($storedPath === false) {
                    continue;
                }

                $validated[$field] = $storage->url($storedPath);
            }
        }

        return $validated;
    }
}
