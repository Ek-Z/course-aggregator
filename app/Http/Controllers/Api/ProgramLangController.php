<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ProgramLang;
use Illuminate\Http\Request;

class ProgramLangController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return ProgramLang::all();
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
    public function show(ProgramLang $programLang)
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
    public function update(Request $request, ProgramLang $programLang)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\ProgramLang  $programLang
     * @return \Illuminate\Http\Response
     */
    public function destroy(ProgramLang $programLang)
    {
        //
    }
}
