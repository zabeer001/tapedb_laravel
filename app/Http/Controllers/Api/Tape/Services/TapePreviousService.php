<?php

namespace App\Http\Controllers\Api\Tape\Services;

use App\Models\Tape;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class TapePreviousService
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

        $previousTape = Tape::query()
            ->where(function ($query) use ($currentTapeId, $currentTitle, $currentYear) {
                $query->whereRaw("COALESCE(title, '') < ?", [$currentTitle])
                    ->orWhere(function ($nested) use ($currentTitle, $currentYear) {
                        $nested->whereRaw("COALESCE(title, '') = ?", [$currentTitle])
                            ->whereRaw("COALESCE(year, '') < ?", [$currentYear]);
                    })
                    ->orWhere(function ($nested) use ($currentTapeId, $currentTitle, $currentYear) {
                        $nested->whereRaw("COALESCE(title, '') = ?", [$currentTitle])
                            ->whereRaw("COALESCE(year, '') = ?", [$currentYear])
                            ->where('id', '<', $currentTapeId);
                    });
            })
            ->orderByRaw("COALESCE(title, '') DESC")
            ->orderByRaw("COALESCE(year, '') DESC")
            ->orderBy('id', 'DESC')
            ->first();

        return response()->json([
            'status' => 'success',
            'message' => $previousTape ? 'Previous tape retrieved successfully.' : 'No previous tape found.',
            'data' => [
                'id' => $previousTape?->id,
            ],
        ]);
    }
}
