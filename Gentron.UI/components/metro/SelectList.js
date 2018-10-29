"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
class SelectList extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (React.createElement("label", { className: "select dropdown-toggle" },
            React.createElement("select", { "data-role": "select", "data-role-select": "true", onChange: console.log, onSelect: console.log }, this.props.collection.map((item, i) => {
                const value = item[this.props.valueField.toString()];
                const extraProps = (value === this.props.value)
                    ? { selected: true }
                    : {};
                return (React.createElement("option", Object.assign({ key: i, value: item[this.props.valueField.toString()] }, extraProps), item[this.props.textField]));
            })),
            React.createElement("div", { className: "button-group" }),
            React.createElement("div", { className: "select-input" }, this.props.value),
            React.createElement("div", { className: "drop-container", "data-role": "dropdown", "data-role-dropdown": "true", style: { display: `none` } },
                React.createElement("div", { className: "input" },
                    React.createElement("input", { type: "text", "data-role": "input", placeholder: "", className: "", "data-role-input": "true" }),
                    React.createElement("div", { className: "button-group" },
                        React.createElement("button", { className: "button input-clear-button", tabIndex: -1, type: "button" },
                            React.createElement("span", { className: "default-icon-cross" })))),
                React.createElement("ul", { className: "d-menu", style: { maxHeight: `200px` } }, this.props.collection.map((item, i) => {
                    const value = item[this.props.valueField.toString()];
                    const className = (value === this.props.value)
                        ? `active`
                        : null;
                    return (React.createElement("li", { key: i, "data-text": item[this.props.textField], "data-value": item[this.props.valueField.toString()], className: "active" },
                        React.createElement("a", null, "CAUtils")));
                })))));
    }
}
exports.default = SelectList;
