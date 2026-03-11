<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Contracts\Filesystem\Cloud;
use Illuminate\Filesystem\FilesystemAdapter;
use Illuminate\Support\Facades\Storage;

class Tape extends Model
{
    public $timestamps = false;
    private const IMAGE_FIELDS = ['img1', 'img2', 'img3', 'img4', 'img5', 'img6'];

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

    protected $appends = [
        'img1_url',
        'img2_url',
        'img3_url',
        'img4_url',
        'img5_url',
        'img6_url',
    ];

    public function getImg1UrlAttribute(): ?string
    {
        return $this->resolveImageUrl('img1');
    }

    public function getImg2UrlAttribute(): ?string
    {
        return $this->resolveImageUrl('img2');
    }

    public function getImg3UrlAttribute(): ?string
    {
        return $this->resolveImageUrl('img3');
    }

    public function getImg4UrlAttribute(): ?string
    {
        return $this->resolveImageUrl('img4');
    }

    public function getImg5UrlAttribute(): ?string
    {
        return $this->resolveImageUrl('img5');
    }

    public function getImg6UrlAttribute(): ?string
    {
        return $this->resolveImageUrl('img6');
    }

    private function resolveImageUrl(string $field): ?string
    {
        if (!in_array($field, self::IMAGE_FIELDS, true)) {
            return null;
        }

        $path = $this->getAttribute($field);

        if (blank($path)) {
            return null;
        }

        if (str_starts_with($path, 'http://') || str_starts_with($path, 'https://')) {
            return $path;
        }

        $disk = config('filesystems.tape_image_disk', 'public');
        /** @var Cloud|FilesystemAdapter $storage */
        $storage = Storage::disk($disk);

        return $storage->url($path);
    }
}
