import * as React from "react";
import * as ReactDOM from "react-dom";
import { Cell, Grid } from "./metro";
import NavViewContentHeaderRow from "./NavViewContentHeaderRow";

export default class HttpSources extends React.Component {
    public constructor() {
        super(null);
    }

    public render(): JSX.Element {
        return (
            <Cell className={`h-100`}>
                <Grid className={`w-100 h-100 p-3`}>
                    <NavViewContentHeaderRow iconClassName={`mif-earth`} title={`HTTP Sources`} />
                </Grid>
            </Cell>
        );
    }
}