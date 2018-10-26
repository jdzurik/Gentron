"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
;
class Row extends React.PureComponent {
    constructor(props) {
        super(props);
    }
    render() {
        let className = "";
        if (className.length === 0) {
            className = `row`;
        }
        if (this.props.className && this.props.className.length > 0) {
            className += ` ${this.props.className}`;
        }
        let props = {};
        for (let key in this.props) {
            if (key in HTMLDivElement.prototype) {
                props[key] = this.props[key];
            }
        }
        props.className = className;
        return (React.createElement("div", Object.assign({}, props), this.props.children));
    }
}
exports.default = Row;
