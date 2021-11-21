<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Course;
use App\Http\Requests\CourseRequest;
use App\Http\Resources\CourseResource;

class CoursesController extends Controller
{
    public function index()
    {
        return CourseResource::collection(Course::paginate(8));
    }

    public function store(CourseRequest $request)
    {
        $created_course = Course::create($request->validated());
        return $created_course;
    }

    public function show($id)
    {
        $course = new CourseResource(Course::findOrFail($id));
        return $course;
    }

    public function update(CourseRequest $request, $id)
    {
        $course = new CourseResource(Course::findOrFail($id));
        $course->fill($request->validated());
        $course->save();
        return response()->json($course, 200);
    }

    public function destroy($id)
    {
        $course = new CourseResource(Course::findOrFail($id));
        if ($course->delete()) return response(null, 204);
    }
}
