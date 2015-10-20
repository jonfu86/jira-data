var RestService = require("montage-data/logic/service/rest-service").RestService,
    Project = require("logic/project").Project;

/**
 * Provides project data.
 *
 * @class
 * @extends external:RestService
 */
exports.ProjectService = RestService.specialize(/** @lends ProjectService.prototype */{

    constructor: {
        value: function () {
            // this.type = Project.TYPE;
        }
    },

    type: {
        // value: function () {
           value: Project.TYPE
        // }
    },

    fetchRawData: {
        value: function (stream) { 
            this.rawDataDone(stream);
        }
    },

    mapRawData: {
        value: function (userObject, userData) {

        }
    }

});