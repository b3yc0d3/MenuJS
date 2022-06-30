# MenuJS
Simple Library to create Contextmenus

## Documentation
- [MenuJS](https://github.com/b3yc0d3/MenuJS/blob/master/DOCS/menujs.md)
  - [ContextMenu](https://github.com/b3yc0d3/MenuJS/blob/master/DOCS/contextmenu.md)
  - [Icon](https://github.com/b3yc0d3/MenuJS/blob/master/DOCS/icon.md)
- [Objects](https://github.com/b3yc0d3/MenuJS/blob/master/DOCS/objects.md)


## Quick Start
To use this Library, first add following in the HTML header
```html
<link rel="stylesheet" href="./menujs.min.css">
<script src="./menu.js"></script>
```

then you can use it like this
```js
var ctxMenu = new MenuJS.ContextMenu({
    items: [
        {
            label: "MenuItem 1",
            click: () => { alert("MenuItem 1 was cliked") },
            keybind: "Ctrl+B"
        },
        {
            label: "MenuItem 2",
            click: () => { alert("MenuItem 2 was cliked") },
            keybind: "Ctrl+N"
        },
        {
            role: "spacer"
        }
    ]
})

ctxMenu.run("body"); // can also be 'ctxMenu.run();'
```