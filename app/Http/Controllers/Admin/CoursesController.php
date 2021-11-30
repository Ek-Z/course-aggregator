<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Course;
use App\Http\Requests\CourseRequest;
use App\Http\Resources\CourseResource;
use Illuminate\Http\Request;

class CoursesController extends Controller
{
    /**
     * Display a listing of courses.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return CourseResource::collection(Course::paginate(8));
    }


    /**
     * Store a newly created course in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //$created_course = Course::create($request->validated());
        $created_course = Course::create($request->all());

        return $created_course;
    }


    /**
     * Display the specified course.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $course = new CourseResource(Course::findOrFail($id));

        return $course;
    }

    public function update(Request $request, $id)
    {
        $course = new CourseResource(Course::findOrFail($id));
        $course->fill($request->all());
        $course->save();

        return response()->json($course, 200);
    }


    /**
     * Remove the specified course from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $course = new CourseResource(Course::findOrFail($id));
        if ($course->delete()) return response(null, 204);
    }
}
