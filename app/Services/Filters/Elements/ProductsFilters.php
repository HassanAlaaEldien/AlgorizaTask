<?php

namespace App\Services\Filters\Elements;

use App\Services\Filters\Filters;
use Illuminate\Database\Eloquent\Builder;

class ProductsFilters extends Filters
{
    /**
     * @param $value
     * @return Builder
     */
    public function name($value): Builder
    {
        return $this->builder->where('name', 'like', '%' . $value . '%');
    }

    /**
     * @param $value
     * @return Builder
     */
    public function description($value): Builder
    {
        return $this->builder->where('description', 'like', '%' . $value . '%');
    }

    /**
     * @param $value
     * @return Builder
     */
    public function tags($value): Builder
    {
        return $this->builder->where('tags', 'like', '%' . $value . '%');
    }

    /**
     * @param $value
     * @return Builder
     */
    public function category($value): Builder
    {
        return $this->builder->where('category_id', $value);
    }
}
