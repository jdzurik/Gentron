import * as readline from "readline";
import { ConnectionGroup, DatabaseConnection, Environment, Gentron, IConnectionGroup, IDatabaseConnection, IEnvironment, IFileConnection, FileConnection } from "../Gentron.Library";
import { DatabaseSource, IDatabaseSource, IGentron, Utilities } from "../Gentron.Library";

function log<T>(title: string, data: T): void {
    try {
        console.log("***** " + title + "*****");
        console.log((Utilities.JSON.stringify as any)(data, null, 4));
        console.log();
    }
    catch (e) {
        console.log((e as NodeJS.ErrnoException).message);
    }
}

let initialState: IGentron = new Gentron();

["Dev", "Test", "Prod"].map(env => {
    const environment: IEnvironment = new Environment();
    environment.Name = env;
    initialState.PackageSettings.Environments.push(environment);
});

["CAUtils", "CASecurity"].map(db => {
    const source: IConnectionGroup<IDatabaseConnection> = new ConnectionGroup<IDatabaseConnection>();
    source.Name = db;

    initialState.PackageSettings.Environments.map(env => {
        const conn: IDatabaseConnection = new DatabaseConnection();
        conn.Environment = env.Name;
        source.addOrUpdateConnection(conn);
    });

    initialState.ProjectSettings.DatabaseConnections.push(source);
});

["", ""].map((db, i) => {
    const source: IDatabaseSource = new DatabaseSource();
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