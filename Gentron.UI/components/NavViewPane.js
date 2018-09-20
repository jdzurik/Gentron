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
var react_router_dom_1 = require("react-router-dom");
var NavViewPane = /** @class */ (function (_super) {
    __extends(NavViewPane, _super);
    function NavViewPane() {
        return _super.call(this, null) || this;
    }
    NavViewPane.prototype.render = function () {
        return (React.createElement("div", { className: "navview-pane h-100" },
            React.createElement("button", { className: "pull-button" },
                React.createElement("span", { className: "default-icon-menu" })),
            React.createElement("ul", { className: "navview-menu h-100" },
                React.createElement("li", null,
                    React.createElement(react_router_dom_1.Link, { to: "/" },
                        React.createElement("span", { className: "icon" },
                            React.createElement("span", { className: "mif-home" })),
                        React.createElement("span", { className: "caption" }, "Home"))),
                React.createElement("li", null,
                    React.createElement(react_router_dom_1.Link, { to: "/settings/project" },
                        React.createElement("span", { className: "icon" },
                            React.createElement("span", { className: "mif-drive2" })),
                        React.createElement("span", { className: "caption" }, "Project Settings"))),
                React.createElement("li", null,
                    React.createElement(react_router_dom_1.Link, { to: "/settings/package" },
                        React.createElement("span", { className: "icon" },
                            React.createElement("span", { className: "mif-gift" })),
                        React.createElement("span", { className: "caption" }, "Package Settings"))),
                React.createElement("li", null,
                    React.createElement(react_router_dom_1.Link, { to: "/sources/db" },
                        React.createElement("span", { className: "icon" },
                            React.createElement("span", { className: "mif-database" })),
                        React.createElement("span", { className: "caption" }, "Database Sources"))),
                React.createElement("li", null,
                    React.createElement(react_router_dom_1.Link, { to: "/sources/http" },
                        React.createElement("span", { className: "icon" },
                            React.createElement("span", { className: "mif-earth" })),
                        React.createElement("span", { className: "caption" }, "HTTP Sources"))),
                React.createElement("li", null,
                    React.createElement(react_router_dom_1.Link, { to: "/sources/file" },
                        React.createElement("span", { className: "icon" },
                            React.createElement("span", { className: "mif-drive" })),
                        React.createElement("span", { className: "caption" }, "File Sources"))))));
    };
    return NavViewPane;
}(React.Component));
exports.default = NavViewPane;
