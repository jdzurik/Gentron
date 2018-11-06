"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const readline = require("readline");
const Gentron_Library_1 = require("../Gentron.Library");
const Gentron_Library_2 = require("../Gentron.Library");
function log(title, data) {
    try {
        console.log("***** " + title + "*****");
        console.log(Gentron_Library_2.Utilities.JSON.stringify(data, null, 4));
        console.log();
    }
    catch (e) {
        console.log(e.message);
    }
}
let initialState = new Gentron_Library_1.Gentron();
["Dev", "Test", "Prod"].map(env => {
    const environment = new Gentron_Library_1.Environment();
    environment.Name = env;
    initialState.PackageSettings.Environments.push(environment);
});
["CAUtils", "CASecurity"].map(db => {
    const source = new Gentron_Library_1.ConnectionGroup();
    source.Name = db;
    initialState.PackageSettings.Environments.map(env => {
        const conn = new Gentron_Library_1.DatabaseConnection();
        conn.Environment = env.Name;
        source.addOrUpdateConnection(conn);
    });
    initialState.ProjectSettings.DatabaseConnections.push(source);
});
["", ""].map((db, i) => {
    const source = new Gentron_Library_2.DatabaseSource();
    source.Name = `DBSource${i}`;
    initialState.PackageSettings.DatabaseSources.push(source);
});
log("Package Settings", initialState.PackageSettings);
log("Project Settings", initialState.ProjectSettings);
log("Initial State", initialState);
readline.emitKeypressEvents(process.stdin);
if (process.stdin.setRawMode) {
    process.stdin.setRawMode(true);
    process.stdin.on("keypress", (str, key) => {
        process.exit();
    });
    console.log("Press any key to exit...");
}
