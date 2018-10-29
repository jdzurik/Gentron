"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { dialog } = window.require('electron').remote;
const React = require("react");
const Gentron_Library_1 = require("../../../Gentron.Library");
class FolderInput extends React.Component {
    constructor(props) {
        super(props);
    }
    handleOpenDialogClick(ev) {
        const dialogOpts = {
            properties: [
                "createDirectory",
                "openDirectory",
                "promptToCreate"
            ],
            title: "Select Folder",
        };
        dialog.showOpenDialog(dialogOpts, function (folderPaths, bookmarks) {
            if (folderPaths && folderPaths.length > 0) {
                this.props.onFolderPathChange(folderPaths[0]);
            }
        }.bind(this));
    }
    render() {
        const showClearBtn = Gentron_Library_1.Utilities.isBoolean(this.props.includeClearButton)
            ? this.props.includeClearButton
            : true;
        let clearBtn = null;
        if (showClearBtn) {
            clearBtn = (React.createElement("button", { className: "button input-clear-button", tabIndex: -1, type: "button", onClick: (ev) => this.props.onFolderPathChange(``) },
                React.createElement("span", { className: "default-icon-cross" })));
        }
        return (React.createElement("div", { className: "input" },
            React.createElement("input", { type: "text", placeholder: this.props.placeholder, value: this.props.value, onChange: (ev) => this.props.onFolderPathChange(ev.target.value), "data-role": "input", "data-role-input": true }),
            React.createElement("div", { className: "button-group" },
                clearBtn,
                React.createElement("button", { className: "button input-custom-button", tabIndex: -1, type: "button", onClick: (ev) => this.handleOpenDialogClick(ev) },
                    React.createElement("span", { className: "mif-folder-open" })))));
    }
}
exports.default = FolderInput;
