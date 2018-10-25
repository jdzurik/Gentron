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
var connect_1 = require("../connect");
var metro_1 = require("./metro");
var splitpane_1 = require("./splitpane");
var Template = (function (_super) {
    __extends(Template, _super);
    function Template(props) {
        return _super.call(this, props) || this;
    }
    Template.prototype.handleNameClick = function (source) {
        source.Name = "Test";
        this.props.addOrUpdateEngineTemplate(this.props.match.params.engineid, source);
    };
    Template.prototype.render = function () {
        return (React.createElement(metro_1.Cell, { className: "h-100" },
            React.createElement(metro_1.Grid, { className: "w-100 h-100 p-3" },
                React.createElement(metro_1.Row, null,
                    React.createElement(metro_1.Cell, { colSpan: 12 },
                        React.createElement("h3", null,
                            React.createElement("span", { className: "mif-embed2 mif-md mr-2" }),
                            React.createElement("span", { onClick: this.handleNameClick.bind(this, this.props.Template) }, this.props.Template.Name)))),
                React.createElement(metro_1.Row, { className: "mt-2 mb-2" },
                    React.createElement(metro_1.Cell, null,
                        React.createElement(metro_1.LinkButton, { iconClassName: "mif-arrow-left", linkTo: "/engines/manage/" + this.props.match.params.engineid, buttonText: "View All Templates" }))),
                React.createElement(splitpane_1.SplitPane, { splitPaneProps: { split: "vertical", size: "calc(50% - 15px)" } },
                    React.createElement("div", null, "Pane 1"),
                    React.createElement("div", null, "Pane 2")))));
    };
    Template = __decorate([
        connect_1.connect(mapStateToProps, mapDispatchToProps)
    ], Template);
    return Template;
}(React.Component));
exports.default = Template;
function mapStateToProps(state, routeComponentProps) {
    var engineid = routeComponentProps.match.params.engineid;
    var templateid = routeComponentProps.match.params.templateid;
    var _hash = hash(state.PackageSettings.Engines[engineid].Templates[templateid] || "");
    return {
        Template: state.PackageSettings.Engines[engineid].Templates[templateid],
        _hash: _hash
    };
}
function mapDispatchToProps(dispatch) {
    return redux_1.bindActionCreators(PackageSettings_1.ActionCreators, dispatch);
}
