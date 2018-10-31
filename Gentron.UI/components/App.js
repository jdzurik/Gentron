"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const connected_react_router_1 = require("connected-react-router");
const NavViewContent_1 = require("./NavViewContent");
const NavViewPane_1 = require("./NavViewPane");
class App extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (React.createElement("div", { className: "h-100 w-100" },
            React.createElement(connected_react_router_1.ConnectedRouter, { history: this.props.history },
                React.createElement("div", { "data-role": "navview" },
                    React.createElement(NavViewPane_1.default, null),
                    React.createElement(NavViewContent_1.default, null)))));
    }
}
exports.default = App;
