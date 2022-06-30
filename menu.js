/* Copyright (C) 2022 b3yc0d3 - All Rights Reserved
 * You may use, distribute and modify this code under the
 * terms of the MPL-2.0 license.
 *
 * You should have received a copy of the MPL-2.0 license with
 * this file. If not, please visit : https://opensource.org/licenses/MPL-2.0
 */

function stringToEl(string) {
    var parser = new DOMParser(),
        content = 'text/html',
        DOM = parser.parseFromString(string, content);

    // return element
    return DOM.body.childNodes[0];
}


class Event {
    constructor(whiteList = []) {
        this.whiteList = whiteList;
        this.listenrs = {};
    }

    on(event, callback) {
        if (!this.whiteList.includes(event)) {
            throw new this.#invalidEventName(event);
        }

        if (!this.listenrs.hasOwnProperty(event)) {
            this.listenrs[`${event}`] = [];
        }

        this.listenrs[`${event}`].push(callback);
    }

    __emit(event, ...data) {

        if (this.whiteList.includes(`${event}`) && this.listenrs.hasOwnProperty(`${event}`)) {
            this.listenrs[`${event}`].forEach((listener) => {
                listener(data);
            })
        }
    }

    #invalidEventName(event) {
        this.name = "InvalidEventName";
        this.message = `Event of '${event}' is unkown`;
    }
}


class MenuJS { }

MenuJS.ContextMenu = class extends Event {
    constructor(options = { items: [], style: { shadow: false, showIcons: true } }) {
        super(["shown", "hide"]);

        this.container = document.createElement("ctxmenu");
        this.shortCuts = [];

        options.items.forEach((item) => {
            this.addItem(item);
        })

        /* Parse User Options */
        if (options.style.shadow == true) {
            this.container.classList.add("shadow");
        }

        if (!options.style.showIcons) {
            this.container.classList.add("no-symbols");
        }

        if (options.style.background) {
            document.documentElement.style.setProperty("--menujs-xtcm-background", `${options.style.background}`);
        }

        if (options.style.foreground) {
            document.documentElement.style.setProperty("--menujs-xtcm-foreground", `${options.style.foreground}`);
        }

        if (options.style.itemBackgroundHover) {
            document.documentElement.style.setProperty("--menujs-xtcm-item--background-hover", `${options.style.itemBackgroundHover}`);
        }

        if (options.style.spacerBackground) {
            document.documentElement.style.setProperty("--menujs-xtcm-sperator--background", `${options.style.spacerBackground}`);
        }

        if (options.style.opacity) {
            var number = options.style.opacity.toFixed(1).toString();
            document.documentElement.style.setProperty("--menujs-xtcm-opacity", `${number}`);
        }
    }

    /**
     * Run Contextmenu Class
     * @param {String} targetIdent Element Identifier to who it should be aplied. (default: null)
     */
    run(targetIdent = null) {

        if (targetIdent != null) {
            this.targets = document.querySelectorAll(targetIdent);

            this.targets.forEach((target) => {

                target.addEventListener("click", (e) => {
                    if (e.buttons == 0) {
                        this.hide();
                    }
                })

                target.addEventListener("contextmenu", (e) => {
                    e.preventDefault();
                    this.#toggleCtxMenu(e);
                })
            })
        }

        document.body.appendChild(this.container);
    }

    /**
     * Add Menu item to Contextmenu
     * @param {Object} ItemObject Item Object
     */
    addItem({ label, icon, click, role, keybind } = { icon: null, role: "item" }) {
        var hasKeybind = false;
        if (keybind) {
            hasKeybind = true;
        }

        switch (role) {

            case "spacer":
                this.container.appendChild(this.#makeSpacer());
                break;

            case "item":
            default:
                // check if 'icon' is null
                if (icon == null) {
                    this.container.appendChild(this.#makeItem(label, null, (hasKeybind ? keybind : null), click));

                } else if (typeof icon.__getHTML == "function") {
                    this.container.appendChild(this.#makeItem(label, icon.__getHTML(), (hasKeybind ? keybind : null), click));
                }
                break;
        }
    }



    #makeItem(label, icon, keyBind, clickCallback) {
        var item = document.createElement("ctxmenu-item");

        var divSymbol = document.createElement("div");
        divSymbol.classList.add("symbol");
        var divLabel = document.createElement("div");
        divLabel.classList.add("label");
        var divKeybind = document.createElement("div");
        divKeybind.classList.add("keybind");

        if (icon != null) {
            divSymbol.appendChild(stringToEl(icon));
        }

        divLabel.textContent = label;
        if (keyBind != null) {
            divKeybind.textContent = keyBind;
        }

        item.appendChild(divSymbol);
        item.appendChild(divLabel);
        item.appendChild(divKeybind);

        item.addEventListener("click", clickCallback);

        if (keyBind != null) {
            var binding = this.#addKeybind(keyBind)

            window.addEventListener("keydown", (e) => {
                var charKey = String.fromCharCode(e.keyCode).toUpperCase();
                if (e.ctrlKey == binding.ctrlKey && e.altKey == binding.altKey && e.shiftKey == binding.shiftKey && charKey == binding.key) {
                    e.preventDefault()
                    clickCallback();
                }
            });
        }

        return item;
    }

    #makeSpacer() {
        return document.createElement("ctxmenu-item-sperator");
    }

    #addKeybind(bind) {
        var parts = `${bind}`.toLowerCase().split("+")

        return {
            ctrlKey: (parts.includes("ctrl")),
            altKey: (parts.includes("alt")),
            shiftKey: (parts.includes("shift")),
            key: parts[parts.length - 1].toUpperCase()
        }
    }

    #toggleCtxMenu(e) {
        if (!this.container.classList.contains("show")) {
            this.show(e.pageX, e.pageY);

        } else {
            this.hide();
        }
    }

    #getViewportSize() {
        var e = window;
        var a = 'inner';
        if (!('innerWidth' in window)) {
            a = 'client';
            e = document.documentElement || document.body;
        }
        return [e[a + 'Width'], e[a + 'Height']]
    }



    /**
     * Show Contextmenu at Cords X and Y
     * @param {Number} x 
     * @param {Number} y 
     */
    show(x, y) {
        if (!this.container.classList.contains("show")) {

            this.container.classList.add("show");

            var xtcmWidth = this.container.offsetWidth;
            var xtcmHeight = this.container.offsetHeight;

            var viewPort = this.#getViewportSize();
            var vpWidth = viewPort[0];
            var vpHeight = viewPort[1];

            /* CHECK FOR 'Y' AXIS */
            if ((x + xtcmWidth) > vpWidth) {
                var overflow = (x + xtcmWidth) - vpWidth;
                var newX = x - overflow;

                x = newX - 5; // 5px "margin"
            }

            /* CHECK FOR 'Y' AXIS */
            if ((y + xtcmHeight) > vpHeight) {
                var overflow = ((y + xtcmHeight) - vpHeight);
                var newY = y - overflow;

                y = newY - 5; // 5px "margin"
            }

            this.container.style.left = x + "px";
            this.container.style.top = y + "px";

            this.__emit("shown", x, y);
        }
    }

    /**
     * Hide Contextmenu
     */
    hide() {
        if (this.container.classList.contains("show")) {
            this.container.classList.remove("show");
            this.__emit("hide");
        }
    }
}

MenuJS.Icon = class {
    constructor() {
        this.path = null;
        this.__type = null;
    }

    /**
     * Set Path to Icon
     * @param {String} path Path to Icon
     * @returns 
     */
    setPath(path) {
        this.path = path;
        this.__type = "IMG";
        return this;
    }

    /**
     * Set SVG Iamge
     * @param {*String data SVG text
     */
    setSVG(data) {
        this.__type = "SVG";
        this.data = data;
        return this;
    }


    __getHTML() {
        switch (this.__type) {
            case "SVG":
                return this.data;

            case "IMG":
                return `<img src="${this.path}">`

            default:
                break;
        }
    }
}