"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AbstractInstallTask_1 = require("../core/AbstractInstallTask");
const InstallTaskError_1 = require("../exceptions/InstallTaskError");
const fs = require("fs");
class BuildDirsTask extends AbstractInstallTask_1.AbstractInstallTask {
    constructor() {
        super();
        this.initObj();
    }
    initObj() {
        this.__properties = {
            directories: [
                "public/cfg",
                "public/domains",
                "public/locales",
                "public/logs",
                "public/modules",
                "public/wildcat",
                "public",
                "workspace"
            ]
        };
    }
    run(complete) {
        let buildErrors = new Array();
        let directories = this.__properties.directories;
        let len = directories.length;
        let dir = null;
        let error = null;
        while (len--) {
            dir = directories[len];
            try {
                if (!fs.existsSync(dir)) {
                    fs.mkdirSync(dir);
                }
            }
            catch (e) {
                error = new InstallTaskError_1.InstallTaskError("An error occured while creating a directory: " + dir, e);
                buildErrors.push(error);
            }
        }
        complete(buildErrors);
    }
}
exports.BuildDirsTask = BuildDirsTask;