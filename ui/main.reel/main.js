var Component = require("montage/ui/component").Component,
	DataSelector = require("montage-data/logic/service/data-selector").DataSelector,
	DataService = require("montage-data/logic/service/data-service").DataService,
	Issue = require("logic/issue").Issue;


/**
 * @class Main
 * @extends Component
 */
exports.Main = Component.specialize(/** @lends Main# */ {


    issues: {
    	value: null
    },

    authorization: {
    	value: null
    },

    newIssue: {
    	value: null
    },

    handleViewIssuesButtonAction: {
    	value: function () {
    		//basic authentication
    		if (!this.authorization){
    			var auth = this.templateObjects.userInput.value + ":" + this.templateObjects.passwordInput.value;
	    		this.authorization = btoa(auth);
	    		// console.log(this.authorization);
    		}

    		this.issues = DataService.mainService.fetchData(
    			DataSelector.withTypeAndCriteria(
    				Issue.TYPE, 
    				{
    					authorization: this.authorization,
    					project: this.project.value
    				}
				)
			).data;
    	}
    },

    handleCreateIssueButtonAction: {
        value: function() {
        		//basic authentication
        	if (!this.authorization) {
				var auth = this.templateObjects.userInput.value + ":" + this.templateObjects.passwordInput.value;
	    		this.authorization = btoa(auth);
	    		// console.log(this.authorization);
			}
        		//basic form validation//
        	if (this.templateObjects.nameField.value == null || this.templateObjects.nameField.value == "" ||
        		this.templateObjects.emailField.value == null || this.templateObjects.emailField.value == "" ||
        		this.templateObjects.projectField.value == null || this.templateObjects.projectField.value == "" ||
        		this.templateObjects.subjectField.value == null || this.templateObjects.subjectField.value == "" ||
        		this.templateObjects.feedbackField.value == null || this.templateObjects.feedbackField.value == ""){
        			
        		this.templateObjects.successMessage.value = 'Please make sure no fields are empty!';
        	}
        	else {

	        	//creates JSON object to send to JIRA//
	            var myIssue = {
				    "fields": {
				       "project":
				       {
				          "key": ""
				       },
				       "summary": "",
				       "description": "",
				       "issuetype": {
				          "name": "Task"
				       }
				   }
				};

				myIssue.fields.project.key = this.templateObjects.projectField.value;
				myIssue.fields.summary = this.templateObjects.subjectField.value;
				myIssue.fields.description = 'name: '.concat(this.templateObjects.nameField.value, '      email: ', this.templateObjects.emailField.value, '    issue: ', this.templateObjects.feedbackField.value);
				this.newIssue = myIssue;
				//sends XMLHTTP request to the server to update JIRA cloud project//
				// var myRequest = new XMLHttpRequest();
		  //       myRequest.open("POST", this.application.jiraUrl);
		  //       myRequest.setRequestHeader("Content-Type", "application/json")

	    		
		        // myRequest.send(JSON.stringify(myIssue));

		        //on successful form submission, wipes form and displays succcess message//
		     //    var self = this;

		     //    myRequest.onreadystatechange = function() {

			    //     if(myRequest.readyState == 4) {
			    //     	self.templateObjects.nameField.value = null;
			    //     	self.templateObjects.emailField.value = null;
			    //     	self.templateObjects.subjectField.value = null;
			    //     	self.templateObjects.feedbackField.value = null;   	
			    //     	self.templateObjects.successMessage.value = "You have successfully created an issue!";
			    //     }
			    //     else {
			    //     	self.templateObjects.successMessage.value = "Failed to create an issue!";
			    //     }
			    // }
	    	}
        }
    }




});
