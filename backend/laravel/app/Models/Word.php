<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Word extends Model
{
    protected $fillable = ['word_en', 'word_ru'];

    public function categories()
    {
        return $this->belongsToMany(Category::class);
    }
}
