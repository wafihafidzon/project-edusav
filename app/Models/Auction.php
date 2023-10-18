<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Auction extends Model
{
    protected $table = 'auctions';

    protected $fillable = ['title', 'description', 'user_id', 'start_time', 'end_time'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function bids()
    {
        return $this->hasMany(Bid::class);
    }

    public function images()
    {
        return $this->hasMany(AuctionImage::class);
    }
}
