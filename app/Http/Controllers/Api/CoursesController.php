<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Course;
use App\Http\Requests\CourseRequest;
use App\Http\Requests\FilterRequest;

class CoursesController extends Controller
{
    public function index(FilterRequest $request)
    {
        $data = $request->validated();
        $query = Course::query();
        if (isset($data['programmingLanguage_id'])) {
            $query->where('programmingLanguage_id', $data['programmingLanguage_id']);
            $courses = $query->get();
            return $courses;
        }
        return Course::all();
    }

    public function store(CourseRequest $request)
    {
        $created_course = Course::create($request->validated());
        return $created_course;
    }

    public function show($id)
    {
        return Course::findOrFail($id);
    }

    public function update(CourseRequest $request, $id)
    {
        $course = Course::findOrFail($id);
        $course->fill($request->except(['course_id']));
        $course->save();
        return response()->json($course);
    }

    public function destroy(CourseRequest $request, $id)
    {
        $course = Course::findOrFail($id);
        if ($course->delete()) return response(null, 204);
    }
}
