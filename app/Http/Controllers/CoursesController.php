<?php

namespace App\Http\Controllers;

use App\Http\Requests\FilterRequest;
use App\Models\Course;
use App\Http\Resources\FitredCoursesResource;

class CoursesController extends Controller
{
    public function index(FilterRequest $request)
    {
        $data = $request->validated();
        $query = new FitredCoursesResource(Course::query());

        //фильтруем курсы по языку программирования
        if (isset($data['programmingLanguage_id'])) {
            $query->where('programmingLanguage_id', $data['programmingLanguage_id']);
            $courses = $query->get();
            return $courses;
        }

        // фильтруем курсы по языку курса (Русский, English)
        if (isset($data['language'])) {
            $query->where('language', $data['language']);
            $courses = $query->get();
            return $courses;
        }

        $courses = FitredCoursesResource::collection(Course::all());
        return $courses;
    }

    public function show($id)
    {
        $course = new FitredCoursesResource(Course::findOrFail($id));
        return $course;
    }
}
