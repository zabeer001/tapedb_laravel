<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Tape extends Model
{
    public $timestamps = false;

    protected $fillable = [
        'user_id',
        'name',
        'title',
        'year',
        'distributor',
        'case_desc',
        'seal',
        'sticker',
        'watermarks',
        'etching',
        'notes',
        'qa_checked',
        'screener',
        'first_printer',
        'guard_color',
        'upc',
        'img1',
        'img2',
        'img3',
        'img4',
        'img5',
        'img6',
        'approved',
    ];

    protected $casts = [
        'approved' => 'boolean',
        'created_at' => 'datetime',
    ];
}
