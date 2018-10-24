import * as hash from "object-hash";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { ActionCreators } from "../actions/PackageSettings";
import { ApplicationState, Hash, NonFunctionProperties } from "../types";
import { bindActionCreators } from "redux";
import { connect } from "../connect";
import { IDatabaseSource, IFileSource, IHttpSource } from "../../Gentron.Library";
import { Link } from 'react-router-dom';

type NullableSources = Hash & {
    DatabaseSources?: NonFunctionProperties<IDatabaseSource>[];
    FileSources?: NonFunctionProperties<IFileSource>[];
    HttpSources?: NonFunctionProperties<IHttpSource>[];
};

type NavViewPaneProps = NullableSources;

@connect<NullableSources, {}, NavViewPaneProps>(mapStateToProps, mapDispatchToProps)
export default class NavViewPane extends React.Component<NavViewPaneProps> {
    /*
     *  Constructors
     */
    public constructor(props: NavViewPaneProps) {
        super(props);
    }


    /*
     *  Methods
     */
    public render(): JSX.Element {
        return (
            <div className="navview-pane h-100">
                <button className="pull-button">
                    <span className="default-icon-menu"></span>
                </button>

                <ul className="navview-menu h-100">
                    <li>
                        <Link to="/">
                            <span className="icon"><span className="mif-home"></span></span>
                            <span className="caption">Home</span>
                        </Link>
                    </li>

                    <li>
                        <Link to="/settings/project">
                            <span className="icon"><span className="mif-drive2"></span></span>
                            <span className="caption">Project Settings</span>
                        </Link>
                    </li>

                    <li>
                        <Link to="/connections/db" className="pl-7">
                            <span className="icon"><span className="mif-settings-ethernet"></span></span>
                            <span className="caption">Connection Strings</span>
                        </Link>
                    </li>

                    <li>
                        <Link to="/output/paths" className="pl-7">
                            <span className="icon"><span className="mif-folder-open"></span></span>
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
                            <span className="caption">Database Source</span>
                        </Link>
                    </li>

                    {
                        this.props.DatabaseSources.map((connection, i) =>
                            <li key={i}>
                                <Link to={`/sources/db/${i}`} className="pl-7">
                                    <span className="icon"><span className="mif-database"></span></span>
                                    <span className="caption">{connection.Name}</span>
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
                        this.props.FileSources.map((file, i) =>
                            <li key={i}>
                                <Link to={`/sources/file/${i}`} className="pl-7">
                                    <span className="icon"><span className="mif-file-code"></span></span>
                                    <span className="caption">{file.Name}</span>
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
                        this.props.HttpSources.map((file, i) =>
                            <li key={i}>
                                <Link to={`/sources/http/${i}`} className="pl-7">
                                    <span className="icon"><span className="mif-http"></span></span>
                                    <span className="caption">{file.Name}</span>
                                </Link>
                            </li>
                        )
                    }
                </ul>
            </div>
        );
    }
}

function mapStateToProps(state: ApplicationState): NullableSources {
    const _dbHash: string = hash(state.PackageSettings.DatabaseSources);
    const _fileHash: string = hash(state.PackageSettings.FileSources);
    const _httpHash: string = hash(state.PackageSettings.HttpSources);

    const _hash: string = hash(_dbHash + _fileHash + _httpHash);

    return {
        DatabaseSources: state.PackageSettings.DatabaseSources,
        FileSources: state.PackageSettings.FileSources,
        HttpSources: state.PackageSettings.HttpSources,
        _hash: _hash
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}