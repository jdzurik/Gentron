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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var hash = require("object-hash");
var React = require("react");
var PackageSettings_1 = require("../actions/PackageSettings");
var redux_1 = require("redux");
var metro_1 = require("./metro");
var connect_1 = require("../connect");
var NavViewContentHeaderRow_1 = require("./NavViewContentHeaderRow");
var PackageSettings = (function (_super) {
    __extends(PackageSettings, _super);
    function PackageSettings(props) {
        return _super.call(this, props) || this;
    }
    PackageSettings.prototype.render = function () {
        var _this = this;
        return (React.createElement(metro_1.Cell, { className: "h-100" },
            React.createElement(metro_1.Grid, { className: "w-100 h-100 p-3" },
                React.createElement(NavViewContentHeaderRow_1.default, { iconClassName: "mif-gift", title: "Package Settings" }),
                React.createElement(metro_1.Row, { className: "mb-2" },
                    React.createElement("label", { className: "cell-3 text-right" }, "Package Name"),
                    React.createElement(metro_1.Cell, { colSpan: 9 },
                        React.createElement("div", { className: "input" },
                            React.createElement("input", { type: "text", placeholder: "Package Name", value: this.props.PackageName, onChange: function (ev) { return _this.props.addOrUpdatePackageName(ev); }, "data-role": "input", "data-role-input": true }),
                            React.createElement("div", { className: "button-group" },
                                React.createElement("button", { className: "button input-clear-button", tabIndex: -1, type: "button", onClick: this.props.addOrUpdatePackageName.bind(this, null) },
                                    React.createElement("span", { className: "default-icon-cross" })),
                                React.createElement("button", { className: "button input-custom-button", tabIndex: -1, type: "button", onClick: console.log },
                                    React.createElement("span", { className: "mif-folder-open" })))))))));
    };
    PackageSettings = __decorate([
        connect_1.connect(mapStateToProps, mapDispatchToProps)
    ], PackageSettings);
    return PackageSettings;
}(React.Component));
exports.default = PackageSettings;
function mapStateToProps(state) {
    var _hash = hash(state.PackageSettings);
    return {
        DatabaseSources: state.PackageSettings.DatabaseSources,
        Engines: state.PackageSettings.Engines,
        FileSources: state.PackageSettings.FileSources,
        HttpSources: state.PackageSettings.HttpSources,
        PackageName: state.PackageSettings.PackageName,
        ReadMeText: state.PackageSettings.ReadMeText,
        _hash: _hash
    };
}
function mapDispatchToProps(dispatch) {
    return redux_1.bindActionCreators(PackageSettings_1.ActionCreators, dispatch);
}
