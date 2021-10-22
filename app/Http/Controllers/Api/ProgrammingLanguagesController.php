<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ProgrammingLanguage;
use Illuminate\Http\Request;
use App\Http\Requests\StoreProgrammingLanguageRequest;
use App\Http\Requests\UpdateProgrammingLanguageRequest;

class ProgrammingLanguagesController extends Controller
{

    public function index()
    {
        return ProgrammingLanguage::all();
    }

    public function store(StoreProgrammingLanguageRequest $request)
    {
        $created_programmingLanguage = ProgrammingLanguage::create($request->validated());
        return $created_programmingLanguage;
    }

    public function show($id)
    {
        return ProgrammingLanguage::findOrFail($id);
    }


    public function update(UpdateProgrammingLanguageRequest $request, $id)
    {
        $programmingLanguage = ProgrammingLanguage::findOrFail($id);
        $programmingLanguage->fill($request->validated());
        $programmingLanguage->save();
        return response()->json($programmingLanguage, 200);
    }

    public function destroy($id)
    {
        $programmingLanguage = ProgrammingLanguage::findOrFail($id);
        if ($programmingLanguage->delete()) return response(null, 204);
    }
}
