var Montage = require("montage").Montage;
    

/**
 * @class
 * @extends external:Montage
 */
exports.User = Montage.specialize(/** @lends User.prototype */ {

    authorization: {
        value: null
    },

    authorize: {
        value: function (username, password) {
            this.authorization = btoa(username + ":" + password);
        }
    }
   	
}, {
  
    currentUser: {
        get: function () {
            if (!this._currentUser) {
                this._currentUser = new this();
            }
            return this._currentUser;
        }
    }

});