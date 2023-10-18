<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AuctionImage extends Model
{
    protected $table = 'auction_images';

    protected $fillable = ['auction_id', 'image_path'];

    public function auction()
    {
        return $this->belongsTo(Auction::class);
    }
}
