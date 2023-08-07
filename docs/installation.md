---
title: Livewire 3 - Installation
lang: id-ID
---

# Installation

Livewire adalah paket Laravel, jadi Anda perlu memiliki aplikasi Laravel yang sudah berjalan sebelum Anda dapat menginstal dan menggunakan Livewire. Jika Anda membutuhkan bantuan dalam mengatur aplikasi Laravel baru, silakan lihat [dokumentasi resmi Laravel](https://laravel.com/docs/installation).

Untuk menginstal Livewire, buka terminal Anda dan navigasikan ke direktori aplikasi Laravel Anda, kemudian jalankan perintah berikut:

```shell
composer require livewire/livewire "^3.0@beta"
```

Itu saja — benar-benar. Jika Anda ingin opsi kustomisasi lebih lanjut, lanjutkan membaca. Jika tidak, Anda dapat langsung menggunakan Livewire.

## Publishing the configuration file

Livewire adalah "zero-config", yang berarti Anda dapat menggunakannya dengan mengikuti konvensi, tanpa konfigurasi tambahan. Namun, jika diperlukan, Anda dapat memublikasikan dan menyesuaikan file konfigurasi Livewire dengan menjalankan perintah Artisan berikut:

```shell
php artisan livewire:publish --config
```

Ini akan membuat file `livewire.php` baru di direktori `config` aplikasi Laravel Anda.

## Manually including Livewire's frontend assets

Secara default, Livewire menyisipkan aset JavaScript dan CSS yang dibutuhkannya ke setiap halaman yang menyertakan komponen Livewire.

Jika Anda ingin lebih mengontrol perilaku ini, Anda dapat memasukkan aset secara manual ke halaman menggunakan directive Blade berikut:

```blade
<html>
<head>
	...
	@livewireStyles
</head>
<body>
	...
	@livewireScripts
</body>
</html>
```

Dengan memasukkan aset ini secara manual ke halaman, Livewire akan tahu untuk tidak menyisipkan aset secara otomatis.

Meskipun jarang diperlukan, Anda dapat menonaktifkan perilaku penyisipan aset Livewire secara otomatis dengan memperbarui opsi konfigurasi `inject_assets` [configuration option](#publishing-config) di file `config/livewire.php` aplikasi Anda:

```php
'inject_assets' => false,
```

Jika Anda lebih suka memaksa Livewire untuk menyisipkan asetnya pada satu halaman atau beberapa halaman, Anda dapat memanggil metode global berikut dari rute saat ini atau dari service provider:

```php
\Livewire\Livewire::forceAssetInjection();
```

## Configuring Livewire's update endpoint

Setiap pembaruan dalam komponen Livewire mengirim permintaan jaringan ke server pada titik akhir berikut: `https://example.com/livewire/update`

Ini dapat menjadi masalah bagi beberapa aplikasi yang menggunakan lokalitas atau multi-tenancy.

Dalam kasus tersebut, Anda dapat mendaftarkan titik akhir Anda sendiri sesuai keinginan Anda, dan selama Anda melakukannya di dalam `Livewire::setUpdateRoute()`, Livewire akan tahu untuk menggunakan titik akhir ini untuk semua pembaruan komponen:

```php
Livewire::setUpdateRoute(function ($handle) {
	return Route::post('/custom/livewire/update', $handle);
});
```

Sekarang, alih-alih menggunakan `/livewire/update`, Livewire akan mengirim pembaruan komponen ke `/custom/livewire/update`.

Karena Livewire memungkinkan Anda mendaftarkan rute pembaruan sendiri, Anda dapat mendeklarasikan middleware tambahan apa pun yang ingin Livewire gunakan langsung di dalam `setUpdateRoute()`:

```php
Livewire::setUpdateRoute(function ($handle) {
	return Route::post('/custom/livewire/update', $handle)
        ->middleware([...]); // [!code hl]
});
```

## Customizing the asset URL

Secara default, Livewire akan menyajikan aset JavaScript-nya dari URL berikut: `https://example.com/livewire/livewire.js`. Selain itu, Livewire akan merujuk aset ini dari tag script seperti berikut:

```blade
<script src="/livewire/livewire.js" ...
```

Jika aplikasi Anda memiliki awalan rute global karena lokalitas atau multi-tenancy, Anda dapat mendaftarkan titik akhir khusus yang harus digunakan Livewire secara internal saat mengambil JavaScript-nya.

Untuk menggunakan titik akhir aset JavaScript kustom, Anda dapat mendaftarkan rute sendiri di dalam `Livewire::setScriptRoute()`:

```php
Livewire::setScriptRoute(function ($handle) {
    return Route::get('/custom/livewire/livewire.js', $handle);
});
```

Sekarang, Livewire akan memuat JavaScript-nya seperti berikut:

```blade
<script src="/custom/livewire/livewire.js" ...
```

## Manually bundling Livewire and Alpine

Secara default, Alpine dan Livewire dimuat menggunakan tag `<script src="livewire.js">`, yang berarti Anda tidak memiliki kendali atas urutan pemuatan library ini. Akibatnya, mengimpor dan mendaftarkan plugin Alpine, seperti yang ditunjukkan dalam contoh di bawah ini, tidak akan berfungsi:

```js
// Warning: This snippet demonstrates what NOT to do...

import Alpine from 'alpinejs'
import Clipboard from '@ryangjchandler/alpine-clipboard'

Alpine.plugin(Clipboard)
Alpine.start()
```

Untuk mengatasi masalah ini, kita perlu memberi tahu Livewire bahwa kita ingin menggunakan versi ESM (ECMAScript module) sendiri dan mencegah penyisipan tag skrip `livewire.js`. Untuk mencapai ini, kita harus menambahkan directive `@livewireScriptConfig` ke file layout kita ... (`resources/views/components/layouts/app.blade.php`):


```blade
<html>
<head>
    <!-- ... -->

    @vite(['resources/js/app.js'])
</head>
<body>
    {{ $slot }}

    @livewireScriptConfig // [!code hl]
</body>
</html>
```

Ketika Livewire mendeteksi directive `@livewireScriptConfig`, ia akan menahan diri dari menyisipkan skrip Livewire dan Alpine. Jika Anda menggunakan directive `@livewireScripts` untuk memuat Livewire secara manual, pastikan untuk menghapusnya.

Langkah terakhir adalah mengimpor Alpine dan Livewire di file `app.js` kita, yang memungkinkan kita untuk mendaftarkan sumber daya kustom apa pun, dan pada akhirnya memulai Livewire dan Alpine:

```js
import { Livewire, Alpine } from '../../vendor/livewire/livewire/dist/livewire.esm';
import Clipboard from '@ryangjchandler/alpine-clipboard'

Alpine.plugin(Clipboard)

Livewire.start()
```
