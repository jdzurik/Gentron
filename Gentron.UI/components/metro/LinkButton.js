"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_router_dom_1 = require("react-router-dom");
;
class LinkButton extends React.PureComponent {
    constructor(props) {
        super(props);
    }
    render() {
        let btnClassName = "button";
        if (this.props.buttonClassName && this.props.buttonClassName.length > 0) {
            btnClassName += ` ${this.props.buttonClassName}`;
        }
        const icon = (this.props.iconClassName && this.props.iconClassName.length > 0)
            ? React.createElement("span", { className: "mif-arrow-left" }, "\u00A0")
            : null;
        const iconPosition = this.props.iconPosition || "";
        return (React.createElement(react_router_dom_1.Link, { to: this.props.linkTo },
            React.createElement("button", { className: btnClassName },
                (icon && iconPosition.length === 0 || iconPosition === `back`)
                    ? icon
                    : null,
                this.props.buttonText,
                (icon && iconPosition.length > 0 && iconPosition === `front`)
                    ? icon
                    : null)));
    }
}
exports.default = LinkButton;
