<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAuctionImagesTable extends Migration {
    public function up() {
        Schema::create('auction_images', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('auction_id');
            $table->foreign('auction_id')->references('id')->on('auctions');
            $table->string('image_path');
            $table->timestamps();
        });
    }

    public function down() {
        Schema::dropIfExists('auction_images');
    }
}
