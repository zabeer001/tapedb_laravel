<?php

namespace App\Http\Controllers\Api\Tape\Services\TapeStoreService;

use App\Models\Tape;
use App\Http\Controllers\Api\Tape\Services\TapeStoreService\utils\TapeStoreAuthenticatedUserResolver;
use App\Http\Controllers\Api\Tape\Services\TapeStoreService\utils\TapeStoreImageUploader;
use App\Http\Controllers\Api\Tape\Services\TapeStoreService\utils\TapeStoreValidationRules;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class TapeStoreService
{
    public function __construct(
        private readonly TapeStoreValidationRules $validationRules,
        private readonly TapeStoreAuthenticatedUserResolver $authenticatedUserResolver,
        private readonly TapeStoreImageUploader $imageUploader
    ) {}

    public function handle(Request $request): JsonResponse
    {
        $validated = $request->validate($this->validationRules->rules());
        $validated['user_id'] = $this->authenticatedUserResolver->resolve($request);
        $validated = $this->imageUploader->attachStoredPaths($request, $validated);

        $tape = Tape::create($validated);

        return response()->json([
            'status' => 'success',
            'message' => 'Tape created successfully.',
            'data' => $tape,
        ], 201);
    }
}
