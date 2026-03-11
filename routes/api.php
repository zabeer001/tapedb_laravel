<?php

use App\Http\Controllers\Api\Auth\AuthController;
use App\Http\Controllers\Api\EmployeeController;
use App\Http\Controllers\Api\GoogleMeet\GoogleMeetController;
use App\Http\Controllers\Api\Profile\ProfileController;
use App\Http\Controllers\Api\Report\ReportController;
use App\Http\Controllers\Api\Tape\TapeController;
use App\Http\Controllers\Api\User\UserController;
use Illuminate\Contracts\Filesystem\Cloud;
use Illuminate\Contracts\Filesystem\Filesystem;
use Illuminate\Filesystem\FilesystemAdapter;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

Route::post('signin', [AuthController::class, 'signin']);
Route::post('refresh', [AuthController::class, 'refresh']);
Route::post('signout', [AuthController::class, 'signout']);

Route::apiResource('users', UserController::class);
Route::get('tapes/stats', [TapeController::class, 'stats']);
Route::post('tapes/gcs-upload-test', function (Request $request) {
    try {
        $validated = $request->validate([
            'image' => 'required|image|mimes:jpg,jpeg,png,webp,gif|max:10240',
        ]);

        $disk = config('filesystems.tape_image_disk', 'public');
        $file = $validated['image'];
        $extension = $file->getClientOriginalExtension() ?: $file->extension();
        $filename = time() . '_' . Str::random(10) . '.' . $extension;
        $diskConfig = (array) config("filesystems.disks.{$disk}", []);
        $keyFilePath = (string) ($diskConfig['key_file_path'] ?? '');
        $bucket = (string) ($diskConfig['bucket'] ?? '');

        if ($keyFilePath === '' || !is_file($keyFilePath) || !is_readable($keyFilePath)) {
            return response()->json([
                'status' => 'error',
                'message' => 'GCS key file is missing or not readable.',
                'data' => [
                    'disk' => $disk,
                    'key_file_path' => $keyFilePath,
                    'is_file' => is_file($keyFilePath),
                    'is_readable' => is_readable($keyFilePath),
                    'bucket' => $bucket,
                ],
            ], 500);
        }

        config()->set("filesystems.disks.{$disk}.throw", true);
        Storage::forgetDisk($disk);
        /** @var Filesystem|Cloud|FilesystemAdapter $storage */
        $storage = Storage::disk($disk);
        $path = $storage->putFileAs('tapes', $file, $filename);

        if ($path === false) {
            return response()->json([
                'status' => 'error',
                'message' => 'Upload failed: storage driver returned false.',
                'data' => [
                    'disk' => $disk,
                    'expected_path' => 'tapes/' . $filename,
                    'key_file_path' => $keyFilePath,
                    'bucket' => $bucket,
                ],
            ], 500);
        }

        $url = $storage->url($path);
        $fullPath = $bucket !== '' ? "https://storage.googleapis.com/{$bucket}/{$path}" : $url;

        return response()->json([
            'status' => 'success',
            'message' => 'Image uploaded successfully.',
            'data' => [
                'disk' => $disk,
                'path' => $fullPath,
                'object_path' => $path,
                'url' => $url,
            ],
        ], 201);
    } catch (\Throwable $e) {
        return response()->json([
            'status' => 'error',
            'message' => 'GCS upload failed.',
            'error' => $e->getMessage(),
            'exception' => get_class($e),
            'disk' => config('filesystems.tape_image_disk', 'public'),
            'key_file_path' => config("filesystems.disks." . config('filesystems.tape_image_disk', 'public') . ".key_file_path"),
            'bucket' => config("filesystems.disks." . config('filesystems.tape_image_disk', 'public') . ".bucket"),
            'file' => $e->getFile(),
            'line' => $e->getLine(),
        ], 500);
    }
});

Route::apiResource('tapes', TapeController::class);
Route::get('reports/stats', [ReportController::class, 'stats']);
Route::post('next-tape', [TapeController::class, 'nextTape']);
Route::post('previous-tape', [TapeController::class, 'previousTape']);

Route::prefix('profile')->middleware('auth:api')->group(function (): void {
    Route::get('/', [ProfileController::class, 'show']);
    Route::post('/password', [ProfileController::class, 'updatePassword']);
    Route::post('/avatar', [ProfileController::class, 'updateAvatar']);
});
