<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Http\Responses\ResponsesInterface;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\View\View;

class AuthenticatedSessionController extends Controller
{
    /**
     * @var ResponsesInterface $responder
     */
    protected $responder;

    /**
     * AuthenticatedSessionController constructor.
     * @param ResponsesInterface $responder
     */
    public function __construct(ResponsesInterface $responder)
    {
        $this->middleware('auth')->only('destroy');
        $this->responder = $responder;
    }

    /**
     * Display the login view.
     *
     * @return View
     */
    public function create()
    {
        return view('auth.login');
    }

    /**
     * Handle an incoming authentication request.
     *
     * @param  \App\Http\Requests\Auth\LoginRequest  $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function store(LoginRequest $request)
    {
        $request->authenticate();

        $request->session()->regenerate();

        /* @var User $authorized_user */
        $authorized_user = Auth::user();

        return $this->responder->respond([
            'data' => [
                'message' => "Hi, $authorized_user->name! You have been logged in successfully",
                'layout_route' => route('dashboard.home')
            ]
        ]);
    }

    /**
     * Destroy an authenticated session.
     *
     * @param Request $request
     * @return RedirectResponse
     */
    public function destroy(Request $request)
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return redirect('/');
    }
}
