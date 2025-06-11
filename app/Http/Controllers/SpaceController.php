<?php

namespace App\Http\Controllers;

use App\Enums\SpaceAmenitiesEnum;
use App\Enums\SpaceLocalityEnum;
use App\Enums\SpaceServicesEnum;
use App\Enums\SpaceTypeEnum;
use App\Models\Space;
use Illuminate\Http\Request;
use Illuminate\Validation\Rules\Enum;

class SpaceController extends Controller
{
    public function index(){
        return Space::all();
    }

    public function store(Request $request){
        logger()->info('Creating space', [
            'request' => $request->all(),
        ]);
        $validatedSpace = $request->validate([
            'images' => 'required|array',
            'images.*' => 'image|mimes:jpeg,png,jpg,gif|max:204800', //validar tamanho máximo de 200MB
            'people_capacity' => 'required|integer',
            'cep' => 'required|string',
            //'price_per_person_buffet' => 'required|numeric',
            'events_count' => 'integer',
            //'feedbacks' => 'nullable|string',
            'type' => ['required', new Enum(SpaceTypeEnum::class)],
            'locality' => ['required', new Enum(SpaceLocalityEnum::class)],
            'amenities' => 'required|array',
            'amenities.*' => [new Enum(SpaceAmenitiesEnum::class)],
            'services' => 'required|array',
            'services.*' => [new Enum(SpaceServicesEnum::class)],
            'description' => 'required|string',
        ]);

        logger()->info('Amenities and Services', [
            'amenities' => $validatedSpace['amenities'],
            'services' => $validatedSpace['services'],
        ]);

        $space = Space::create([
            'people_capacity' => $validatedSpace['people_capacity'],
            'cep' => $validatedSpace['cep'],
            'price_per_person_buffet' => $validatedSpace['price_per_person_buffet'] ?? 0.0,
            'events_count' => $validatedSpace['events_count'] ?? 0,
            'type' => $validatedSpace['type'],
            'locality' => $validatedSpace['locality'],
            'amenities' => $validatedSpace['amenities'] ?? [],
            'services' => $validatedSpace['services'] ?? [],
            'description' => $validatedSpace['description'],
        ]);


        logger()->info('Creating space', [
            'space_id' => $space->id,

        ]);

        foreach ($request->file('images') as $image) {
            $imagePath = $image->store('spaces', 'public');
            $space->images()->create(['image_path' => $imagePath]);
        }

        logger()->info('Space created', [
            'space_id' => $space->id,
        ]);


        return response()->json([
            'message' => 'Space created successfully',
            'space' => $space->load('images')
        ], 201);
    }

    public function show($id){
        return Space::findOrFail($id);
    }

    public function update(Request $request, $id){
        $space = $this->show($id);
        $space->update($request->all());

        return response()->json([
            'message' => 'Space updated successfully',
            'space' => $space
        ]);
    }

    public function destroy($id){
        Space::destroy($id);
        return response()->json([
            'message' => 'Space deleted successfully'
        ], 204);
    }
}
