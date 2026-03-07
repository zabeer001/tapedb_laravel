<?php

namespace App\Http\Controllers\Api\Report;

use App\Http\Controllers\Api\Concerns\ApiResponse;
use App\Http\Controllers\Api\Report\Services\ReportStatsService;
use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;

class ReportController extends Controller
{
    use ApiResponse;

   
    public function stats(ReportStatsService $service): JsonResponse
    {
        return $this->successResponse(
            $service->handle(),
            'Reports stats fetched successfully.'
        );
    }
}
