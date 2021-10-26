<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Course;
use App\Http\Requests\StoreCourseRequest;
use App\Http\Requests\UpdateCourseRequest;
use App\Http\Requests\FilterRequest;
use App\Http\Resources\CourseResource;

class CoursesController extends Controller
{
    public function index()
    {
        return CourseResource::collection(Course::all());
    }

    public function filtered_courses(FilterRequest $request)
    {
        $data = $request->validated();
        $query = Course::query();

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

        $courses = CourseResource::collection(Course::all());
        return $courses;
    }

    public function store(StoreCourseRequest $request)
    {
        $created_course = Course::create($request->validated());
        return $created_course;
    }

    public function show($id)
    {
        $course = new CourseResource(Course::findOrFail($id));
        return $course;
    }

    public function update(UpdateCourseRequest $request, $id)
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
