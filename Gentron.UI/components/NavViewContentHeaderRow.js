"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const metro_1 = require("./metro");
class NavViewContentHeaderRow extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (React.createElement(metro_1.Row, { className: "mb-2" },
            React.createElement(metro_1.Cell, { colSpan: 12 },
                React.createElement("h3", null,
                    this.props.iconClassName && this.props.iconClassName.length > 0
                        ? React.createElement("span", { className: `${this.props.iconClassName} mif-md mr-2` })
                        : React.createElement("span", null),
                    this.props.title))));
    }
}
exports.default = NavViewContentHeaderRow;
