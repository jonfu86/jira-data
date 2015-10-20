var RestService = require("montage-data/logic/service/rest-service").RestService,
	Issue = require("logic/issue").Issue;

/**
 * Provides issue data.
 *
 * @class
 * @extends external:RestService
 */
exports.IssueService = RestService.specialize(/** @lends IssueService.prototype */{

	constructor: {
		value: function () {
			// this.type = Issue.TYPE;
		}
	},

    type: {
        // value: function() {
          value: Issue.TYPE
        // }
    },

	url: { 
		value: "https://jira-montage-dev.mybluemix.net/ticket/jira/rest/api/2/search"
	},

    fetchRawData: {
        value: function (stream) { 
        	var self = this,
        		project = stream.selector.criteria.project,
        		url = this.url + "?jql=project=" + project + "&maxResults=-1",
        		auth = {"Authorization": "Basic am9uYXRoYW46cG93ZXJ0ZWNoMzEwNQ=="};

        	this.fetchRestData(url, auth).then(function (data) { 
        		console.log(data);
        		self.addRawData(stream, data.issues);
        		self.rawDataDone(stream);
        	});
        }
    },

    mapRawData: {
        value: function (issue, data) {
            issue.key = data.key;
            issue.summary = data.fields.summary;

        }
    }

});