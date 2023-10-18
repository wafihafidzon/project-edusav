<?php

namespace App\Http\Controllers\Api;

use App\Http\Resources\BidResource;
use App\Http\Controllers\Controller;
use App\Models\Bid; 
use Illuminate\Http\Request;

class BidController extends Controller
{
    public function getBidsForAuctionSorted($auctionId)
    {
        $bids = Bid::where('auction_id', $auctionId)
            ->orderBy('amount', 'desc')
            ->get();

        return BidResource::collection($bids);
    }
    public function store(Request $request)
    {
        $bid = new Bid;
        $bid->auction_id = $request->auction_id;
        $bid->user_id = $request->user_id;
        $bid->amount = $request->amount;
        $bid->save();

        return new BidResource($bid);
    }
}