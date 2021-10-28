<?php

use App\Http\Controllers\Admin\CoursesController as AdminCoursesController;
use App\Http\Controllers\Admin\ProgrammingLanguagesController as AdminProgrammingLanguagesController;
use App\Http\Controllers\CoursesController;
use App\Http\Controllers\ProgrammingLanguagesController;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\Auth\LoginController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

//Protected routes

Route::middleware('auth:sanctum')->group(function () {
    Route::post('logout', [LoginController::class, 'logout']);
    Route::group(['prefix' => 'admin', 'as' => 'admin.'], function () {
        Route::apiResources([
            'courses' => AdminCoursesController::class,
        ]);
        Route::apiResources([
            'programmingLanguages' => AdminProgrammingLanguagesController::class,
        ]);
    });
});

//Public routes

Route::post('register', [RegisterController::class, 'register']);
Route::post('login', [LoginController::class, 'login']);

Route::group(['prefix' => 'courses', 'as' => 'courses.'], function () {
    Route::get('/', [CoursesController::class, 'index'])
        ->name('index');;
    Route::get('/{id}', [CoursesController::class, 'show'])
        ->name('show');
    Route::get('/search/{title}', [CoursesController::class, 'search'])
        ->name('search');
});

Route::get('/programmingLanguages', [ProgrammingLanguagesController::class, 'index'])
    ->name('programmingLanguages.index');
