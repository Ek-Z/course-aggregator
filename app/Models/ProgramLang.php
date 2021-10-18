<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProgramLang extends Model
{
    use HasFactory;

    protected $table = 'program_langs';
    protected $fillable = ['title'];
}
