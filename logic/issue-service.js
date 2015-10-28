var RestService = require("montage-data/logic/service/rest-service").RestService,
	Issue = require("logic/issue").Issue;

/**
 * Provides issue data.
 *
 * @class
 * @extends external:RestService
 */
exports.IssueService = RestService.specialize(/** @lends IssueService.prototype */{
    type: {
        value: Issue.TYPE
    },

    project: {
        value: null
    },

	url: { 
		value: "https://jira-montage-dev.mybluemix.net/ticket"
	},

    fetchRawData: {
        value: function (stream) {
        console.log(stream) 
        	var self = this,
        		project = stream.selector.criteria.project,
                auth = stream.selector.criteria.authorization,
        		url = this.url + "?jql=project=" + project + "&maxResults=-1",
        		header = {
                    "Authorization": "Basic " + auth,
                    "x-trust-my-name": "true"
                };

            console.log(stream.selector.criteria.authorization);              
            console.log(project);              

        	this.fetchRestData(url, header).then(function (data) { 
        		self.addRawData(stream, data.issues);
        		self.rawDataDone(stream);
                // console.log(this.newIssue);
        	});
        }
    },

    mapRawData: {
        value: function (issue, data) {
            issue.key = data.key;
            issue.summary = data.fields.summary;

        }
    // },

    // createIssue: {
    //     value: function(stream, myIssue) {
    //         var self = this,
    //             project = stream.selector.criteria.project,
    //             url = this.url,
    //             header = {"Authorization": "Basic "+ this.auth , "x-trust-my-name": "true"};

    //         this.fetchRestData(url, header, myIssue).then(function (data){
    //             self.addRawData(stream, data.issues);
    //             self.rawDataDone(stream);
    //             return null;
    //         });

    //     }
    }

});