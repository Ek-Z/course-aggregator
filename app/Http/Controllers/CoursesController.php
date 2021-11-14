<?php

namespace App\Http\Controllers;

use App\Http\Requests\FilterRequest;
use App\Models\Course;
use App\Http\Resources\FitredCoursesResource;
use Spatie\QueryBuilder\QueryBuilder;

class CoursesController extends Controller
{
    /**
     * Фильтрация курсов
     * 
     * Пример запроса:         
     * /api/courses?filter[language]=Русский&filter[programmingLanguage_id]=35
     */
    public function index(FilterRequest $request)
    {
        $query = Course::where('status', 'PUBLISHED');

        $coursesQuery = QueryBuilder::for($query)
            ->allowedFilters('language', 'programmingLanguage')
            ->paginate(6)
            ->appends(request()->query());
        return FitredCoursesResource::collection($coursesQuery);
    }

    public function show($id)
    {
        $course = new FitredCoursesResource(Course::findOrFail($id));
        return $course;
    }

    public function search($title)
    {
        return Course::where('title', 'like', '%' . $title . '%')->get();
    }
}
