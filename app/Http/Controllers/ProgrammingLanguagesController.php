<?php

namespace App\Http\Controllers;

use App\Models\ProgrammingLanguage;
use App\Http\Resources\ProgrammingLanguageResource;

class ProgrammingLanguagesController extends Controller
{
    public function index()
    {
        return ProgrammingLanguageResource::collection(ProgrammingLanguage::all());
    }

    public function show($id)
    {
        return new ProgrammingLanguageResource(ProgrammingLanguage::findOrFail($id));
    }
}
