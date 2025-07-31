<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class RatingController extends Controller
{
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'space_id' => 'required|exists:spaces,id',
            'rating' => 'required|integer|min:1|max:5',
            'review' => 'nullable|string|max:1000',
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
        ]);

        $rating = new \App\Models\Rating($validatedData);
        $rating->save();

        return response()->json(['message' => 'Rating created successfully', 'rating' => $rating], 201);
    }
    public function show($spaceId)
    {
        $query = \App\Models\Rating::where('space_id', $spaceId);
        $ratings = $query->get();
        return response()->json($ratings);
    }
}
