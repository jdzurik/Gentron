"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const hash = require("object-hash");
const React = require("react");
const PackageSettings_1 = require("../actions/PackageSettings");
const redux_1 = require("redux");
const connect_1 = require("../connect");
const metro_1 = require("./metro");
const react_monaco_editor_1 = require("react-monaco-editor");
const NavViewContentHeaderRow_1 = require("./NavViewContentHeaderRow");
let Engine = class Engine extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (React.createElement(metro_1.Cell, { className: "h-100" },
            React.createElement(metro_1.Grid, { className: "w-100 h-100 p-3" },
                React.createElement(NavViewContentHeaderRow_1.default, { iconClassName: "mif-drive-eta", title: this.props.Engine.Name }),
                React.createElement(metro_1.Row, { className: "mt-2 mb-2" },
                    React.createElement(metro_1.Cell, null,
                        React.createElement(metro_1.LinkButton, { iconClassName: "mif-arrow-left", linkTo: "/engines/manage", buttonText: "View All Engines" }),
                        React.createElement(metro_1.LinkButton, { iconClassName: "mif-arrow-right", iconPosition: "forward", linkTo: `/engines/manage/${this.props.match.params.id}/templates`, buttonText: "Manage Templates", buttonClassName: "ml-2" }))),
                React.createElement(metro_1.Row, { className: "h-100 mt-2" },
                    React.createElement(metro_1.Cell, null,
                        React.createElement("div", { className: "h-100 w-100 border bd-grayWhite border-size-2" },
                            React.createElement(react_monaco_editor_1.default, { language: "javascript", value: (() => { }).toString(), options: { wordWrap: `on` }, onChange: console.log, editorDidMount: () => { } })))))));
    }
};
Engine = __decorate([
    connect_1.connect(mapStateToProps, mapDispatchToProps)
], Engine);
exports.default = Engine;
function mapStateToProps(state, routeComponentProps) {
    const id = routeComponentProps.match.params.id;
    const _hash = hash(state.PackageSettings.Engines[id] || "");
    return {
        Engine: state.PackageSettings.Engines[id],
        _hash: _hash
    };
}
function mapDispatchToProps(dispatch) {
    return redux_1.bindActionCreators(PackageSettings_1.ActionCreators, dispatch);
}
