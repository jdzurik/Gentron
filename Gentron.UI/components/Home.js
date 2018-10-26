"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const metro_1 = require("./metro");
const NavViewContentHeaderRow_1 = require("./NavViewContentHeaderRow");
class Home extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (React.createElement(metro_1.Cell, { className: "h-100" },
            React.createElement(metro_1.Grid, { className: "w-100 h-100 p-3" },
                React.createElement(NavViewContentHeaderRow_1.default, { iconClassName: "mif-home", title: "Home" }))));
    }
}
exports.default = Home;
