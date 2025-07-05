<?php

namespace App\Http\Controllers;

use App\Enums\SpaceAmenitiesEnum;
use App\Enums\SpaceCapacityEnum;
use App\Enums\SpaceLocalityEnum;
use App\Enums\SpaceServicesEnum;
use App\Enums\SpaceTypeEnum;
use App\Models\Address;
use App\Models\Space;
use Illuminate\Http\Request;
use Illuminate\Validation\Rules\Enum;

class SpaceController extends Controller
{
    public function index(){
        return Space::with(['address', 'images', 'user'])->get();
    }

    public function store(Request $request){
         $user = $request->user();
         logger()->info('User authenticated', [
            'user_id' => $user->id,
            'user_email' => $user->email,
        ]);

        logger()->info('Creating space', [
            'request' => $request->all(),
        ]);
         //validar erro na imagem
        $images = array_filter($request->file('images') ?? [], function ($image) {
            return $image !== null;
        });
        if ($request->has('people_capacity')) {
            $request->merge([
                'people_capacity' => preg_replace('/[^0-9]/', '', $request->people_capacity)
            ]);
        }

        $request->files->set('images', $images);
        $validatedSpace = $request->validate([
            //validar erro na imagem
            'images' => 'required|array',
            'images.*' => 'image|mimes:jpeg,png,jpg,gif|max:204800', //validar tamanho máximo de 200MB
            'people_capacity' => ['required', new Enum (SpaceCapacityEnum::class)],
            //'price_per_person_buffet' => 'required|numeric',
            'events_count' => 'integer',
            //'feedbacks' => 'nullable|string',
            'street' => 'nullable|string|max:255',
            'neighborhood' => 'nullable|string|max:255',
            'number' => 'nullable|string|max:50',
            'complement' => 'nullable|string|max:255',
            'city' => 'nullable|string|max:100',
            'state' => 'nullable|string|max:100',
            'postal_code' => 'nullable|string|max:20',
            'country' => 'nullable|string|max:100',
            'type' => ['required', new Enum(SpaceTypeEnum::class)],
            'locality' => ['required', new Enum(SpaceLocalityEnum::class)],
            'amenities' => 'required|array',
            'amenities.*' => [new Enum(SpaceAmenitiesEnum::class)],
            'services' => 'required|array',
            'services.*' => [new Enum(SpaceServicesEnum::class)],
            'description' => 'required|string',
            'name' => 'required|string|max:255',
        ]);

        logger()->info('Validated space data', [
            'validated_space' => $validatedSpace,
        ]);
        // Create address and space
        $address = Address::create([
            'street' => $validatedSpace['street'],
            'neighborhood' => $validatedSpace['neighborhood'],
            'number' => $validatedSpace['number'],
            'complement' => $validatedSpace['complement'],
            'city' => $validatedSpace['city'],
            'state' => $validatedSpace['state'],
            'postal_code' => $validatedSpace['postal_code'],
            'country' => $validatedSpace['country'],
            
        ]);

        logger()->info('Address created', [
            'address_id' => $address->id,
        ]);

        // Create space with the validated data
        logger()->info('Creating space with address', [
            'address_id' => $address->id,
            'people_capacity' => $validatedSpace['people_capacity'],
            'price_per_person_buffet' => $validatedSpace['price_per_person_buffet'] ?? 0.0,
            'events_count' => $validatedSpace['events_count'] ?? 0,
            'type' => $validatedSpace['type'],
            'locality' => $validatedSpace['locality'],
            'amenities' => $validatedSpace['amenities'] ?? [],
            'services' => $validatedSpace['services'] ?? [],
            'description' => $validatedSpace['description'],
            'name' => $validatedSpace['name'],
        ]);

        $space = Space::create([
            'address_id' => $address->id,
            'user_id' => $user->id,
            'people_capacity' => $validatedSpace['people_capacity'],
            'price_per_person_buffet' => $validatedSpace['price_per_person_buffet'] ?? 0.0,
            'events_count' => $validatedSpace['events_count'] ?? 0,
            'type' => $validatedSpace['type'],
            'locality' => $validatedSpace['locality'],
            'amenities' => $validatedSpace['amenities'] ?? [],
            'services' => $validatedSpace['services'] ?? [],
            'description' => $validatedSpace['description'],
            'name' => $validatedSpace['name'],
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
        return Space::with(['address', 'images'])->findOrFail($id);
    }
    public function filter(Request $request)
    {
        $query = Space::query();

        // Filtros simples
        if ($request->filled('people_capacity')) {
            $capacity = preg_replace('/[^0-9]/', '', $request->people_capacity);
            $query->where('people_capacity', '>=', $capacity);
        }   
        if ($request->filled('type')) {
            $query->where('type', $request->type);
        }
        if ($request->filled('locality')) {
            $query->where('locality', $request->locality);
        }

        // Filtros relacionados ao endereço
        if ($request->filled('street') || $request->filled('neighborhood') || $request->filled('city') || $request->filled('state')) {
            $query->whereHas('address', function ($q) use ($request) {
                if ($request->filled('street')) {
                    $q->where('street', 'like', '%' . $request->street . '%');
                }
                if ($request->filled('neighborhood')) {
                    $q->where('neighborhood', 'like', '%' . $request->neighborhood . '%');
                }
                if ($request->filled('city')) {
                    $q->where('city', 'like', '%' . $request->city . '%');
                }
                if ($request->filled('state')) {
                    $q->where('state', 'like', '%' . $request->state . '%');
                }
            });
        }

        // Filtros de array (amenities e services)
        if ($request->filled('amenities')) {
            $amenities = is_array($request->amenities) ? $request->amenities : explode(',', $request->amenities);
            foreach ($amenities as $amenity) {
                $query->whereJsonContains('amenities', $amenity);
            }
        }
        if ($request->filled('services')) {
            $services = is_array($request->services) ? $request->services : explode(',', $request->services);
            foreach ($services as $service) {
                $query->whereJsonContains('services', $service);
            }
        }
        

        $spaces = $query->with(['address', 'images'])->get();

        return response()->json($spaces);
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
    public function getAmenities()
    {
        return response()->json(SpaceAmenitiesEnum::getValues());
    }
    public function getLocalities()
    {
        return response()->json(SpaceLocalityEnum::getValues());
    }
    public function getServices()
    {
        return response()->json(SpaceServicesEnum::getValues());
    }
    public function getTypes()
    {
        return response()->json(SpaceTypeEnum::getValues());
    }
    public function getCapacities()
    {
        return response()->json(SpaceCapacityEnum::getValues());
    }
}
