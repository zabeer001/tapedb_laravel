<?php

namespace App\Http\Controllers\Api\Tape\Services\TapeStoreService\utils;

use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Auth;

class TapeStoreValidationRules
{
    public function rules(): array
    {
        $canSetQaChecked = in_array((string) Auth::guard('api')->user()?->role, ['admin', 'superadmin'], true);

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
            'qa_checked' => [
                'nullable',
                'string',
                'max:10',
                Rule::prohibitedIf(! $canSetQaChecked),
            ],
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
}
