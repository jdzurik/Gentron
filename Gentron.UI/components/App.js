"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const NavView_1 = require("./NavView");
class App extends React.PureComponent {
    constructor(props) {
        super(props);
    }
    render() {
        return (React.createElement("div", { className: "h-100 w-100" },
            React.createElement(NavView_1.default, { history: this.props.history })));
    }
}
exports.default = App;
