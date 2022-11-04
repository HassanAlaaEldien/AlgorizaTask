<?php

namespace App\Services\Filters\Elements;

use App\Services\Filters\Filters;
use Illuminate\Database\Eloquent\Builder;

class CategoriesFilters extends Filters
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
    public function parent_category($value): Builder
    {
        return $this->builder->where('parent_category_id', $value);
    }

    /**
     * @param $value
     * @return Builder
     */
    public function is_active($value): Builder
    {
        $value = match ($value) {
            'yes' => 1,
            'no' => 0,
            default => null
        };
        return $this->builder->where('is_active', $value);
    }

    /**
     * @param $value
     * @return Builder
     */
    public function except($value): Builder
    {
        return $this->builder->whereNotIn('id', [$value]);
    }
}
