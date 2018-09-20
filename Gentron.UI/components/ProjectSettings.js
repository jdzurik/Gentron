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
var NavViewContentHeaderRow_1 = require("./NavViewContentHeaderRow");
var ProjectSettings = /** @class */ (function (_super) {
    __extends(ProjectSettings, _super);
    function ProjectSettings() {
        return _super.call(this, null) || this;
    }
    ProjectSettings.prototype.render = function () {
        return (React.createElement(metro_1.Cell, { className: "h-100" },
            React.createElement(metro_1.Grid, { className: "w-100 h-100 p-3" },
                React.createElement(NavViewContentHeaderRow_1.default, { iconClassName: "mif-drive2", title: "Project Settings" }),
                React.createElement(metro_1.Row, { className: "mb-2" },
                    React.createElement("label", { className: "cell-3 text-right" }, "Local Package Folder"),
                    React.createElement(metro_1.Cell, { colSpan: 9, id: "Test" },
                        React.createElement("input", { type: "file", placeholder: "Local Package Folder", "data-role": "file", "data-button-title": "<span class='mif-folder'></span>" }))),
                React.createElement(metro_1.Row, { className: "mb-2" },
                    React.createElement("label", { className: "cell-3 text-right" }, "Remote Package Location"),
                    React.createElement(metro_1.Cell, { colSpan: 9 },
                        React.createElement("input", { type: "text", placeholder: "Remote Package Location" }))),
                React.createElement(metro_1.Row, { className: "mb-2" },
                    React.createElement("label", { className: "cell-3 text-right" }, "Output Code Folder"),
                    React.createElement(metro_1.Cell, { colSpan: 9 },
                        React.createElement("input", { type: "file", placeholder: "Output Code Folder", "data-role": "file", "data-button-title": "<span class='mif-folder'></span>" }))))));
    };
    return ProjectSettings;
}(React.Component));
exports.default = ProjectSettings;
