<?php

use App\Http\Controllers\Api\AuctionController;
use App\Http\Controllers\BidController;
//use App\Http\Controllers\UserController;
use App\Models\Auction;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\UserController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/


Route::controller(AuctionController::class)->group(function () {
    Route::get('auction', 'index');
    Route::post('auction', 'store');
});

Route::controller(UserController::class)->group(function () {
    Route::post('user', 'store');
    Route::put('user', 'update');
    Route::delete('user', 'destroy');
});

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('user', [UserController::class, 'index']);
