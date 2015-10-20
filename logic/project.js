var Montage = require("montage").Montage,
    ObjectDescriptor = require("montage-data/logic/model/object-descriptor").ObjectDescriptor;

/**
 * @class
 * @extends external:Montage
 */
    exports.Project = Montage.specialize(/** @lends Project.prototype */ {

   

}, {

    TYPE: {
        get: ObjectDescriptor.getterFor(exports, "Project")
    },

});