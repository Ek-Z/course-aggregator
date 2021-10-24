<?php

namespace App\Http\Controllers;

use App\Http\Requests\FilterRequest;
use App\Http\Resources\CourseResource;
use App\Models\Course;

class CoursesController extends Controller
{
    public function index(FilterRequest $request)
    {
        $data = $request->validated();
        $query = CourseResource::collection(Course::query());
        if (isset($data['programmingLanguage_id'])) {
            $query->where('programmingLanguage_id', $data['programmingLanguage_id']);
            $courses = $query->get();
            return $courses;
        }
        return CourseResource::collection(Course::all());
    }

    public function show($id)
    {
        return new CourseResource(Course::findOrFail($id));
    }
}
