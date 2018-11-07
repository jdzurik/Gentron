import * as hash from "object-hash";
import * as React from "react";
import { ActionCreators } from "../actions/PackageSettings";
import { bindActionCreators } from "redux";
import { Hash } from "../../Gentron.Library/types";
import { connect } from "../connect";
import { IGentron, IDatabaseSource, IEngine, IFileSource, IHttpSource } from "../../Gentron.Library";
import { Link } from 'react-router-dom';

type NullableSources = Hash & {
    DatabaseSources?: IDatabaseSource[];
    Engines?: IEngine[];
    FileSources?: IFileSource[];
    HttpSources?: IHttpSource[];
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
                        <Link to="/environments" className="pl-7">
                            <span className="icon"><span className="mif-earth"></span></span>
                            <span className="caption">Environments</span>
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
                            <span className="caption">Database Sources</span>
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

                    <li>
                        <Link to="/engines/manage">
                            <span className="icon"><span className="mif-drive-eta"></span></span>
                            <span className="caption">Template Engines</span>
                        </Link>
                    </li>

                    {
                        this.props.Engines.map((engine, i) =>
                            (
                                <React.Fragment key={i}>
                                    <li>
                                        <Link to={`/engines/manage/${i}`} className="pl-7">
                                            <span className="icon"><span className="mif-drive-eta"></span></span>
                                            <span className="caption">{engine.Name}</span>
                                        </Link>
                                    </li>

                                    {
                                        engine.Templates.map((template, j) => 
                                            <li key={j}>
                                                <Link to={`/engines/manage/${i}/templates/${j}`} className="pl-10">
                                                    <span className="icon"><span className="mif-embed2"></span></span>
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