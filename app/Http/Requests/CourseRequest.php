<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

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
    public function rules()
    {
        return [
            'programmingLanguage_id' => 'required|integer|exists:programming_languages,id',
            'title' => 'required|string|min:5|max:250',
            'sourсe_name' => 'nullable|string|max:250',
            'sourсe_url' => 'required|url',
            'image' => 'nullable|image',
            'short_description' => 'nullable',
            'description' => 'nullable',
            'language' => 'nullable',
            'status' => 'nullable'
        ];
    }
}
