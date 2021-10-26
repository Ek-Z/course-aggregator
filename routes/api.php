<?php

use App\Http\Controllers\Api\CoursesController;
use App\Http\Controllers\Api\ProgrammingLanguagesController;
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

Route::group(['prefix' => 'admin'], function () {
    Route::apiResources([
        'courses' => CoursesController::class,
    ]);
    Route::apiResources([
        'programmingLanguages' => ProgrammingLanguagesController::class,
    ]);
});

Route::get('/courses', [CoursesController::class, 'filtered_courses'])
    ->name('index');;
