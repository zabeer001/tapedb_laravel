<?php

namespace App\Http\Controllers\Api\Tape\Services;

use App\Models\Tape;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class TapeStatsService
{
    private function applyCommonFilters(Request $request, $query): void
    {
        if ($request->filled('search')) {
            $search = (string) $request->input('search');

            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                    ->orWhere('title', 'like', "%{$search}%")
                    ->orWhere('year', 'like', "%{$search}%")
                    ->orWhere('distributor', 'like', "%{$search}%")
                    ->orWhere('upc', 'like', "%{$search}%")
                    ->orWhere('qa_checked', 'like', "%{$search}%")
                    ->orWhere('screener', 'like', "%{$search}%")
                    ->orWhere('first_printer', 'like', "%{$search}%");
            });
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
    }

    public function handle(Request $request): JsonResponse
    {
        $query = Tape::query();
        $this->applyCommonFilters($request, $query);

        $total = (clone $query)->count();
        $qaTotal = (clone $query)->where('qa_checked', '1')->count();
        $nonQaTotal = max(0, $total - $qaTotal);
        $screenerTotal = (clone $query)->whereRaw("LOWER(TRIM(screener)) IN ('1','true','yes','y')")->count();
        $firstPrinterTotal = (clone $query)->whereRaw("LOWER(TRIM(first_printer)) IN ('1','true','yes','y')")->count();

        return response()->json([
            'status' => 'success',
            'data' => [
                'total' => $total,
                'qa_total' => $qaTotal,
                'non_qa_total' => $nonQaTotal,
                'screener_total' => $screenerTotal,
                'first_printer_total' => $firstPrinterTotal,
            ],
        ]);
    }
}
