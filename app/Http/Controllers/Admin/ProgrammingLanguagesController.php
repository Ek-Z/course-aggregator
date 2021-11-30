<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ProgrammingLanguage;
use App\Http\Requests\ProgrammingLanguageRequest;
use App\Http\Resources\ProgrammingLanguageResource;

class ProgrammingLanguagesController extends Controller
{
    /**
     * Display a listing of programmingLanguages.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return ProgrammingLanguageResource::collection(ProgrammingLanguage::all());
    }

    /**
     * Store a newly created programmingLanguage in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(ProgrammingLanguageRequest $request)
    {
        $created_programmingLanguage = ProgrammingLanguage::create($request->validated());
        return $created_programmingLanguage;
    }


    /**
     * Display the specified programmingLanguage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return new ProgrammingLanguageResource(ProgrammingLanguage::findOrFail($id));
    }


    /**
     * Update the specified programmingLanguage in storage.
     *
     * @param  \Illuminate\Http\CourseRequest  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(ProgrammingLanguageRequest $request, $id)
    {
        $programmingLanguage = new ProgrammingLanguageResource(ProgrammingLanguage::findOrFail($id));
        $programmingLanguage->fill($request->validated());
        $programmingLanguage->save();
        return response()->json($programmingLanguage, 200);
    }

    /**
     * Remove the specified programmingLanguage from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $programmingLanguage = new ProgrammingLanguageResource(ProgrammingLanguage::findOrFail($id));
        if ($programmingLanguage->delete()) return response(null, 204);
    }
}
