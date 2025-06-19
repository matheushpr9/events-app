<?php

namespace App\Http\Controllers;

use App\Models\Address;
use Illuminate\Http\Request;

class AddressController extends Controller
{
    public function index()
    {
        // Return all addresses
        return response()->json(Address::all());
    }

    public function store(Request $request)
    {
        // Validate the request data
        $validatedData = $request->validate([
            'street' => 'nullable|string|max:255',
            'neighborhood' => 'nullable|string|max:255',
            'number' => 'nullable|string|max:50',
            'complement' => 'nullable|string|max:255',
            'city' => 'nullable|string|max:100',
            'state' => 'nullable|string|max:100',
            'postal_code' => 'nullable|string|max:20',
            'country' => 'nullable|string|max:100',
        ]);

        // Create a new address
        $address = Address::create($validatedData);

        return response()->json($address, 201);
    }
    public function show($id)
    {
        // Find the address by ID
        $address = Address::findOrFail($id);
        return response()->json($address);
    }
    public function update(Request $request, $id)
    {
        // Find the address by ID
        $address = Address::findOrFail($id);

        // Validate the request data
        $validatedData = $request->validate([
            'street' => 'nullable|string|max:255',
            'neighborhood' => 'nullable|string|max:255',
            'number' => 'nullable|string|max:50',
            'city' => 'nullable|string|max:100',
            'state' => 'nullable|string|max:100',
            'postal_code' => 'nullable|string|max:20',
            'country' => 'nullable|string|max:100',
        ]);

        // Update the address
        $address->update($validatedData);

        return response()->json($address);
    }
    public function destroy($id)
    {
        // Find the address by ID
        $address = Address::findOrFail($id);
        // Delete the address
        $address->delete();
        return response()->json(['message' => 'Address deleted successfully'], 204);
    }
}
