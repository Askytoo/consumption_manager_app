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
            'stocks' => fn() => $stocks,
            'categories' => array_values(Stock::CATEGORY),
            'regularOptions' => array_values(Stock::IS_REGULAR),
        ])->with('message', 'index');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreStockRequest $request): RedirectResponse
    {
        Auth::user()->stocks()->create($request->validated());
        return to_route('stocks.index')->with('message', '登録');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateStockRequest $request, Stock $stock): RedirectResponse
    {
        $this->authorize('update', $stock);
        $stock->update($request->validated());
        return to_route('stocks.index')->with('message', '編集');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Stock $stock): RedirectResponse
    {
        $this->authorize('delete', $stock);

        $stock->delete();

        return to_route('stocks.index')->with('message', '削除');
    }
}
