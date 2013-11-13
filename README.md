megavisor
=========

Public API

Каталог
-------

### Запрос
GET http://megavisor.com/export/catalog.json?%params%

%params% — GET параметры, param1=val&param2=val

Все параметры являются не обязательными.

| параметр | описание | возможные значения | значение по умолчанию |
| --- | --- | --- | --- |
| uuid | уникальный идентификатор каталога | [0-9]+ | нет |
| type | фильтр типа контента | sequence, animation, slideshow, panorama, video | нет |
| timestamp | сортировка по дате | asc, desc | desc |
| rating | сортировка по рейтингу | asc, desc | desc |
| name | сортировка по имени | asc, desc | asc |
| editor | редакторская сортировка | asc, desc | desc |
| tags | фильтр по тегам | id тегов через запятую ( например: 129,156) | нет |
| search | фильтр по прямому вхождению строки, в любое из полей | например: "samsung", "iphone 6" | нет |
| page | номер страницы | [0-9]+ | 1 |

### Ответ (в формате json)
```json
{
  "items": [
    {
    "uuid" : "",
    "barcode"  : "",
    "name" : "",
    "note" : "",
    "placholder" : "",
    "url": "http://megavisor.com/view/%uuid%"
    }
    ...
  ],
  
  "info": {
    "nextPage" : "http://megavisor.com/export/catalog.json?page=2&type=...",
    "pageNumber": 1,
    "totalCount": 200
  }
}
```
items - массив *json* объектов, где:

| поле | описание |
| --- | --- |
| uuid | уникальный идентификатор объекта |
| barcode | штрихкод объекта |
| name | название объекта |
| note | заметка к объекту (свободное поле) |
| placeholder | ссылка на изображение preview |
| url | ссылка на объект http://megavisor.com/view/%uuid% |


Последним элементом массива может быть объект, с единственным свойством "nextPage" в котором будет ссылка на следующую страницу выборки, с теми же параметрами

### Пример
GET http://megavisor.com/export/catalog.json?search=samsung
```json
[
  "items": [
    {
      "uuid": "e908021b-a6fa-4ef5-acb6-c8fd2c526c12",
      "barcode": "",
      "name": "Samsung",
      "note": "",
      "placeholder": "//media6.megavisor.com/storage/519b3af7582b94550300006e",
      "url": "http://megavisor.com/view/e908021b-a6fa-4ef5-acb6-c8fd2c526c12"
    },
    {
      "uuid": "ab61cb73-d457-4d91-b63b-e0c01a14c72d",
      "barcode": "8806085263888",
      "name": "Samsung GALAXY S III",
      "note": "",
      "placeholder": "//media.megavisor.com/storage/5194b856582b94f63a000cc9",
      "url": "http://megavisor.com/view/ab61cb73-d457-4d91-b63b-e0c01a14c72d"
    }
    ...
  ]
  
  "info": {
    "nextPage": "http://megavisor.com/export/catalog.json?search=samsung&page=2",
    "pageNumber": 1,
    "totalCount": 575
  }
]
```
