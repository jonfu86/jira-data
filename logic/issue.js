var Montage = require("montage").Montage,
    DataObjectDescriptor = require("montage-data/logic/model/data-object-descriptor").DataObjectDescriptor,
    Enumeration = require("montage-data/logic/model/enumeration").Enumeration;

/**
 * @class
 * @extends external:Montage
 */
exports.Issue = Montage.specialize(/** @lends Issue.prototype */ {

	key: {
        value: undefined
    },

	summary: {
        value: undefined
    },

	description: {
        value: undefined
    },

	type: {
        get: function () {
            return this._type || exports.Issue.Type.TASK;
        },
        set: function (type) {
            this._type = type;
        }
    }

}, /** @lends Issue */ {

    TYPE: {
        get: DataObjectDescriptor.getterFor(exports, "Issue")
    },

    Type: {
        get: Enumeration.getterFor("_Type", "id", "name", /** @lends Issue.Type */ {
			TASK: ["1", "Task"]
		})
  
    }

});