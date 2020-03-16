'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function forIn(a) {
    return Object.keys(a);
}
var createBemTable = function (t, key, elements, type) {
    if (elements === void 0) { elements = []; }
    var res = {};
    forIn(t).forEach(function (k) {
        res[k] = BEM(t[k], k, type, elements.concat([key]));
    });
    return res;
};
var createBemToString = function (key, elements, parse) {
    if (elements === void 0) { elements = []; }
    return {
        toString: function () { return parse(elements.concat([key]).join('--')); }
    };
};
function BEM(t, key, type, elements) {
    if (elements === void 0) { elements = []; }
    var parse = type === 'style'
        ? function (v) { return "[data-bem='" + v + "']"; }
        : function (v) { return v; };
    var fn = (function () {
        var arr = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            arr[_i] = arguments[_i];
        }
        var _key = [key].concat(arr).join('__');
        var table = createBemTable(t, _key, elements, type);
        var toStr = createBemToString(_key, elements, parse);
        return Object.assign({}, table, toStr);
    });
    var table = createBemTable(t, key, elements, type);
    var toStr = createBemToString(key, elements, parse);
    return Object.assign(fn, table, toStr);
}

var Stylesheet = /** @class */ (function () {
    function Stylesheet() {
    }
    Stylesheet.add = function (rules) {
        this.list = this.list.concat(rules);
        this.update();
    };
    Stylesheet.delete = function (rules) {
        this.list = this.list.filter(function (v) { return rules.find(function (s) { return s == v; }); });
        this.update();
    };
    Stylesheet.update = function () {
        var _this = this;
        if (this.updateTimeOut)
            clearTimeout(this.updateTimeOut);
        setTimeout(function () {
            var _a;
            (_a = document.getElementById('m-stylesheet')) === null || _a === void 0 ? void 0 : _a.remove();
            var node = document.createElement('style');
            node.id = 'm-stylesheet';
            var styleHtml = _this.list.map(function (v) { return "\n    " + v.selector + "{\n        " + Object.keys(v.property).map(function (key) {
                var name = key.split('').map(function (v) { return v.toLocaleLowerCase() === v ? v : ('-' + v.toLocaleLowerCase()); }).join('');
                return name + ":" + v.property[key];
            }).join(';\r\n        ') + "\n    }\n    \r\n"; }).join('\r\n');
            node.innerHTML = styleHtml;
            document.head.appendChild(node);
            _this.updateTimeOut = null;
        }, 10);
    };
    Stylesheet.list = [];
    Stylesheet.updateTimeOut = null;
    return Stylesheet;
}());

var CssBlock = /** @class */ (function () {
    function CssBlock(name, t) {
        this.styleBEM = BEM(t, name, 'style');
        this.attrBEM = BEM(t, name, 'attr');
        this.name = name;
        this.rulelist = [];
    }
    CssBlock.gen = function (name, t) {
        return new this(name, t);
    };
    CssBlock.prototype.rule = function (rule) {
        console.log(this.rulelist.length);
        var _a = rule(this.styleBEM), selector = _a[0], property = _a[1];
        Stylesheet.delete(this.rulelist);
        console.log(this.rulelist.length);
        this.rulelist.push({ selector: selector.toString(), property: property });
        Stylesheet.add(this.rulelist);
        return this;
    };
    CssBlock.prototype.rules = function (rule) {
        var _this = this;
        var list = rule(this.styleBEM);
        var res = [];
        var flag = false;
        list.forEach(function (v) {
            var _a;
            if (typeof v === 'string' || v.hasOwnProperty('toString')) {
                if (flag === false) {
                    res.push({
                        selector: [v],
                        property: {}
                    });
                }
                else {
                    (_a = res[res.length - 1]) === null || _a === void 0 ? void 0 : _a.selector.push(v);
                }
                flag = true;
            }
            else {
                var c = v;
                var s = res[res.length - 1];
                if (s)
                    s.property = Object.assign(s.property, c);
                flag = false;
            }
        });
        res.forEach(function (v) { return [
            _this.rule(function () { return [v.selector, v.property]; })
        ]; });
        return this;
    };
    CssBlock.prototype.getTag = function () { return this.attrBEM; };
    return CssBlock;
}());

exports.BemBlock = CssBlock;
//# sourceMappingURL=bundle.cjs.js.map
