var Montage = require("montage").Montage,
    ObjectDescriptor = require("montage-data/logic/model/object-descriptor").ObjectDescriptor;

/**
 * @class
 * @extends external:Montage
 */
    exports.Issue = Montage.specialize(/** @lends Issue.prototype */ {

   

}, {

    TYPE: {
        get: ObjectDescriptor.getterFor(exports, "Issue")
    },

});