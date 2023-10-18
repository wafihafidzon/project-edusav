<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class AuctionImageResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'auction_id' => $this->auction_id,
            'image_path' => asset('storage/' . $this->image_path), // Ubah ini sesuai dengan penyimpanan gambar Anda
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
