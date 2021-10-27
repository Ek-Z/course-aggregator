<?php

use App\Http\Controllers\Admin\CoursesController as AdminCoursesController;
use App\Http\Controllers\Admin\ProgrammingLanguagesController as AdminProgrammingLanguagesController;
use App\Http\Controllers\CoursesController;
use App\Http\Controllers\ProgrammingLanguagesController;
use Illuminate\Http\Request;
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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::group(['prefix' => 'admin', 'as' => 'admin.'], function () {
    Route::apiResources([
        'courses' => AdminCoursesController::class,
    ]);
    Route::apiResources([
        'programmingLanguages' => AdminProgrammingLanguagesController::class,
    ]);
});

Route::get('/courses', [CoursesController::class, 'index'])
    ->name('courses.index');

Route::get('/courses/{id}', [CoursesController::class, 'show'])
    ->name('courses.show');

Route::get('/programmingLanguages', [ProgrammingLanguagesController::class, 'index'])
    ->name('programmingLanguages.index');

Route::get('/courses/search/{title}', [CoursesController::class, 'search'])
    ->name('courses.search');
