<?php

namespace App\Http\Controllers\Api\Tape\Services;

use App\Models\Tape;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Throwable;

class TapeDeleteService
{
    public function handle(Tape $tape): JsonResponse
    {
        $disk = config('filesystems.tape_image_disk', 'public');
        $storage = Storage::disk($disk);

        foreach (['img1', 'img2', 'img3', 'img4', 'img5', 'img6'] as $field) {
            if (! empty($tape->$field)) {
                try {
                    $storagePath = $this->resolveStoragePath((string) $tape->$field, $disk);

                    if ($storagePath !== null) {
                        $storage->delete($storagePath);
                    }
                } catch (Throwable $e) {
                    Log::warning('Failed deleting tape image during tape delete.', [
                        'disk' => $disk,
                        'path' => $tape->$field,
                        'field' => $field,
                        'error' => $e->getMessage(),
                    ]);
                }
            }
        }

        $tape->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Tape deleted successfully.',
        ]);
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
