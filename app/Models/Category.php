<?php

namespace App\Models;

use App\Services\Traits\Filterable;
use App\Services\Traits\HasUploads;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Category extends Model
{
    use HasFactory, HasUploads, Filterable;

    /**
     * @var string
     */
    protected $table = 'categories';

    /**
     * @var string[]
     */
    protected $fillable = [
        'name',
        'parent_category_id',
        'is_active'
    ];

    /**
     * @var string[]
     */
    protected $casts = [
        'is_active' => 'boolean'
    ];

    /**
     * @var array|string[]
     */
    protected static array $uploads = [
        'contract'
    ];

    /**
     * @return HasMany
     */
    public function products(): HasMany
    {
        return $this->hasMany(Product::class);
    }

    /**
     * @return HasMany
     */
    public function children(): HasMany
    {
        return $this->hasMany(Category::class, 'parent_category_id');
    }

    /**
     * @return BelongsTo
     */
    public function parent(): BelongsTo
    {
        return $this->belongsTo(Category::class, 'parent_category_id');
    }
}
