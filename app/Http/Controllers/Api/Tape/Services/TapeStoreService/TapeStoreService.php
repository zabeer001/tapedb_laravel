<?php

namespace App\Http\Controllers\Api\Tape\Services\TapeStoreService;

use App\Http\Controllers\Api\Tape\Interfaces\AuthenticatedUserResolverInterface;

use App\Models\Tape;
use App\Http\Controllers\Api\Tape\Services\TapeStoreService\utils\TapeDuplicateChecker;
use App\Http\Controllers\Api\Tape\Services\TapeStoreService\utils\TapeStoreImageUploader;
use App\Http\Controllers\Api\Tape\Services\TapeStoreService\utils\TapeStoreValidationRules;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class TapeStoreService
{
    public function __construct(
        private readonly TapeStoreValidationRules $validationRules,
        private readonly AuthenticatedUserResolverInterface $authenticatedUserResolver,
        private readonly TapeStoreImageUploader $imageUploader,
        private readonly TapeDuplicateChecker $duplicateChecker,
    ) {}

    public function handle(Request $request): JsonResponse
    {
        $validated = $request->validate($this->validationRules->rules());
        $validated['user_id'] = $this->authenticatedUserResolver->resolve($request);
        $validated = $this->imageUploader->attachStoredPaths($request, $validated);

        $candidate = [];
        foreach (TapeDuplicateChecker::FIELDS as $field) {
            $candidate[$field] = $validated[$field] ?? null;
        }

        if ($this->duplicateChecker->isDuplicate($candidate)) {
            throw ValidationException::withMessages([
                'duplicate' => ['This tape is totally duplicate.'],
            ]);
        }

        $tape = Tape::create($validated);

        return response()->json([
            'status' => 'success',
            'message' => 'Tape created successfully.',
            'data' => $tape,
        ], 201, [], JSON_UNESCAPED_SLASHES);
    }
}
