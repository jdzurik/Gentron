"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
class Switch extends React.Component {
    constructor(props) {
        super(props);
    }
    handleChange(ev) {
        this.props.onStateChanged(ev.target.checked);
    }
    render() {
        return (React.createElement("input", { type: "checkbox", "data-role": "switch", checked: this.props.checked, onChange: this.handleChange.bind(this) }));
    }
}
exports.default = Switch;
