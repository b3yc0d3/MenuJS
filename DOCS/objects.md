# Option Object
```
{
    items: [<menu_items>],
    style: {
        foreground: "<color>",
        background: "<color>",
        itemBackgroundHover: "<color>",
        spacerBackground: "<color>",
        shadow: <true|false>,
        showIcons: <true|false>
    }
}
```
**Parameters**:\
&ensp;&ensp;&ensp;`menu_items` [Menu Item](#menu-item-object) Object.\
&ensp;&ensp;&ensp;`color` Can be one of the following:
- `rgba` CSS rgba
- `#FFF000` Hexadecimal Color
- `var(--some-var)` CSS Variable Name

# Menu Item Object
```
{
    label: "<item_label>",
    role: "<item|spacer>",
    icon: <icon>,
    click: <callback_function>,
    keybind: <key_combination>
}
```
**Parameters**:\
&ensp;&ensp;&ensp;`<item_label>` Text that will be Display in the Item.\
&ensp;&ensp;&ensp;`<icon>` Icon Class.\
&ensp;&ensp;&ensp;`callback_function` A function that will be executed when MenuItem is clicked.\
&ensp;&ensp;&ensp;`key_combination` Key combination for Shortcut.

**Key Combination**:
```
KeyCombination ::= ModifierKey { "+" ModifierKey } "+" Key;

ModifierKey  ::= "Ctrl" | "Alt" | "Shift";
Key          ::= 0-9 | A-Z | F1-F12 | "~" | "!" | "@" | "#" | "§"
               | "Plus" | "Space" | "Tab" | "Capslock" | "Numlock"
               | "Scrolllock | "Backspace" | "Delete" | "Insert"
               | "Enter" | "Up" | "Down" | "Left" | "Right" | "Home"
               | "End" | "PageUp" | "PageDown" | "ESC" | "VolumeUp"
               | "VolumeDown" | "VolumeMute";
```