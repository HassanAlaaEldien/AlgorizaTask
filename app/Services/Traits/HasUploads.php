<?php
/**
 * Created by PhpStorm.
 * User: hasasn
 * Date: 19/02/21
 * Time: 01:22 PM
 */

namespace App\Services\Traits;

use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

trait HasUploads
{
    /**
     * @param $key
     * @param $value
     */
    public function setAttribute($key, $value)
    {
        if (array_key_exists($key, self::$uploads) || in_array($key, self::$uploads)) {
            $snake_class_name = Str::snake(str_replace('App\\Models\\', '', get_called_class()));
            $class_name = Str::lower($snake_class_name);
            $plural_model_name = Str::plural($class_name);

            $this->StoreFile($value, $key, $plural_model_name);
        } else {
            parent::setAttribute($key, $value);
        }
    }

    /**
     * @param $value
     * @param $name
     * @param string $plural_model_name
     */
    private function StoreFile($value, $name, string $plural_model_name): void
    {
        if (is_object($value)) {
            $this->{$name} ? Storage::disk('public')->delete($this->{$name}) : null;
            $path = "{$plural_model_name}/" . (self::$uploads[$name] ?? '');
            $value = Storage::disk('public')->putFile(rtrim($path, '/'), $value);
        }
        $this->attributes[$name] = $value;
    }

    /**
     * The "booted" method of the model.
     *
     * @return void
     */
    protected static function booting()
    {
        static::deleting(function ($model) {
            foreach (self::$uploads as $key => $upload) {
                $file = is_numeric($key) ? $upload : $key;
                if ($model->{$file})
                    Storage::disk('public')->delete($model->{$file});
            }
        });
    }
}
