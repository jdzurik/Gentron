"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var metro_1 = require("./metro");
var NavViewContentHeaderRow = /** @class */ (function (_super) {
    __extends(NavViewContentHeaderRow, _super);
    function NavViewContentHeaderRow(props) {
        return _super.call(this, props) || this;
    }
    NavViewContentHeaderRow.prototype.render = function () {
        return (React.createElement(metro_1.Row, null,
            React.createElement(metro_1.Cell, { colSpan: 12 },
                React.createElement("h3", null,
                    this.props.iconClassName && this.props.iconClassName.length > 0
                        ? React.createElement("span", { className: this.props.iconClassName + " mif-md mr-2" })
                        : React.createElement("span", null),
                    this.props.title))));
    };
    return NavViewContentHeaderRow;
}(React.Component));
exports.default = NavViewContentHeaderRow;
