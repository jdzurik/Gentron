import * as React from "react";
import * as ReactDOM from "react-dom";
import { RouteComponentProps } from "react-router";
import { Cell, Grid } from "./metro";
import NavViewContentHeaderRow from "./NavViewContentHeaderRow";

type FileSourcesProps = RouteComponentProps<{ id: string }>;

export default class FileSources extends React.Component<FileSourcesProps> {
    public constructor(props: FileSourcesProps) {
        super(props);
    }

    public render(): JSX.Element {
        return (
            <Cell className={`h-100`}>
                <Grid className={`w-100 h-100 p-3`}>
                    <NavViewContentHeaderRow iconClassName={`mif-drive`} title={`File Sources`} />

                    <h1>{this.props.match.params.id}</h1>
                </Grid>
            </Cell>
        );
    }
}