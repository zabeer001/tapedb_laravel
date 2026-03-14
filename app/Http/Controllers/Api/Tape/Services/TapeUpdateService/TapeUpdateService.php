<?php

namespace App\Http\Controllers\Api\Tape\Services\TapeUpdateService;

use App\Http\Controllers\Api\Tape\Interfaces\AuthenticatedUserResolverInterface;
use App\Http\Controllers\Api\Tape\Interfaces\TapeValidatedStringNormalizerInterface;
use App\Models\Tape;
use App\Http\Controllers\Api\Tape\Services\TapeUpdateService\utils\TapeUpdateImageOperator;
use App\Http\Controllers\Api\Tape\Services\TapeUpdateService\utils\TapeUpdateValidationRules;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class TapeUpdateService
{
    public function __construct(
        private readonly TapeUpdateValidationRules $validationRules,
        private readonly AuthenticatedUserResolverInterface $authenticatedUserResolver,
        private readonly TapeUpdateImageOperator $imageOperator,
        private readonly TapeValidatedStringNormalizerInterface $validatedStringNormalizer,
    ) {}

    public function handle(Request $request, Tape $tape): JsonResponse
    {
        $rules = $this->validationRules->rules();
        $validated = $request->validate($rules);
        $validated['user_id'] = $this->authenticatedUserResolver->resolve($request);
        $validated = $this->validatedStringNormalizer->normalize($validated, $rules);
        $validated = $this->imageOperator->apply($request, $tape, $validated);

        $tape->update($validated);

        return response()->json([
            'status' => 'success',
            'message' => 'Tape updated successfully.',
            'data' => $tape->fresh(),
        ], 200, [], JSON_UNESCAPED_SLASHES);
    }
}
