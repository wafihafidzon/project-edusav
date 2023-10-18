<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Resources\AuctionResource;
use App\Models\Auction;

class AuctionController extends Controller
{
    public function index()
    {
        $auctions = Auction::all();
        return AuctionResource::collection($auctions);
    }

    public function show($id)
    {
        $auction = Auction::find($id);
        if ($auction) {
            return new AuctionResource($auction);
        } else {
            return response()->json(['message' => 'Auction not found'], 404);
        }
    }

    public function store(Request $request)
    {
        $auction = new Auction;
        $auction->title = $request->title;
        $auction->description = $request->description;
        $auction->user_id = $request->user_id;
        $auction->start_time = $request->start_time;
        $auction->end_time = $request->end_time;
        $auction->save();

        return new AuctionResource($auction);
    }

    public function update(Request $request, $id)
    {
        $auction = Auction::find($id);
        if ($auction) {
            $auction->title = $request->title;
            $auction->description = $request->description;
            $auction->user_id = $request->user_id;
            $auction->start_time = $request->start_time;
            $auction->end_time = $request->end_time;
            $auction->save();

            return new AuctionResource($auction);
        } else {
            return response()->json(['message' => 'Auction not found'], 404);
        }
    }

    public function destroy($id)
    {
        $auction = Auction::find($id);
        if ($auction) {
            $auction->delete();
            return response()->json(['message' => 'Auction deleted'], 200);
        } else {
            return response()->json(['message' => 'Auction not found'], 404);
        }
    }
}