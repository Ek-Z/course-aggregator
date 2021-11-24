<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Course extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'courses';

    protected $fillable = [
        'programmingLanguage_id',
        'title',
        'source_name',
        'source_url',
        'image',
        'status',
        'language',
        'description',
        'short_description'
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

    public function courseReview()
    {
        return $this->hasMany(Review::class);
    }
}
