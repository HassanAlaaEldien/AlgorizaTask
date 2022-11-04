<?php

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Dashboard\CategoriesController;
use App\Http\Controllers\Dashboard\HomeController;
use App\Http\Controllers\Dashboard\ProductsController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// Authentication Routes.
Route::group(['prefix' => 'login'], function () {
    Route::get('/', [AuthenticatedSessionController::class, 'create'])
        ->middleware('guest')
        ->name('login');
    Route::post('/', [AuthenticatedSessionController::class, 'store'])
        ->middleware('guest');
});

// Logout Route.
Route::get('logout', [AuthenticatedSessionController::class, 'destroy'])->name('logout');


// Admin Dashboard Routes.
Route::group(['as' => 'dashboard.'], function () {
    // HomePage Route.
    Route::get('/', [HomeController::class, 'index'])->name('home');

    // Category Routes.
    Route::resource('categories', CategoriesController::class)->except('show');

    // Product Routes.
    Route::resource('products', ProductsController::class)->except('show');

    // Common Routes.
    Route::get('list-categories', [HomeController::class, 'listCategories'])->name('common.list.categories');
});
