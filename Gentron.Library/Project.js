"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Project = /** @class */ (function () {
    /*
     *  Properties & Fields
     */
    /*
     *  Constructors
     */
    function Project() {
    }
    /*
     *  Methods
     */
    Project.fromJson = function (jsonStr) {
        return JSON.parse(jsonStr);
    };
    Project.toJson = function (projectObj) {
        return JSON.stringify(projectObj);
    };
    return Project;
}());
exports.default = Project;
