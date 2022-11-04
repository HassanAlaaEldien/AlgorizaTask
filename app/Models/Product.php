<?php

namespace App\Models;

use App\Services\Traits\Filterable;
use App\Services\Traits\HasUploads;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Collection;

class Product extends Model
{
    use HasFactory, HasUploads, Filterable;

    /**
     * @var string
     */
    protected $table = 'products';

    /**
     * @var string[]
     */
    protected $fillable = [
        'category_id',
        'name',
        'description',
        'tags',
        'image'
    ];

    /**
     * @var array|string[]
     */
    protected static array $uploads = [
        'image'
    ];

    /**
     * @return BelongsTo
     */
    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    /**
     * @param $value
     * @return void
     */
    public function setTagsAttribute($value)
    {
        $value = json_decode($value, TRUE);

        $this->attributes['tags'] = Collection::make($value)->pluck('value')->implode(',');
    }
}
