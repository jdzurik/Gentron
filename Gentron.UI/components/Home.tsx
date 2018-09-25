import * as React from "react";
import * as ReactDOM from "react-dom";
import { Cell, Grid } from "./metro";
import NavViewContentHeaderRow from "./NavViewContentHeaderRow";

type HomeProps = {};

export default class Home extends React.Component<HomeProps> {
    public constructor(props: HomeProps) {
        super(props);
    }

    public render(): JSX.Element {
        return (
            <Cell className={`h-100`}>
                <Grid className={`w-100 h-100 p-3`}>
                    <NavViewContentHeaderRow iconClassName={`mif-home`} title={`Home`} />
                </Grid>
            </Cell>
        );
    }
}