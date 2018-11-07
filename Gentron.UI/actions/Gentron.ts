import { GentronActionNames } from "../constants/ActionNames";

export interface AddOrUpdateActiveProjectPathAction {
    activeProjectPath: string;
    type: GentronActionNames.AddOrUpdateActiveProjectPath;
}

export type KnownGentronAction = AddOrUpdateActiveProjectPathAction;

export const ActionCreators = {
    addOrUpdateActiveProjectPath: (activeProjectPath: string) => {
        return <AddOrUpdateActiveProjectPathAction>{
            activeProjectPath: activeProjectPath,
            type: GentronActionNames.AddOrUpdateActiveProjectPath
        };
    },
};