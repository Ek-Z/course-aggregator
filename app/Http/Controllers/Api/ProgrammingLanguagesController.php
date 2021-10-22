<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ProgrammingLanguage;
use Illuminate\Http\Request;

class ProgrammingLanguagesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return ProgrammingLanguage::all();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\ProgramLang  $programLang
     * @return \Illuminate\Http\Response
     */
    public function show(ProgrammingLanguage $programmingLanguage)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\ProgramLang  $programLang
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, ProgrammingLanguage $programmingLanguage)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\ProgramLang  $programLang
     * @return \Illuminate\Http\Response
     */
    public function destroy(ProgrammingLanguage $programmingLanguage)
    {
        //
    }
}
