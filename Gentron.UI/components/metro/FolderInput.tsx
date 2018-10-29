const { dialog } = (window as any).require('electron').remote;
import * as React from "react";
import { MouseEvent } from "react";
import { Utilities } from "../../../Gentron.Library";

type FolderInputProps = {
    includeClearButton?: boolean;
    onFolderPathChange: (value: string) => any;
    placeholder?: string;
    value?: string;
};

type FolderInputState = {

};

export default class FolderInput extends React.Component<FolderInputProps, FolderInputState> {
    /*
     *  Constructor
     */
    public constructor(props: FolderInputProps) {
        super(props);
    }


    /*
     *  Methods
     */
    private handleOpenDialogClick(ev: React.MouseEvent<HTMLButtonElement>): void {
        const dialogOpts: Electron.OpenDialogOptions = {
            properties: [
                "createDirectory",
                "openDirectory",
                "promptToCreate"
            ],
            title: "Select Folder",
        };

        dialog.showOpenDialog(dialogOpts, function (this: FolderInput, folderPaths: string[], bookmarks: string[]) {
            if (folderPaths && folderPaths.length > 0) {
                this.props.onFolderPathChange(folderPaths[0]);
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
                    onClick={(ev: React.MouseEvent<HTMLButtonElement>) => this.props.onFolderPathChange(``)}>
                    <span className="default-icon-cross"></span>
                </button>
            );
        }

        return (
            <div className="input">
                <input type="text"
                    placeholder={this.props.placeholder}
                    value={this.props.value}
                    onChange={(ev: React.ChangeEvent<HTMLInputElement>) => this.props.onFolderPathChange(ev.target.value)}
                    data-role="input"
                    data-role-input={true}
                />
                <div className="button-group">
                    {clearBtn}

                    <button className="button input-custom-button"
                        tabIndex={-1}
                        type="button"
                        onClick={(ev: MouseEvent<HTMLButtonElement>) => this.handleOpenDialogClick(ev)}>
                        <span className="mif-folder-open"></span>
                    </button>
                </div>
            </div>
        );
    }
}