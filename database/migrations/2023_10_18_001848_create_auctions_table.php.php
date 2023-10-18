<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAuctionsTable extends Migration {
    public function up() {
        Schema::create('auctions', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->text('description');
            $table->unsignedBigInteger('user_id');
            $table->foreign('user_id')->references('id')->on('users');
            $table->timestamp('start_time');
            $table->timestamp('end_time')->nullable(); // Remove default value and make it nullable
            $table->timestamps();
        });
    }

    public function down() {
        Schema::dropIfExists('auctions');
    }
}
