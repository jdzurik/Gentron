"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var metro_1 = require("./metro");
var NavViewContentHeaderRow_1 = require("./NavViewContentHeaderRow");
var FileSources = (function (_super) {
    __extends(FileSources, _super);
    function FileSources(props) {
        return _super.call(this, props) || this;
    }
    FileSources.prototype.render = function () {
        return (React.createElement(metro_1.Cell, { className: "h-100" },
            React.createElement(metro_1.Grid, { className: "w-100 h-100 p-3" },
                React.createElement(NavViewContentHeaderRow_1.default, { iconClassName: "mif-drive", title: "File Sources" }),
                React.createElement("h1", null, this.props.match.params.id))));
    };
    return FileSources;
}(React.Component));
exports.default = FileSources;
