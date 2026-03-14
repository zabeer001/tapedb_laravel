<?php

namespace App\Http\Controllers\Api\Tape\Interfaces;

interface TapeValidatedStringNormalizerInterface
{
    public function normalize(array $validated, array $rules): array;
}
