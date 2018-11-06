"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const hash = require("object-hash");
const React = require("react");
const PackageSettings_1 = require("../actions/PackageSettings");
const redux_1 = require("redux");
const metro_1 = require("./metro");
const connect_1 = require("../connect");
const Gentron_Library_1 = require("../../Gentron.Library");
const react_router_dom_1 = require("react-router-dom");
const NavViewContentHeaderRow_1 = require("./NavViewContentHeaderRow");
let FileSources = class FileSources extends React.Component {
    constructor(props, state) {
        super(props);
        this.state = {
            EditingSource: null
        };
    }
    handleAddSourceClick() {
        this.handleOpenEditSourceClick(new Gentron_Library_1.FileSource());
    }
    handleToggleSourceIsActiveClick(source, isActive) {
        source.IsActive = isActive;
        this.props.addOrUpdateFileSource(source);
    }
    handleRemoveSourceClick(source) {
        this.props.removeFileSource(source);
    }
    handleOpenEditSourceClick(source) {
        this.setState((prevState) => {
            return Object.assign({}, prevState, { EditingSource: source.clone() });
        });
    }
    handleEditSourceNameChange(name) {
        const editingSource = this.state.EditingSource;
        editingSource.Name = name;
        this.setState((prevState) => {
            return Object.assign({}, prevState, { EditingSource: editingSource });
        });
    }
    handleCloseEditSourceClick(save) {
        if (save) {
            this.props.addOrUpdateFileSource(this.state.EditingSource);
        }
        this.setState((prevState) => {
            return Object.assign({}, prevState, { EditingSource: null });
        });
    }
    render() {
        return (React.createElement(metro_1.Cell, { className: "h-100" },
            React.createElement(metro_1.Grid, { className: "w-100 h-100 p-3" },
                React.createElement(NavViewContentHeaderRow_1.default, { iconClassName: "mif-file-code", title: "File Sources" }),
                React.createElement("table", { className: "table striped table-border mt-4" },
                    React.createElement("thead", null,
                        React.createElement("tr", null,
                            React.createElement("th", null, "Name"),
                            React.createElement("th", null, "Active?"),
                            React.createElement("th", null, ` `))),
                    React.createElement("tbody", null,
                        React.createElement("tr", null,
                            React.createElement("td", null,
                                React.createElement("button", { className: "button", onClick: this.handleAddSourceClick.bind(this) },
                                    React.createElement("span", { className: "mif-add" }))),
                            React.createElement("td", null, ` `),
                            React.createElement("td", null, ` `)),
                        this.props.FileSources.map((source, i) => React.createElement("tr", { key: i },
                            React.createElement("td", null,
                                React.createElement(react_router_dom_1.Link, { to: `/sources/file/${i}` },
                                    React.createElement("button", { className: "button" },
                                        React.createElement("span", { className: "mif-enter" }))),
                                React.createElement("button", { className: "button ml-2", onClick: () => this.handleOpenEditSourceClick(source) },
                                    React.createElement("span", { className: "mif-pencil" })),
                                React.createElement("span", null,
                                    " ",
                                    source.Name)),
                            React.createElement("td", null,
                                React.createElement(metro_1.Switch, { checked: source.IsActive, onStateChanged: (isActive) => this.handleToggleSourceIsActiveClick(source, isActive) })),
                            React.createElement("td", null,
                                React.createElement("a", { href: "#" },
                                    React.createElement("button", { className: "button", onClick: this.handleRemoveSourceClick.bind(this, source) }, "Remove")))))))),
            Gentron_Library_1.Utilities.hasValue(this.state.EditingSource)
                ? (React.createElement(metro_1.Dialog, null,
                    React.createElement(metro_1.DialogTitle, null, "Edit File Source"),
                    React.createElement(metro_1.DialogContent, null,
                        React.createElement(metro_1.Row, { className: "mb-2 mt-2" },
                            React.createElement(metro_1.Cell, null,
                                React.createElement("label", null, "Source Name"))),
                        React.createElement(metro_1.Row, { className: "mb-2 mt-2" },
                            React.createElement(metro_1.Cell, null,
                                React.createElement("input", { type: "text", "data-role": "input", "data-role-input": "true", onChange: (ev) => this.handleEditSourceNameChange(ev.target.value), value: this.state.EditingSource.Name })))),
                    React.createElement(metro_1.DialogAction, null,
                        React.createElement("button", { className: "button", onClick: this.handleCloseEditSourceClick.bind(this, false) }, "Cancel"),
                        React.createElement("button", { className: "button", onClick: this.handleCloseEditSourceClick.bind(this, true) }, "Save"))))
                : null));
    }
};
FileSources = __decorate([
    connect_1.connect(mapStateToProps, mapDispatchToProps),
    __metadata("design:paramtypes", [Object, Object])
], FileSources);
exports.default = FileSources;
function mapStateToProps(state) {
    const _hash = hash(state.PackageSettings.FileSources);
    return {
        FileSources: state.PackageSettings.FileSources,
        _hash: _hash
    };
}
function mapDispatchToProps(dispatch) {
    return redux_1.bindActionCreators(PackageSettings_1.ActionCreators, dispatch);
}
