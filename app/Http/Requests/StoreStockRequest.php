<?php

namespace App\Http\Requests;

use App\Models\Stock;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreStockRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\Rule|array|string>
     */
    public function rules(): array
    {
        $category_rule = Rule::in(Stock::CATEGORY);
        $is_regular_rule = Rule::in(Stock::IS_REGULAR);

        return [
            'name' => 'required|string|max:50',
            'category' => 'required|' . $category_rule,
            'quantity' => 'required|integer|between:0,999',
            'unit_name' => 'nullable|string',
            'is_regular' => 'required|' . $is_regular_rule,
            'regular_quantity' => 'required|integer|between:0,999',
        ];
    }

    public function attributes(): array
    {
        return [
            'name' => '商品名',
            'category' => 'カテゴリー',
            'quantity' => '数量',
            'unit_name' => '単位',
            'is_regular' => '常備品',
            'regular_quantity' => '常備数量',
        ];
    }
}
