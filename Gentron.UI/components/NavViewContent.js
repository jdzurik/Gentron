"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_router_dom_1 = require("react-router-dom");
const DatabaseConnections_1 = require("./DatabaseConnections");
const DatabaseSource_1 = require("./DatabaseSource");
const DatabaseSources_1 = require("./DatabaseSources");
const Engine_1 = require("./Engine");
const Engines_1 = require("./Engines");
const FileSource_1 = require("./FileSource");
const FileSources_1 = require("./FileSources");
const Home_1 = require("./Home");
const HttpSource_1 = require("./HttpSource");
const HttpSources_1 = require("./HttpSources");
const OutputPaths_1 = require("./OutputPaths");
const PackageSettings_1 = require("./PackageSettings");
const ProjectSettings_1 = require("./ProjectSettings");
const Template_1 = require("./Template");
const Templates_1 = require("./Templates");
class NavViewContent extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (React.createElement("div", { className: "navview-content d-flex flex-align-center flex-justify-center h-100" },
            React.createElement(react_router_dom_1.Route, { exact: true, path: "/", component: Home_1.default }),
            React.createElement(react_router_dom_1.Route, { exact: true, path: "/settings/project", component: ProjectSettings_1.default }),
            React.createElement(react_router_dom_1.Route, { exact: true, path: "/connections/db", component: DatabaseConnections_1.default }),
            React.createElement(react_router_dom_1.Route, { exact: true, path: "/output/paths", component: OutputPaths_1.default }),
            React.createElement(react_router_dom_1.Route, { exact: true, path: "/settings/package", component: PackageSettings_1.default }),
            React.createElement(react_router_dom_1.Route, { exact: true, path: "/sources/db", component: DatabaseSources_1.default }),
            React.createElement(react_router_dom_1.Route, { exact: true, path: "/sources/db/:id", component: DatabaseSource_1.default }),
            React.createElement(react_router_dom_1.Route, { exact: true, path: "/sources/http", component: HttpSources_1.default }),
            React.createElement(react_router_dom_1.Route, { exact: true, path: "/sources/http/:id", component: HttpSource_1.default }),
            React.createElement(react_router_dom_1.Route, { exact: true, path: "/sources/file", component: FileSources_1.default }),
            React.createElement(react_router_dom_1.Route, { exact: true, path: "/sources/file/:id", component: FileSource_1.default }),
            React.createElement(react_router_dom_1.Route, { exact: true, path: "/engines/manage", component: Engines_1.default }),
            React.createElement(react_router_dom_1.Route, { exact: true, path: "/engines/manage/:id", component: Engine_1.default }),
            React.createElement(react_router_dom_1.Route, { exact: true, path: "/engines/manage/:engineid/templates", component: Templates_1.default }),
            React.createElement(react_router_dom_1.Route, { exact: true, path: "/engines/manage/:engineid/templates/:templateid", component: Template_1.default })));
    }
}
exports.default = NavViewContent;
