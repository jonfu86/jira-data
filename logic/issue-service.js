var RestService = require("montage-data/logic/service/rest-service").RestService,
	Issue = require("logic/issue").Issue,
    User = require("logic/user").User;

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

    authorization: {
        value: undefined
    },

    url: { 
        value: "https://jira-montage-dev.mybluemix.net/ticket"
    },

    fetchRawData: {
        value: function (stream) {
            var self = this,
                project = stream.selector.criteria.project,
                url = this.url + "?jql=project=" + project + "&maxResults=-1",
                header = {
                    "Authorization": "Basic " + User.currentUser.authorization,
                    "x-trust-my-name": "true"
                };             

            this.fetchRestData(url, header).then(function (data) { 
                self.addRawData(stream, data.issues);
                self.rawDataDone(stream);
            });
        }
    },

    saveRawData: {
        value: function (data, issue) {
            var self = this,
                url = this.url,
                header = {
                    "Authorization": "Basic " + User.currentUser.authorization,
                    "x-trust-my-name": "true",
                    "Content-Type": "application/json"
                },
                body = JSON.stringify(data);             

            this.fetchRestData(url, header, body).then(function (data) { 
                issue.key = data.key;
            });
        }
    },

    mapFromRawData: {
        value: function (issue, data) {
            issue.key = data.key;
            issue.summary = data.fields.summary;
        }
    },

    mapToRawData: {
        value: function (issue, data) {
            data.fields = {
                project: {key: issue.project.key},
                summary: issue.summary || "",
                description: issue.description || "",
                issuetype: {id: issue.type.id}
            };
        }
    }

});