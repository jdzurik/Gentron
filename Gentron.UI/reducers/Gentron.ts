import * as GentronActions from '../actions/Gentron';
import { NonFunctionProperties } from "../../Gentron.Library/types";
import { IGentron, Gentron } from "../../Gentron.Library";
import { GentronActionNames } from "../constants/ActionNames";
import { Reducer } from 'redux';

type GentronProps = string;

const _unloadedGentronState: string = '';

export const reducer: Reducer<GentronProps> = (state: string, action: GentronActions.KnownGentronAction) => {
    switch (action.type) {
        case GentronActionNames.AddOrUpdateActiveProjectPath:
            return action.activeProjectPath;
        default:
            // The following line guarantees that every action in the KnownAction union has been covered by a case above
            const exhaustiveCheck: never = action as never;
    }

    // For unrecognized actions (or in cases where actions have no effect), must return the existing state
    //  (or default initial state if none was supplied)
    return state || _unloadedGentronState;
};