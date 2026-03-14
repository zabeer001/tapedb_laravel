<?php

namespace App\Http\Controllers\Api\Tape\Services\TapeStoreService\utils;

use App\Models\Tape;
use Illuminate\Validation\ValidationException;

class TapeDuplicateChecker
{
    public const FIELDS = [
        'title',
        'year',
        'distributor',
        'case_desc',
        'seal',
        'sticker',
        'watermarks',
        'etching',
        'notes',
        'qa_checked',
        'screener',
        'first_printer',
        'guard_color',
        'upc',
    ];

    public function isDuplicate(array $attributes, ?int $ignoreTapeId = null): bool
    {
        $query = Tape::query();

        foreach (self::FIELDS as $field) {
            $value = $attributes[$field] ?? null;

            if (blank($value)) {
                $query->whereNull($field);
                continue;
            }

            $query->where($field, (string) $value);
        }

        if ($ignoreTapeId !== null) {
            $query->whereKeyNot($ignoreTapeId);
        }

        return $query->exists();
    }

    public function ensureNotDuplicate(array $validated): void
    {
        $candidate = [];
        foreach (self::FIELDS as $field) {
            $candidate[$field] = $validated[$field] ?? null;
        }

        if ($this->isDuplicate($candidate)) {
            throw ValidationException::withMessages([
                'duplicate' => ['This tape is totally duplicate.'],
            ]);
        }
    }
}
