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
const SplitPane_1 = require("./SplitPane");
const react_monaco_editor_1 = require("react-monaco-editor");
let Template = class Template extends React.Component {
    constructor(props) {
        super(props);
    }
    handleNameClick(source) {
        source.Name = "Test";
        this.props.addOrUpdateEngineTemplate(this.props.match.params.engineid, source);
    }
    render() {
        return (React.createElement(metro_1.Cell, { className: "h-100" },
            React.createElement(metro_1.Grid, { className: "w-100 h-100 p-3" },
                React.createElement(metro_1.Row, null,
                    React.createElement(metro_1.Cell, { colSpan: 12 },
                        React.createElement("h3", null,
                            React.createElement("span", { className: "mif-embed2 mif-md mr-2" }),
                            React.createElement("span", { onClick: this.handleNameClick.bind(this, this.props.Template) }, this.props.Template.Name)))),
                React.createElement(metro_1.Row, { className: "mt-2 mb-2" },
                    React.createElement(metro_1.Cell, null,
                        React.createElement(metro_1.LinkButton, { iconClassName: "mif-arrow-left", linkTo: `/engines/manage/${this.props.match.params.engineid}`, buttonText: "View All Engine Templates" }))),
                React.createElement(SplitPane_1.default, { splitPaneProps: { split: `vertical`, size: `calc(50% - 15px)` } },
                    React.createElement("div", { className: "h-100 w-100" },
                        React.createElement(react_monaco_editor_1.default, { language: "javascript", value: (() => { }).toString(), options: {}, onChange: console.log, editorDidMount: console.log })),
                    React.createElement("div", { className: "h-100 w-100" },
                        React.createElement(react_monaco_editor_1.default, { language: "javascript", value: (() => { }).toString(), options: {}, onChange: console.log, editorDidMount: console.log }))))));
    }
};
Template = __decorate([
    connect_1.connect(mapStateToProps, mapDispatchToProps)
], Template);
exports.default = Template;
function mapStateToProps(state, routeComponentProps) {
    const engineid = routeComponentProps.match.params.engineid;
    const templateid = routeComponentProps.match.params.templateid;
    const _hash = hash(state.PackageSettings.Engines[engineid].Templates[templateid] || "");
    return {
        Template: state.PackageSettings.Engines[engineid].Templates[templateid],
        _hash: _hash
    };
}
function mapDispatchToProps(dispatch) {
    return redux_1.bindActionCreators(PackageSettings_1.ActionCreators, dispatch);
}
