<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Request;

class CourseRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules(Request $request)
    {
        $rules = [
            'title' => 'required|string|min:5|max:191',
            'author' => '',
            'image' => '',
            'description' => '',
            'programmingLanguage_id' => 'required|integer|exists:programming_languages,id',
        ];

        switch ($this->getMethod()) {
            case 'POST':
                return $rules;
            case 'PUT':
                return [
                    'course_id' => 'required|integer|exists:courses,id',
                ] + $rules; // и берем все остальные правила
            case 'DELETE':
                return [
                    'course_id' => 'required|integer|exists:courses,id'
                ];
        }
    }
}
