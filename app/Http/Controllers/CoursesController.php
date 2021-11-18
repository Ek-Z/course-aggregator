<?php

namespace App\Http\Controllers;

use App\Http\Requests\FilterRequest;
use App\Models\Course;
use App\Http\Resources\FitredCoursesResource;
use Spatie\QueryBuilder\QueryBuilder;

class CoursesController extends Controller
{
    /**
     * Фильтрация курсов по языку программирования, языку курса, заголовку
     * Сортировка по id от новых к старым
     *
     * Пример запроса:
     * /api/courses?filter[language]=Русский&filter[programmingLanguage_id]=35&filter[title]=PHP
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

    public function show($id)
    {
        $course = new FitredCoursesResource(Course::findOrFail($id));
        return $course;
    }
}
