var Montage = require("montage").Montage,
    DataObjectDescriptor = require("montage-data/logic/model/data-object-descriptor").DataObjectDescriptor;

/**
 * @class
 * @extends external:Montage
 */
    exports.Project = Montage.specialize(/** @lends Project.prototype */ {

    key: {
    	value: undefined
    }
   

}, {

    TYPE: {
        get: DataObjectDescriptor.getterFor(exports, "Project")
    },

    withKey: {
    	value: function (key) {
    		var project = new this();
    		project.key = key;
    		return project;
    	}
    }

});