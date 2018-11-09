import * as hash from "object-hash";
import * as React from "react";
import { ActionCreators } from "../actions/PackageSettings";
import { bindActionCreators } from "redux";
import { Hash } from "../../Gentron.Library/types";
import { connect } from "../connect";
import { IGentron, DatabaseSource, Engine, FileSource, HttpSource } from "../../Gentron.Library";
import { Link } from 'react-router-dom';

type NullableSources = Hash & {
    DatabaseSources?: DatabaseSource[];
    Engines?: Engine[];
    FileSources?: FileSource[];
    HttpSources?: HttpSource[];
};

type NavViewPaneProps = NullableSources;

type NavViewState = {
    isOpen?: boolean;
}

@connect<NullableSources, {}, NavViewPaneProps>(mapStateToProps, mapDispatchToProps)
export default class NavViewPane extends React.Component<NavViewPaneProps, NavViewState> {
    /*
     *  Properties & Fields
     */
    private nestedIconsOpenClassName: React.CSSProperties = {};
    private nestedIconsClosedClassName: React.CSSProperties = {};


    /*
     *  Constructors
     */
    public constructor(props: NavViewPaneProps) {
        super(props);
        this.state = {
            isOpen: true
        };
    }


    /*
     *  Methods
     */
    private handleTogglePaneClick(): void {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    public render(): JSX.Element {
        const pl6ClassName: string = this.state.isOpen
            ? "pl-6"
            : "";

        const pl9ClassName: string = this.state.isOpen
            ? "pl-9"
            : "";

        const nestedIconStyle: React.CSSProperties = this.state.isOpen
            ? {
                fontSize: `16px`,
                height: `16px`,
                lineHeight: `16px`,
                width: `16px`,
            }
            : {
                fontSize: `10px`,
                height: `10x`,
                lineHeight: `10px`,
                width: `10px`,
            };
        const nestedIcon = (iconClassName: string): JSX.Element => (
            <span className="icon">
                <span className={iconClassName} style={nestedIconStyle}></span>
            </span>
        );

        return (
            <div className="navview-pane h-100">
                <button className="pull-button" onClick={(ev: React.MouseEvent<HTMLButtonElement>) => this.handleTogglePaneClick()}>
                    <span className="default-icon-menu"></span>
                </button>

                <ul className="navview-menu h-100">
                    <li>
                        <Link to="/settings/project">
                            <span className="icon"><span className="mif-drive2"></span></span>
                            <span className="caption">Project Settings</span>
                        </Link>
                    </li>

                    <li>
                        <Link to="/connections/db" className={pl6ClassName}>
                            {nestedIcon(`mif-settings-ethernet`)}
                            <span className="caption">Connection Strings</span>
                        </Link>
                    </li>

                    <li>
                        <Link to="/environments" className={pl6ClassName}>
                            {nestedIcon(`mif-earth`)}
                            <span className="caption">Environments</span>
                        </Link>
                    </li>

                    <li>
                        <Link to="/output/paths" className={pl6ClassName}>
                            {nestedIcon(`mif-folder-open`)}
                            <span className="caption">Output Paths</span>
                        </Link>
                    </li>

                    <li>
                        <Link to="/settings/package">
                            <span className="icon"><span className="mif-gift"></span></span>
                            <span className="caption">Package Settings</span>
                        </Link>
                    </li>

                    <li>
                        <Link to="/sources/db">
                            <span className="icon"><span className="mif-database"></span></span>
                            <span className="caption">Database Sources</span>
                        </Link>
                    </li>

                    {
                        this.props.DatabaseSources.map((source: DatabaseSource, i: number) =>
                            <li key={i}>
                                <Link to={`/sources/db/${i}`} className={pl6ClassName}>
                                    {nestedIcon(`mif-database`)}
                                    <span className="caption">{source.Name}</span>
                                </Link>
                            </li>
                        )
                    }

                    <li>
                        <Link to="/sources/file">
                            <span className="icon"><span className="mif-file-code"></span></span>
                            <span className="caption">File Sources</span>
                        </Link>
                    </li>

                    {
                        this.props.FileSources.map((source: FileSource, i: number) =>
                            <li key={i}>
                                <Link to={`/sources/file/${i}`} className={pl6ClassName}>
                                    {nestedIcon(`mif-file-code`)}
                                    <span className="caption">{source.Name}</span>
                                </Link>
                            </li>
                        )
                    }

                    <li>
                        <Link to="/sources/http">
                            <span className="icon"><span className="mif-http"></span></span>
                            <span className="caption">HTTP Sources</span>
                        </Link>
                    </li>

                    {
                        this.props.HttpSources.map((source: HttpSource, i: number) =>
                            <li key={i}>
                                <Link to={`/sources/http/${i}`} className={pl6ClassName}>
                                    {nestedIcon(`mif-http`)}
                                    <span className="caption">{source.Name}</span>
                                </Link>
                            </li>
                        )
                    }

                    <li>
                        <Link to="/engines/manage">
                            <span className="icon"><span className="mif-drive-eta"></span></span>
                            <span className="caption">Template Engines</span>
                        </Link>
                    </li>

                    {
                        this.props.Engines.map((source: Engine, i: number) =>
                            (
                                <React.Fragment key={i}>
                                    <li>
                                        <Link to={`/engines/manage/${i}`} className={pl6ClassName}>
                                            {nestedIcon(`mif-drive-eta`)}
                                            <span className="caption">{source.Name}</span>
                                        </Link>
                                    </li>

                                    {
                                        source.Templates.map((template, j) => 
                                            <li key={j}>
                                                <Link to={`/engines/manage/${i}/templates/${j}`} className={pl9ClassName}>
                                                    {nestedIcon(`mif-embed2`)}
                                                    <span className="caption">{template.Name}</span>
                                                </Link>
                                            </li>                                            
                                        )
                                    }
                                </React.Fragment>
                            )
                        )
                    }

                    <li>
                        <Link to="/">
                            <span className="icon"><span className="mif-bug"></span></span>
                            <span className="caption">Debug</span>
                        </Link>
                    </li>
                </ul>
            </div>
        );
    }
}

function mapStateToProps(state: IGentron): NullableSources {
    const _dbHash: string = hash(state.PackageSettings.DatabaseSources);
    const _enginesHash: string = hash(state.PackageSettings.Engines);
    const _fileHash: string = hash(state.PackageSettings.FileSources);
    const _httpHash: string = hash(state.PackageSettings.HttpSources);

    const _hash: string = hash(_dbHash + _enginesHash + _fileHash + _httpHash);

    return {
        DatabaseSources: state.PackageSettings.DatabaseSources,
        Engines: state.PackageSettings.Engines,
        FileSources: state.PackageSettings.FileSources,
        HttpSources: state.PackageSettings.HttpSources,
        _hash: _hash
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}