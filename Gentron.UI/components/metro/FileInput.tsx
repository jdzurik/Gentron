const { dialog } = (window as any).require('electron').remote;
import * as React from "react";
import { MouseEvent } from "react";
import { Utilities } from "../../../Gentron.Library";

type FileInputProps = {
    includeClearButton?: boolean;
    onFilePathChange: (value: string) => any;
    placeholder?: string;
    value?: string;
};

type FileInputState = {

};

export default class FileInput extends React.Component<FileInputProps, FileInputState> {
    /*
     *  Constructor
     */
    public constructor(props: FileInputProps) {
        super(props);
    }


    /*
     *  Properties & Fields
     */
    private handleOpenDialogClick(ev: React.MouseEvent<HTMLButtonElement>): void {
        const dialogOpts: Electron.OpenDialogOptions = {
            properties: [
                "openFile",
                "promptToCreate",
                "showHiddenFiles",
            ],
            title: "Select File",
        };

        dialog.showOpenDialog(dialogOpts, function (this: FileInput, filePaths: string[], bookmarks: string[]) {
            if (filePaths && filePaths.length > 0) {
                this.props.onFilePathChange(filePaths[0]);
            }
        }.bind(this));
    }

    public render(): JSX.Element {
        const showClearBtn: boolean = Utilities.isBoolean(this.props.includeClearButton)
            ? this.props.includeClearButton
            : true;

        let clearBtn: JSX.Element | null = null;

        if (showClearBtn) {
            clearBtn = (
                <button className="button input-clear-button"
                    tabIndex={-1}
                    type="button"
                    onClick={(ev: React.MouseEvent<HTMLButtonElement>) => this.props.onFilePathChange(``)}>
                    <span className="default-icon-cross"></span>
                </button>
            );
        }

        return (
            <div className="input">
                <input type="text"
                    placeholder={this.props.placeholder}
                    value={this.props.value}
                    onChange={(ev: React.ChangeEvent<HTMLInputElement>) => this.props.onFilePathChange(ev.target.value)}
                    data-role="input"
                    data-role-input={true}
                />
                <div className="button-group">
                    {clearBtn}

                    <button className="button input-custom-button"
                        tabIndex={-1}
                        type="button"
                        onClick={(ev: MouseEvent<HTMLButtonElement>) => this.handleOpenDialogClick(ev)}>
                        <span className="mif-files-empty"></span>
                    </button>
                </div>
            </div>
        );
    }
}