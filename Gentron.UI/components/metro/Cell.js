"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
;
var Cell = (function (_super) {
    __extends(Cell, _super);
    function Cell(props) {
        return _super.call(this, props) || this;
    }
    Cell.prototype.render = function () {
        var className = "";
        if (this.props.colSpan && this.props.colSpan.toString().length > 0) {
            className += "cell-" + this.props.colSpan;
        }
        if (this.props.colSpanSm && this.props.colSpanSm.toString().length > 0) {
            className += "cell-sm-" + this.props.colSpanSm;
        }
        if (this.props.colSpanMd && this.props.colSpanMd.toString().length > 0) {
            className += "cell-md-" + this.props.colSpanMd;
        }
        if (this.props.colSpanLg && this.props.colSpanLg.toString().length > 0) {
            className += "cell-lg-" + this.props.colSpanLg;
        }
        if (this.props.colSpanXl && this.props.colSpanXl.toString().length > 0) {
            className += "cell-xl-" + this.props.colSpanXl;
        }
        if (this.props.colSpanXxl && this.props.colSpanXxl.toString().length > 0) {
            className += "cell-xxl-" + this.props.colSpanXxl;
        }
        if (className.length === 0) {
            className = "cell";
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
    return Cell;
}(React.PureComponent));
exports.default = Cell;
