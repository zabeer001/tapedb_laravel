<?php

namespace App\Http\Controllers\Api\Tape\Services;

use App\Models\Tape;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class TapeStoreService
{
    private function validationRules(): array
    {
        return [
            'name' => 'nullable|string|max:191',
            'title' => 'nullable|string|max:191',
            'year' => 'nullable|string|max:50',
            'distributor' => 'nullable|string|max:255',
            'case_desc' => 'nullable|string',
            'seal' => 'nullable|string',
            'sticker' => 'nullable|string',
            'watermarks' => 'nullable|string',
            'etching' => 'nullable|string',
            'notes' => 'nullable|string',
            'qa_checked' => 'nullable|string|max:10',
            'screener' => 'nullable|string|max:10',
            'first_printer' => 'nullable|string|max:10',
            'guard_color' => 'nullable|string|max:255',
            'upc' => 'nullable|string|max:255',
            'img1' => 'nullable|image|mimes:jpg,jpeg,png,webp,gif',
            'img2' => 'nullable|image|mimes:jpg,jpeg,png,webp,gif',
            'img3' => 'nullable|image|mimes:jpg,jpeg,png,webp,gif',
            'img4' => 'nullable|image|mimes:jpg,jpeg,png,webp,gif',
            'img5' => 'nullable|image|mimes:jpg,jpeg,png,webp,gif',
            'img6' => 'nullable|image|mimes:jpg,jpeg,png,webp,gif',
            'approved' => 'sometimes|boolean',
        ];
    }

    public function handle(Request $request): JsonResponse
    {
        $validated = $request->validate($this->validationRules());
        $validated['user_id'] = (int) ($request->user()?->id ?? auth('api')->id());

        foreach (['img1', 'img2', 'img3', 'img4', 'img5', 'img6'] as $field) {
            if ($request->hasFile($field)) {
                $validated[$field] = $request->file($field)->store('tapes', 'public');
            }
        }

        $tape = Tape::create($validated);

        return response()->json([
            'status' => 'success',
            'message' => 'Tape created successfully.',
            'data' => $tape,
        ], 201);
    }
}
