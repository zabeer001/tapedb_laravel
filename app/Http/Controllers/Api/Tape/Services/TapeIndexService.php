<?php

namespace App\Http\Controllers\Api\Tape\Services;

use App\Models\Tape;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class TapeIndexService
{
    public function handle(Request $request): JsonResponse
    {
        $query = Tape::query()->latest('id');

        if ($request->filled('search')) {
            $search = (string) $request->input('search');

            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                    ->orWhere('title', 'like', "%{$search}%")
                    ->orWhere('year', 'like', "%{$search}%")
                    ->orWhere('distributor', 'like', "%{$search}%")
                    ->orWhere('qa_checked', 'like', "%{$search}%")
                    ->orWhere('screener', 'like', "%{$search}%")
                    ->orWhere('first_printer', 'like', "%{$search}%");
            });
        }

        if ($request->filled('qa_checked')) {
            $query->where('qa_checked', (string) $request->input('qa_checked'));
        }

        if ($request->filled('screener')) {
            $query->where('screener', (string) $request->input('screener'));
        }

        if ($request->filled('first_printer')) {
            $query->where('first_printer', (string) $request->input('first_printer'));
        }

        if ($request->filled('year')) {
            $query->where('year', (string) $request->input('year'));
        }

        $perPage = min(100, max(1, (int) $request->input('per_page', 15)));

        return response()->json([
            'status' => 'success',
            'data' => $query->paginate($perPage),
        ]);
    }
}
