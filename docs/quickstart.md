---
title: Livewire 3 - Quickstart
lang: id-ID
---

# Quickstart

::: warning
**Livewire 3 masih dalam tahap beta**

Meskipun kami berusaha meminimalkan perubahan yang merusak, perubahan tersebut masih mungkin terjadi selama Livewire 3 masih dalam tahap beta. Oleh karena itu, kami menyarankan untuk menguji aplikasi Anda secara menyeluruh sebelum menggunakan Livewire 3 di produksi.
:::


Untuk memulai perjalanan Anda dengan Livewire, kita akan membuat komponen "counter" sederhana dan merendernya di browser. Contoh ini adalah cara yang bagus untuk mengalami Livewire untuk pertama kalinya karena ini menunjukkan _liveness_ Livewire dengan cara yang paling sederhana.

## Prerequisites

Sebelum kita mulai, pastikan Anda telah menginstal hal-hal berikut:

- Laravel versi 10 atau yang lebih baru
- PHP versi 8.1 atau yang lebih baru

## Install Livewire

Dari direktori root aplikasi Laravel Anda, jalankan perintah [Composer](https://getcomposer.org/) berikut:
```shell
composer require livewire/livewire "^3.0@beta"
```

## Create a Livewire component

Livewire menyediakan perintah Artisan yang nyaman untuk menghasilkan komponen baru dengan cepat. Jalankan perintah berikut untuk membuat komponen `Counter` baru:

```shell
php artisan make:livewire counter
```

Perintah ini akan menghasilkan dua file baru dalam proyek Anda:
* `App/Livewire/Counter.php`
* `resources/views/livewire/counter.blade.php`

## Writing the class

Buka `app/Livewire/Counter.php` dan gantikan isinya dengan yang berikut:

```php
<?php

namespace App\Livewire;

use Livewire\Component;

class Counter extends Component
{
    public $count = 1;

    public function increment()
    {
        $this->count++;
    }

    public function decrement()
    {
        $this->count--;
    }

    public function render()
    {
        return view('livewire.counter');
    }
}
```

Berikut adalah penjelasan singkat tentang kode di atas:
- `public $count = 1;` — Mendeklarasikan properti publik bernama `$count` dengan nilai awal `1`.
- `public function increment()` — Mendeklarasikan metode publik bernama `increment()` yang menambahkan nilai properti `$count` setiap kali dipanggil. Metode publik seperti ini dapat dipicu dari browser dengan berbagai cara, termasuk ketika pengguna mengklik tombol.
- `public function render()` — Mendeklarasikan metode `render()` yang mengembalikan tampilan Blade. Tampilan Blade ini akan berisi template HTML untuk komponen kita.

## Writing the view

Buka file `resources/views/livewire/counter.blade.php` dan gantikan isinya dengan yang berikut:

```blade
<div>
    <h1>{{ $count }}</h1>

    <button wire:click="increment">+</button>

    <button wire:click="decrement">-</button>
</div>
```

Kode ini akan menampilkan nilai properti `$count` dan dua tombol yang masing-masing menambahkan dan mengurangi nilai properti `$count`.

## Register a route for the component

Buka file `routes/web.php` dalam aplikasi Laravel Anda dan tambahkan kode berikut:

```php
use App\Livewire\Counter;

Route::get('/counter', Counter::class);
```

Sekarang, komponen _counter_ kita ditugaskan ke rute `/counter`, sehingga ketika pengguna mengunjungi endpoint `/counter` dalam aplikasi Anda, komponen ini akan dirender oleh browser.

## Create a template layout

Sebelum Anda dapat mengunjungi `/counter` di browser, kita membutuhkan tata letak HTML untuk komponen kita dirender di dalamnya. Secara default, Livewire akan secara otomatis mencari file tata letak yang bernama: `resources/views/components/layouts/app.blade.php`

Anda dapat membuat file ini jika belum ada dengan menjalankan perintah berikut:

```shell
php artisan livewire:layout
```

Perintah ini akan menghasilkan file bernama `resources/views/components/layouts/app.blade.php` dengan konten berikut:

```blade
<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">

        <title>{{ $title ?? 'Page Title' }}</title>
    </head>
    <body>
        {{ $slot }}
    </body>
</html>
```

Komponen _counter_ akan dirender di tempat variabel `$slot` dalam template di atas.

Anda mungkin telah memperhatikan bahwa tidak ada aset JavaScript atau CSS yang disediakan oleh Livewire. Hal ini karena Livewire 3 dan yang lebih baru secara otomatis menyisipkan aset frontend yang dibutuhkannya.

## Test it out

Kunjungi `/counter` di browser Anda, dan Anda akan melihat angka yang ditampilkan di layar dengan dua tombol untuk menambah dan mengurangi angka.

Setelah mengklik salah satu tombol, Anda akan melihat bahwa hitungan diperbarui secara real-time, tanpa perlu me-refresh halaman. Ini adalah keajaiban Livewire: aplikasi frontend dinamis yang ditulis sepenuhnya dalam PHP.

Kita baru saja menyentuh permukaan dari apa yang bisa dilakukan Livewire. Lanjutkan membaca dokumentasi untuk melihat semua fitur yang ditawarkan oleh Livewire.
