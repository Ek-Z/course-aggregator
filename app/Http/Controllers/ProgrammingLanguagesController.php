<?php

namespace App\Http\Controllers;

use App\Models\ProgrammingLanguage;
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
}
