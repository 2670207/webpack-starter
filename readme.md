# Webpack Starter
Пакет предоставляет возможность быстро развернуть **webpack** и установить необхомые зависимостями. В пакет входят зависимости для верстки: **jquery**, **foundation-sites**, **owl.carousel**, **alpine.js**. Так же пакет содержит зависимости для работы разработки:  **sass**, **babel**.

## Установка

1. С клонировать пакет из **github** репозитория командой `git clone https://github.com/2670207/webpack-starter.git` в папку разработки.
2. Из установленные файлов удалить скрытую папку `.git` (если не планируется доработка самого пакета).
3. Для работы с npm необходимо установить стабильную версию [Node.js]([https://nodejs.org/en/download/). 
4. В папке клонированного репозитория необходимо запустить команду `npm install`, команда устанавливает все зависимости необходимые для работы.

## Доступные режимы работы:
1. Режим **watch** запускается командой `npm run watch`. Режим отслеживает изменения в файлах, при каждом изменении файла происходит сборка проекта в режим **development**
2. Режим **development** запускается командой `npm run dev`. Режим оставляет все файлы в исходном варианте.
3. Режим **productioin** запускается командой  `npm run prod`. Режим уменьшает размеры файлов `js`, `css`, также удаляет все sorce-map