"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { dialog } = window.require('electron').remote;
const React = require("react");
const Gentron_Library_1 = require("../../../Gentron.Library");
class FileInput extends React.Component {
    constructor(props) {
        super(props);
    }
    handleOpenDialogClick(ev) {
        const dialogOpts = {
            properties: [
                "openFile",
                "promptToCreate",
                "showHiddenFiles",
            ],
            title: "Select File",
        };
        dialog.showOpenDialog(dialogOpts, function (filePaths, bookmarks) {
            if (filePaths && filePaths.length > 0) {
                this.props.onFilePathChange(filePaths[0]);
            }
        }.bind(this));
    }
    render() {
        const showClearBtn = Gentron_Library_1.Utilities.isBoolean(this.props.includeClearButton)
            ? this.props.includeClearButton
            : true;
        let clearBtn = null;
        if (showClearBtn) {
            clearBtn = (React.createElement("button", { className: "button input-clear-button", tabIndex: -1, type: "button", onClick: (ev) => this.props.onFilePathChange(``) },
                React.createElement("span", { className: "default-icon-cross" })));
        }
        return (React.createElement("div", { className: "input" },
            React.createElement("input", { type: "text", placeholder: this.props.placeholder, value: this.props.value, onChange: (ev) => this.props.onFilePathChange(ev.target.value), "data-role": "input", "data-role-input": true }),
            React.createElement("div", { className: "button-group" },
                clearBtn,
                React.createElement("button", { className: "button input-custom-button", tabIndex: -1, type: "button", onClick: (ev) => this.handleOpenDialogClick(ev) },
                    React.createElement("span", { className: "mif-files-empty" })))));
    }
}
exports.default = FileInput;
