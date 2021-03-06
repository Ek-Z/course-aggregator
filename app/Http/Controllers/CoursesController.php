<?php

namespace App\Http\Controllers;

use App\Http\Requests\FilterRequest;
use App\Models\Course;
use App\Models\User;
use App\Http\Resources\FitredCoursesResource;
use Spatie\QueryBuilder\QueryBuilder;
use Illuminate\Support\Facades\Auth;

class CoursesController extends Controller
{
    /**
     * Display a listing of filtered courses.
     *
     * @param  \Illuminate\Http\Request  $request
     * example
     * /api/courses?filter[language]=Русский&filter[programmingLanguage_id]=35&filter[title]=PHP
     * 
     * @return \Illuminate\Http\Response
     */
    public function index(FilterRequest $request)
    {
        $query = Course::where('status', 'PUBLISHED');

        $coursesQuery = QueryBuilder::for($query, $request)
            ->allowedFilters('language', 'programmingLanguage_id', 'title')
            ->defaultSort('-id')
            ->paginate(8)
            ->appends(request()->query());

        return FitredCoursesResource::collection($coursesQuery);
    }

    /**
     * Display the specified course.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $course = new FitredCoursesResource(Course::findOrFail($id));

        return $course;
    }

    /**
     * Display a listing of new courses.
     *
     * @return \Illuminate\Http\Response
     */
    public function newcourses()
    {
        $courses = Course::where('status', 'PUBLISHED')
            ->orderBy('id', 'desc')
            ->take(6)
            ->get();

        return FitredCoursesResource::collection($courses);
    }

    /**
     * Favorite a particular course
     *
     * @param  $id
     * @return Response
     */
    public function favoriteCourse($id)
    {
        Auth::user()->favorites()->attach($id);

        return response(null, 200);
    }

    /**
     * Unfavorite a particular course
     *
     * @param  $id
     * @return Response
     */
    public function unFavoriteCourse($id)
    {
        Auth::user()->favorites()->detach($id);

        return response(null, 200);
    }
}
