<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class HiddenWord extends Model
{
    public $timestamps = false;

    protected $fillable = [
        'user_id',
        'word_id',
    ];
}
