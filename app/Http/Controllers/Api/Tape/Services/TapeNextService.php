<?php

namespace App\Http\Controllers\Api\Tape\Services;

use App\Models\Tape;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class TapeNextService
{
    public function handle(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'id' => 'required|integer|exists:tapes,id',
        ]);

        $currentTapeId = (int) $validated['id'];
        $currentTape = Tape::query()
            ->select(['id', 'title', 'year'])
            ->findOrFail($currentTapeId);
        $currentTitle = (string) ($currentTape->title ?? '');
        $currentYear = (string) ($currentTape->year ?? '');

        $nextTape = Tape::query()
            ->where(function ($query) use ($currentTapeId, $currentTitle, $currentYear) {
                $query->whereRaw("COALESCE(title, '') > ?", [$currentTitle])
                    ->orWhere(function ($nested) use ($currentTitle, $currentYear) {
                        $nested->whereRaw("COALESCE(title, '') = ?", [$currentTitle])
                            ->whereRaw("COALESCE(year, '') > ?", [$currentYear]);
                    })
                    ->orWhere(function ($nested) use ($currentTapeId, $currentTitle, $currentYear) {
                        $nested->whereRaw("COALESCE(title, '') = ?", [$currentTitle])
                            ->whereRaw("COALESCE(year, '') = ?", [$currentYear])
                            ->where('id', '>', $currentTapeId);
                    });
            })
            ->orderByRaw("COALESCE(title, '') ASC")
            ->orderByRaw("COALESCE(year, '') ASC")
            ->orderBy('id', 'ASC')
            ->first();

        return response()->json([
            'status' => 'success',
            'message' => $nextTape ? 'Next tape retrieved successfully.' : 'No next tape found.',
            'data' => [
                'id' => $nextTape?->id,
            ],
        ]);
    }
}
