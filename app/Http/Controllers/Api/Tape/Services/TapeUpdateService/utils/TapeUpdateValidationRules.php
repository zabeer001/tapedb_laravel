<?php

namespace App\Http\Controllers\Api\Tape\Services\TapeUpdateService\utils;

class TapeUpdateValidationRules
{
    public function rules(): array
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
