import * as $ from "jquery";
(window as any).jQuery = $;
(window as any).$ = $;

import * as metro4 from "metro4";
(window as any).Metro = metro4;

import * as React from "react";
import * as ReactDOM from "react-dom";
import App from "./components/App";

const root: HTMLElement = document.createElement("div");
const rootId: string = `appRoot${Date.now()}`;
root.id = rootId;
root.className = "h-100 w-100";
document.body.appendChild(root);
ReactDOM.render(<App />, document.getElementById(rootId));