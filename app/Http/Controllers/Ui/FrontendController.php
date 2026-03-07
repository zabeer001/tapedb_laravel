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
        return Inertia::render('frontend/pages/auth/SignInPage');
    }



   
    public function reports(): Response
    {
        return Inertia::render('common/reports/ReportsPage');
    }

    public function siteInfo(): Response
    {
        return Inertia::render('frontend/pages/site-info/SiteInfoPage');
    }

  
}
