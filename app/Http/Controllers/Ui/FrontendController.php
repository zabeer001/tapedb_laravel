<?php

namespace App\Http\Controllers\Ui;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class FrontendController extends Controller
{
    public function index(Request $request): Response
    {
        return Inertia::render('frontend/pages/home/HomePage');
    }

    public function signIn(): Response
    {
        return Inertia::render('auth/SignInPage');
    }

    public function dashboard(): Response
    {
        return Inertia::render('dashbaord/DashBoardPage');
    }

    public function users(): Response
    {
        return Inertia::render('users/UsersPage');
    }

    public function userCreate(): Response
    {
        return Inertia::render('users/CreateUserPage');
    }

    public function userShow(int $user): Response
    {
        return Inertia::render('users/ShowUserPage', [
            'userId' => $user,
        ]);
    }

    public function userEdit(int $user): Response
    {
        return Inertia::render('users/EditUserPage', [
            'userId' => $user,
        ]);
    }

    public function bookings(): Response
    {
        return Inertia::render('bookings/index/BookingsPage');
    }

    public function bookingCreate(Request $request): Response
    {
        return Inertia::render('common/booking/create/CreateBookingPage', [
            'layoutContext' => (string) $request->route('layoutContext', 'frontend'),
        ]);
    }

    public function bookingEdit(string $uniqId): Response
    {
        return Inertia::render('bookings/edit/EditBookingPage', [
            'bookingId' => $uniqId,
        ]);
    }

    public function reports(): Response
    {
        return Inertia::render('reports/ReportsPage');
    }

    public function settings(): Response
    {
        return Inertia::render('settings/SettingsPage');
    }
}
