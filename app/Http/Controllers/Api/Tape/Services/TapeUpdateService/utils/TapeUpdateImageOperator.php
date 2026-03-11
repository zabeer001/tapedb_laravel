<?php

namespace App\Http\Controllers\Api\Tape\Services\TapeUpdateService\utils;

use App\Models\Tape;
use Illuminate\Contracts\Filesystem\Cloud;
use Illuminate\Filesystem\FilesystemAdapter;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Throwable;

class TapeUpdateImageOperator
{
    private const IMAGE_FIELDS = ['img1', 'img2', 'img3', 'img4', 'img5', 'img6'];

    public function apply(Request $request, Tape $tape, array $validated): array
    {
        $disk = config('filesystems.tape_image_disk', 'public');
        /** @var Cloud|FilesystemAdapter $storage */
        $storage = Storage::disk($disk);

        foreach (self::IMAGE_FIELDS as $field) {
            $currentPath = $tape->{$field};

            if ($request->hasFile($field)) {
                $file = $request->file($field);
                $extension = $file->getClientOriginalExtension() ?: $file->extension();
                $filename = time() . '_' . Str::random(10) . '.' . $extension;
                $storedPath = $file->storeAs('tapes', $filename, $disk);

                if ($storedPath === false) {
                    continue;
                }

                $validated[$field] = $storage->url($storedPath);

                if (! empty($currentPath)) {
                    try {
                        $storagePath = $this->resolveStoragePath((string) $currentPath, $disk);

                        if ($storagePath !== null) {
                            $storage->delete($storagePath);
                        }
                    } catch (Throwable $e) {
                        Log::warning('Failed deleting previous tape image on update.', [
                            'disk' => $disk,
                            'path' => $currentPath,
                            'field' => $field,
                            'error' => $e->getMessage(),
                        ]);
                    }
                }

                continue;
            }

            if ($request->exists($field) && blank($request->input($field))) {
                if (! empty($currentPath)) {
                    try {
                        $storagePath = $this->resolveStoragePath((string) $currentPath, $disk);

                        if ($storagePath !== null) {
                            $storage->delete($storagePath);
                        }
                    } catch (Throwable $e) {
                        Log::warning('Failed deleting tape image during remove request.', [
                            'disk' => $disk,
                            'path' => $currentPath,
                            'field' => $field,
                            'error' => $e->getMessage(),
                        ]);
                    }
                }

                $validated[$field] = null;
            }
        }

        return $validated;
    }

    private function resolveStoragePath(string $pathOrUrl, string $disk): ?string
    {
        $trimmed = trim($pathOrUrl);

        if ($trimmed === '') {
            return null;
        }

        if (! str_starts_with($trimmed, 'http://') && ! str_starts_with($trimmed, 'https://')) {
            return $trimmed;
        }

        $parsedPath = parse_url($trimmed, PHP_URL_PATH);

        if (! is_string($parsedPath) || $parsedPath === '') {
            return null;
        }

        $normalized = ltrim($parsedPath, '/');
        $bucket = (string) config("filesystems.disks.{$disk}.bucket", '');

        if ($bucket !== '' && str_starts_with($normalized, $bucket . '/')) {
            return substr($normalized, strlen($bucket) + 1);
        }

        return $normalized;
    }
}
