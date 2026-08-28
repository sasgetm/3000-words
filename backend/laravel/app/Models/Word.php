<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\User;

class Word extends Model
{
    protected $fillable = ['word_en', 'word_ru'];

    public function categories()
    {
        return $this->belongsToMany(Category::class);
    }

    public function hiddenByUsers()
    {
        return $this->belongsToMany(
            User::class,
            'hidden_words'
        );
    }
}
