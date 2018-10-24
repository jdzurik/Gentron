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
var LinkButton = (function (_super) {
    __extends(LinkButton, _super);
    function LinkButton(props) {
        return _super.call(this, props) || this;
    }
    LinkButton.prototype.render = function () {
        var btnClassName = "button";
        if (this.props.buttonClassName && this.props.buttonClassName.length > 0) {
            btnClassName += " " + this.props.buttonClassName;
        }
        var icon = (this.props.iconClassName && this.props.iconClassName.length > 0)
            ? React.createElement("span", { className: "mif-arrow-left" }, "\u00A0")
            : null;
        var iconPosition = this.props.iconPosition || "";
        return (React.createElement(react_router_dom_1.Link, { to: this.props.linkTo },
            React.createElement("button", { className: btnClassName },
                (icon && iconPosition.length === 0 || iconPosition === "back")
                    ? icon
                    : null,
                this.props.buttonText,
                (icon && iconPosition.length > 0 && iconPosition === "front")
                    ? icon
                    : null)));
    };
    return LinkButton;
}(React.PureComponent));
exports.default = LinkButton;
