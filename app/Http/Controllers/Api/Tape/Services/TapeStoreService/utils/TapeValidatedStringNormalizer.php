<?php

namespace App\Http\Controllers\Api\Tape\Services\TapeStoreService\utils;

use App\Http\Controllers\Api\Tape\Interfaces\TapeValidatedStringNormalizerInterface;

class TapeValidatedStringNormalizer implements TapeValidatedStringNormalizerInterface
{
    public function normalize(array $validated, array $rules): array
    {
        foreach ($rules as $field => $ruleDefinition) {
            if (! $this->hasStringRule($ruleDefinition) || ! array_key_exists($field, $validated)) {
                continue;
            }

            $value = $validated[$field];
            if (! is_string($value)) {
                continue;
            }

            $normalized = preg_replace('/\s+/', ' ', trim($value));
            $validated[$field] = blank($normalized) ? null : mb_strtolower($normalized);
        }

        return $validated;
    }

    private function hasStringRule(array|string $ruleDefinition): bool
    {
        if (is_string($ruleDefinition)) {
            return in_array('string', explode('|', $ruleDefinition), true);
        }

        return in_array('string', $ruleDefinition, true);
    }
}
