<?php

namespace App\Http\Controllers\Api\Tape;

use App\Http\Controllers\Controller;
use App\Http\Controllers\Api\Tape\Services\TapeDeleteService;
use App\Http\Controllers\Api\Tape\Services\TapeIndexService;
use App\Http\Controllers\Api\Tape\Services\TapeShowService;
use App\Http\Controllers\Api\Tape\Services\TapeStoreService;
use App\Http\Controllers\Api\Tape\Services\TapeUpdateService;
use App\Models\Tape;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class TapeController extends Controller
{
    public function __construct()
    {
        $this->middleware(['auth:api', 'role:admin,superadmin']);
    }

    public function index(Request $request, TapeIndexService $service): JsonResponse
    {
        return $service->handle($request);
    }

    public function store(Request $request, TapeStoreService $service): JsonResponse
    {
        return $service->handle($request);
    }

    public function show(Tape $tape, TapeShowService $service): JsonResponse
    {
        return $service->handle($tape);
    }

    public function update(Request $request, Tape $tape, TapeUpdateService $service): JsonResponse
    {
        return $service->handle($request, $tape);
    }

    public function destroy(Tape $tape, TapeDeleteService $service): JsonResponse
    {
        return $service->handle($tape);
    }
}
