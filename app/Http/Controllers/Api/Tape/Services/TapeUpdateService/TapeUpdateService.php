<?php

namespace App\Http\Controllers\Api\Tape\Services\TapeUpdateService;

use App\Models\Tape;
use App\Http\Controllers\Api\Tape\Services\TapeUpdateService\utils\TapeUpdateAuthenticatedUserResolver;
use App\Http\Controllers\Api\Tape\Services\TapeUpdateService\utils\TapeUpdateImageOperator;
use App\Http\Controllers\Api\Tape\Services\TapeUpdateService\utils\TapeUpdateValidationRules;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class TapeUpdateService
{
    public function __construct(
        private readonly TapeUpdateValidationRules $validationRules,
        private readonly TapeUpdateAuthenticatedUserResolver $authenticatedUserResolver,
        private readonly TapeUpdateImageOperator $imageOperator
    ) {}

    public function handle(Request $request, Tape $tape): JsonResponse
    {
        $validated = $request->validate($this->validationRules->rules());
        $validated['user_id'] = $this->authenticatedUserResolver->resolve($request);
        $validated = $this->imageOperator->apply($request, $tape, $validated);

        $tape->update($validated);

        return response()->json([
            'status' => 'success',
            'message' => 'Tape updated successfully.',
            'data' => $tape->fresh(),
        ]);
    }
}
