<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreStockRequest;
use App\Http\Requests\UpdateStockRequest;
use App\Models\Stock;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
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

        Log::info('User is accessing all his STOCKS', ['user' => Auth::user()->id]);

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
        Log::info('User is trying to CREATE new STOCK', ['user' => Auth::user()->id]);

        if(Auth::user()->stocks()->create($request->validated())) {
            Log::info('User CREATE new STOCK successfully', ['user' => Auth::user()->id, 'data' => $request->validated()]);
            return to_route('stocks.index')->with('message', '登録');
        }
        Log::warning('User could not CREATE a STOCK caused by invalid stock data', ['user' => Auth::user()->id, 'data' => $request->validated()]);
        return to_route('stocks.index');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateStockRequest $request, Stock $stock): RedirectResponse
    {
        $this->authorize('update', $stock);
        
        Log::info('User is trying to UPDATE STOCK', ['user' => Auth::user()->id, 'stock' => $stock->id]);

        if ($stock->update($request->validated())) {
            Log::info('User UPDATE STOCK successfully', ['user' => Auth::user()->id, 'stock' => $request->validated()]);
            return to_route('stocks.index')->with('message', '編集');
        }
        Log::warning('User could not UPDATE a STOCK caused by invalid stock data', ['user' => Auth::user()->id, 'data' => $request->validated()]);
        return to_route('stocks.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Stock $stock): RedirectResponse
    {
        $this->authorize('delete', $stock);

        Log::info('User is trying to DELETE STOCK', ['user' => Auth::user()->id, 'stock' => $stock->id]);

        if ($stock->delete()) {
            Log::info('User UPDATE STOCK successfully', ['user' => Auth::user()->id, 'stock' => $stock->id]);
            return to_route('stocks.index')->with('message', '削除');
        }
        Log::warning('User could not DELETE a STOCK caused by invalid', ['user' => Auth::user()->id, 'data' => $stock->id]);
        return to_route('stocks.index');

    }
}
