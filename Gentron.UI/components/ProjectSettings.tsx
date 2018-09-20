import * as React from "react";
import * as ReactDOM from "react-dom";
import { Cell, Grid, Row } from "./metro";
import NavViewContentHeaderRow from "./NavViewContentHeaderRow";

export default class ProjectSettings extends React.Component {
    public constructor() {
        super(null);
    }

    public render(): JSX.Element {
        return (
            <Cell className={`h-100`}>
                <Grid className={`w-100 h-100 p-3`}>
                    <NavViewContentHeaderRow iconClassName={`mif-drive2`} title={`Project Settings`} />

                    <Row className={`mb-2`}>
                        <label className={`cell-3 text-right`}>
                            Local Package Folder
                        </label>

                        <Cell colSpan={9} id={`Test`}>
                            <input type={`file`} placeholder={`Local Package Folder`} data-role="file" data-button-title="<span class='mif-folder'></span>" />
                        </Cell>
                    </Row>

                    <Row className={`mb-2`}>
                        <label className={`cell-3 text-right`}>
                            Remote Package Location
                        </label>

                        <Cell colSpan={9}>
                            <input type={`text`} placeholder={`Remote Package Location`} />
                        </Cell>
                    </Row>

                    <Row className={`mb-2`}>
                        <label className={`cell-3 text-right`}>
                            Output Code Folder
                        </label>

                        <Cell colSpan={9}>
                            <input type={`file`} placeholder={`Output Code Folder`} data-role="file" data-button-title="<span class='mif-folder'></span>" />
                        </Cell>
                    </Row>
                </Grid>
            </Cell>            
        );
    }
}