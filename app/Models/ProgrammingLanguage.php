<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProgrammingLanguage extends Model
{
    use HasFactory;

    protected $table = 'programming_languages';
    protected $fillable = ['title'];

    protected $hidden = [
        'created_at',
        'updated_at',
        'deleted_at'
    ];

    public function course()
    {
        return $this->hasMany(Course::class);
    }
}
