var HttpService = require("montage-data/logic/service/http-service").HttpService,
    Project = require("logic/project").Project;

/**
 * Provides project data.
 *
 * @class
 * @extends external:HttpService
 */
exports.ProjectService = HttpService.specialize(/** @lends ProjectService.prototype */{

    constructor: {
        value: function () {
            
        }
    },

    type: {
           value: Project.TYPE
    },

    fetchRawData: {
        value: function (stream) { 
            this.rawDataDone(stream);
        }
    },

    mapFromRawData: {
        value: function (userObject, userData) {

        }
    }

});