<?php

namespace App\Http\Controllers\Api\Tape\Services\TapeStoreService;

use App\Http\Controllers\Api\Tape\Interfaces\AuthenticatedUserResolverInterface;
use App\Http\Controllers\Api\Tape\Interfaces\TapeValidatedStringNormalizerInterface;

use App\Models\Tape;
use App\Http\Controllers\Api\Tape\Services\TapeStoreService\utils\TapeDuplicateChecker;
use App\Http\Controllers\Api\Tape\Services\TapeStoreService\utils\TapeStoreImageUploader;
use App\Http\Controllers\Api\Tape\Services\TapeStoreService\utils\TapeStoreValidationRules;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class TapeStoreService
{
    public function __construct(
        private readonly TapeStoreValidationRules $validationRules,
        private readonly AuthenticatedUserResolverInterface $authenticatedUserResolver,
        private readonly TapeStoreImageUploader $imageUploader,
        private readonly TapeDuplicateChecker $duplicateChecker,
        private readonly TapeValidatedStringNormalizerInterface $validatedStringNormalizer,
    ) {}

    public function handle(Request $request): JsonResponse
    {
        $rules = $this->validationRules->rules();
        $validated = $request->validate($rules);
        $validated['user_id'] = $this->authenticatedUserResolver->resolve($request);
        $validated = $this->imageUploader->attachStoredPaths($request, $validated);
        $validated = $this->validatedStringNormalizer->normalize($validated, $rules);

        $this->duplicateChecker->ensureNotDuplicate($validated);

        $tape = Tape::create($validated);

        return response()->json([
            'status' => 'success',
            'message' => 'Tape created successfully.',
            'data' => $tape,
        ], 201, [], JSON_UNESCAPED_SLASHES);
    }
}
