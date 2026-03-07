<?php

namespace App\Http\Controllers\Api\Tape\Services;

use App\Models\Tape;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class TapeUpdateService
{
    

    public function handle(Request $request, Tape $tape): JsonResponse
    {
        $validated = $request->validate($this->validationRules());

        foreach (['img1', 'img2', 'img3', 'img4', 'img5', 'img6'] as $field) {
            if ($request->hasFile($field)) {
                if (! empty($tape->$field) && Storage::disk('public')->exists($tape->$field)) {
                    Storage::disk('public')->delete($tape->$field);
                }

                $validated[$field] = $request->file($field)->store('tapes', 'public');
            } elseif (array_key_exists($field, $validated) && is_null($validated[$field])) {
                if (! empty($tape->$field) && Storage::disk('public')->exists($tape->$field)) {
                    Storage::disk('public')->delete($tape->$field);
                }
            }
        }

        $tape->update($validated);

        return response()->json([
            'status' => 'success',
            'message' => 'Tape updated successfully.',
            'data' => $tape->fresh(),
        ]);
    }
    private function validationRules(): array
    {
        return [
            'name' => 'sometimes|nullable|string|max:191',
            'title' => 'sometimes|nullable|string|max:191',
            'year' => 'sometimes|nullable|string|max:50',
            'distributor' => 'sometimes|nullable|string|max:255',
            'case_desc' => 'sometimes|nullable|string',
            'seal' => 'sometimes|nullable|string',
            'sticker' => 'sometimes|nullable|string',
            'watermarks' => 'sometimes|nullable|string',
            'etching' => 'sometimes|nullable|string',
            'notes' => 'sometimes|nullable|string',
            'qa_checked' => 'sometimes|nullable|string|max:10',
            'screener' => 'sometimes|nullable|string|max:10',
            'first_printer' => 'sometimes|nullable|string|max:10',
            'guard_color' => 'sometimes|nullable|string|max:255',
            'upc' => 'sometimes|nullable|string|max:255',
            'img1' => 'sometimes|nullable|image|mimes:jpg,jpeg,png,webp,gif',
            'img2' => 'sometimes|nullable|image|mimes:jpg,jpeg,png,webp,gif',
            'img3' => 'sometimes|nullable|image|mimes:jpg,jpeg,png,webp,gif',
            'img4' => 'sometimes|nullable|image|mimes:jpg,jpeg,png,webp,gif',
            'img5' => 'sometimes|nullable|image|mimes:jpg,jpeg,png,webp,gif',
            'img6' => 'sometimes|nullable|image|mimes:jpg,jpeg,png,webp,gif',
            'approved' => 'sometimes|boolean',
        ];
    }
}
