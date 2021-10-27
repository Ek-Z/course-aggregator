<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ProgrammingLanguage;
use App\Http\Requests\StoreProgrammingLanguageRequest;
use App\Http\Requests\UpdateProgrammingLanguageRequest;
use App\Http\Resources\ProgrammingLanguageResource;

class ProgrammingLanguagesController extends Controller
{

    public function index()
    {
        return ProgrammingLanguageResource::collection(ProgrammingLanguage::all());
    }

    public function store(StoreProgrammingLanguageRequest $request)
    {
        $created_programmingLanguage = ProgrammingLanguage::create($request->validated());
        return $created_programmingLanguage;
    }

    public function show($id)
    {
        return new ProgrammingLanguageResource(ProgrammingLanguage::findOrFail($id));
    }


    public function update(UpdateProgrammingLanguageRequest $request, $id)
    {
        $programmingLanguage = new ProgrammingLanguageResource(ProgrammingLanguage::findOrFail($id));
        $programmingLanguage->fill($request->validated());
        $programmingLanguage->save();
        return response()->json($programmingLanguage, 200);
    }

    public function destroy($id)
    {
        $programmingLanguage = new ProgrammingLanguageResource(ProgrammingLanguage::findOrFail($id));
        if ($programmingLanguage->delete()) return response(null, 204);
    }
}
