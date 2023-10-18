<?php

namespace App\Http\Controllers\Api;

use App\Models\AuctionImage;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class AuctionImageController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'auction_id' => 'required|exists:auctions,id',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048', // Maksimum 2MB
        ]);

        $auctionImage = new AuctionImage;
        $auctionImage->auction_id = $request->auction_id;

        // Simpan gambar di direktori penyimpanan (storage atau public)
        $imagePath = $request->file('image')->store('auction_images', 'public');
        $auctionImage->image_path = $imagePath;

        $auctionImage->save();

        return response()->json(['message' => 'Auction image uploaded'], 201);
    }

    public function index($auctionId)
    {
        $images = AuctionImage::where('auction_id', $auctionId)->get();
        return response()->json($images);
    }

    public function destroy($id)
    {
        $image = AuctionImage::find($id);
        if ($image) {
            // Hapus gambar dari direktori penyimpanan jika perlu
            // Storage::disk('public')->delete($image->image_path);

            $image->delete();
            return response()->json(['message' => 'Auction image deleted'], 200);
        } else {
            return response()->json(['message' => 'Auction image not found'], 404);
        }
    }
}