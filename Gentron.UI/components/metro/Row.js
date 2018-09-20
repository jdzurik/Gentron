"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
;
var Row = (function (_super) {
    __extends(Row, _super);
    function Row(props) {
        return _super.call(this, props) || this;
    }
    Row.prototype.render = function () {
        var className = "";
        if (className.length === 0) {
            className = "row";
        }
        if (this.props.className && this.props.className.length > 0) {
            className += " " + this.props.className;
        }
        var props = {};
        for (var key in this.props) {
            if (key in HTMLDivElement.prototype) {
                props[key] = this.props[key];
            }
        }
        props.className = className;
        return (React.createElement("div", __assign({}, props), this.props.children));
    };
    return Row;
}(React.PureComponent));
exports.default = Row;
