"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
;
class Cell extends React.PureComponent {
    constructor(props) {
        super(props);
    }
    render() {
        let className = "";
        if (this.props.colSpan && this.props.colSpan.toString().length > 0) {
            className += `cell-${this.props.colSpan}`;
        }
        if (this.props.colSpanSm && this.props.colSpanSm.toString().length > 0) {
            className += `cell-sm-${this.props.colSpanSm}`;
        }
        if (this.props.colSpanMd && this.props.colSpanMd.toString().length > 0) {
            className += `cell-md-${this.props.colSpanMd}`;
        }
        if (this.props.colSpanLg && this.props.colSpanLg.toString().length > 0) {
            className += `cell-lg-${this.props.colSpanLg}`;
        }
        if (this.props.colSpanXl && this.props.colSpanXl.toString().length > 0) {
            className += `cell-xl-${this.props.colSpanXl}`;
        }
        if (this.props.colSpanXxl && this.props.colSpanXxl.toString().length > 0) {
            className += `cell-xxl-${this.props.colSpanXxl}`;
        }
        if (className.length === 0) {
            className = `cell`;
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
exports.default = Cell;
