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
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_router_dom_1 = require("react-router-dom");
;
var BackButton = (function (_super) {
    __extends(BackButton, _super);
    function BackButton(props) {
        return _super.call(this, props) || this;
    }
    BackButton.prototype.render = function () {
        var btnClassName = "button";
        if (this.props.buttonClassName && this.props.buttonClassName.length > 0) {
            btnClassName += " " + this.props.buttonClassName;
        }
        return (React.createElement(react_router_dom_1.Link, { to: this.props.routeTo },
            React.createElement("button", { className: btnClassName },
                React.createElement("span", { className: "mif-arrow-left" }, "\u00A0"),
                this.props.buttonText)));
    };
    return BackButton;
}(React.PureComponent));
exports.default = BackButton;
