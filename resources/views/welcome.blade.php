<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <script src="{{ secure_asset('js/root.js') }}" defer></script>
        <title>Amogus</title>
        <link rel="stylesheet" href="{{ secure_asset('css/app.css') }}"/>
    </head>
    <body>
        <div id="app"></div>
    </body>
</html>
