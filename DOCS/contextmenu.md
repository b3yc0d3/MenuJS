# Usage ContextMenu
- [Usage ContextMenu](#usage-contextmenu)
  - [ContextMenu(&lt;options&gt;)](#contextmenuoptions)
  - [addItem(&lt;item&gt;)](#additemitem)
  - [run(&lt;target_ident&gt;)](#runtarget_ident)
  - [on(&lt;event_name&gt;, &lt;callback&gt;)](#onevent_name-callback)

## ContextMenu(&lt;options&gt;)
Type: `class`\
Syntax: `new ContextMenu(<options>)`\
Args:\
&ensp;&ensp;&ensp;`options` [__[option_object]__](./objects.md#option-object) Option Object.\
Creates a new ContextMenu instance.

## addItem(&lt;item&gt;)
Type: `function`\
Syntax: `ContextMenu.addItem(<item>)`\
Args:\
&ensp;&ensp;&ensp;`item` [__[item_object]__](./objects.md#menu-item-object) Menu Item Object.\
Adds a new Item to the ContextMenu.

## run(&lt;target_ident&gt;)
Type: `function`\
Syntax: `ContextMenu.run(<target_ident>)`\
Args:\
&ensp;&ensp;&ensp;`target_ident` Identifier of Element that should trigger the Menu. (can be `null`)\
Initalizes the ContextMenu.

## on(&lt;event_name&gt;, &lt;callback&gt;)
Type: `function`\
Syntax: `ContextMenu.on(<event_name>, <callback>)`\
Args:\
&ensp;&ensp;&ensp;`event_name` Name of Event to listen for.\
&ensp;&ensp;&ensp;`callback` Function that will be called when event is emitted.\
Events:\
&ensp;&ensp;&ensp; `shown` Emitted when Contextmenu is Shown.\
&ensp;&ensp;&ensp; `hide` Emized when Contextmenu is hidden.\
Add a event listener to ContextMenu.
