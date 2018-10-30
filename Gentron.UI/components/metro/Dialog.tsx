import * as React from "react";

export class DialogTitle extends React.Component<{}, {}, any> {
    /*
     *  Constructor
     */
    public constructor(props: any) {
        super(props);
    }


    /*
     *  Methods
     */
    public render(): JSX.Element {
        return (
            <div className="dialog-title">
                {this.props.children}
            </div>
        );
    }
}

export class DialogContent extends React.Component<{}, {}, any> {
    /*
     *  Constructor
     */
    public constructor(props: any) {
        super(props);
    }


    /*
     *  Methods
     */
    public render(): JSX.Element {
        return (
            <div className="dialog-content">
                {this.props.children}
            </div>
        );
    }
}

export class DialogAction extends React.Component<{}, {}, any> {
    /*
     *  Constructor
     */
    public constructor(props: any) {
        super(props);
    }


    /*
     *  Methods
     */
    public render(): JSX.Element {
        return (
            <div className="dialog-actions">
                {this.props.children}
            </div>
        );
    }
}

type DialogProps = {
};

type DialogState = {
};

export class Dialog extends React.Component<DialogProps, DialogState> {
    /*
     *  Constructor
     */
    public constructor(props: DialogProps) {
        super(props);
    }


    /*
     *  Methods
     */
    public render(): JSX.Element {
        return (
            <React.Fragment>
                <div className="dialog shadow-on" data-role="dialog" data-role-dialog="true" style={{top: `50%`, left: `50%`, transform: `translate(-50%, -50%)`, minWidth: `480px`}}>
                    {this.props.children}
                </div>
                <div className="overlay" style={{ background: `rgba(0, 0, 0, 0.5)` }}></div>
            </React.Fragment>
        );
    }
}