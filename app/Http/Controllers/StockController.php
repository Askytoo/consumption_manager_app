<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreStockRequest;
use App\Http\Requests\UpdateStockRequest;
use App\Models\Stock;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class StockController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        $stocks = Auth::user()->stocks()->get(); 

        return Inertia::render('Stocks/Index', [
            'stocks' => $stocks,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreStockRequest $request): RedirectResponse
    {
        Auth::user()->stocks()->create($request->validated());
        return to_route('stocks.index');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateStockRequest $request, Stock $stock): RedirectResponse
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Stock $stock): RedirectResponse
    {
        //
    }
}
