<?php

namespace App\Http\Controllers;

use App\Models\Review;
use Illuminate\Http\Request;

class ReviewController extends Controller
{
    /**
     * Display all reviews for the selected course.
     * 
     * @param  int  $id
     */
    public function index($id)
    {
        $course_id = $id;
        $reviews = Review::where('course_id', $course_id);
        return $reviews;
    }
}
