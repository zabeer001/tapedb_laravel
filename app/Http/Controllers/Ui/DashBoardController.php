<?php

namespace App\Http\Controllers\Ui;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Inertia\Response;

class DashBoardController extends Controller
{
    public function tapes(): Response
    {
        return Inertia::render('backend/pages/tapes/index/TapesPage');
    }

    public function tapeCreate(): Response
    {
        return Inertia::render('backend/pages/tapes/create/CreateTapePage');
    }

    public function tapeShow(int $tape): Response
    {
        return Inertia::render('backend/pages/tapes/show/ShowTapePage', [
            'tapeId' => $tape,
        ]);
    }

    public function tapeEdit(int $tape): Response
    {
        return Inertia::render('backend/pages/tapes/edit/EditTapePage', [
            'tapeId' => $tape,
        ]);
    }

    public function index(): Response
    {
        return Inertia::render('backend/pages/dashbaord/DashBoardPage');
    }

    public function users(): Response
    {
        return Inertia::render('backend/pages/users/UsersPage');
    }

    public function userCreate(): Response
    {
        return Inertia::render('backend/pages/users/CreateUserPage');
    }

    public function userShow(int $user): Response
    {
        return Inertia::render('backend/pages/users/ShowUserPage', [
            'userId' => $user,
        ]);
    }

    public function userEdit(int $user): Response
    {
        return Inertia::render('backend/pages/users/EditUserPage', [
            'userId' => $user,
        ]);
    }

    public function reports(): Response
    {
        return Inertia::render('common/reports/ReportsPage');
    }

    public function settings(): Response
    {
        return Inertia::render('backend/pages/settings/SettingsPage');
    }

    public function unauthorized(): Response
    {
        return Inertia::render('backend/pages/unauthorized/UnauthorizedPage');
    }
}
