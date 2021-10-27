<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Course extends Model
{
    use HasFactory;
    protected $table = 'courses';

    protected $fillable = [
        'programmingLanguage_id',
        'title',
        'source',
        'image',
        'status',
        'language',
        'description'
    ];

    protected $hidden = [
        'created_at',
        'updated_at',
        'deleted_at'
    ];

    public function programmingLanguage()
    {
        return $this->belongsTo(ProgrammingLanguage::class, 'programmingLanguage_id', 'id');
    }
}
