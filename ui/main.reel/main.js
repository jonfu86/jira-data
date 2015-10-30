var Component = require("montage/ui/component").Component,
	DataSelector = require("montage-data/logic/service/data-selector").DataSelector,
	DataService = require("montage-data/logic/service/data-service").DataService,
	Issue = require("logic/issue").Issue,
    Project = require("logic/project").Project,
	User = require("logic/user").User;


/**
 * @class Main
 * @extends Component
 */
exports.Main = Component.specialize(/** @lends Main# */ {


    issues: {
    	value: null
    },

    handleViewIssuesButtonAction: {
    	value: function () {
    		//basic authentication
    		
    		User.currentUser.authorize(this.templateObjects.userInput.value, this.templateObjects.passwordInput.value);

    		this.issues = DataService.mainService.fetchData(
    			DataSelector.withTypeAndCriteria(
    				Issue.TYPE, 
    				{
    					project: this.project.value
    				}
				)
			).data;
    	}
    },

    handleCreateIssueButtonAction: {
        value: function() {
        		//basic authentication
        	
        	User.currentUser.authorize(this.templateObjects.userInput.value, this.templateObjects.passwordInput.value);
	    	
        		//basic form validation//
        	if (this.templateObjects.nameField.value == null || this.templateObjects.nameField.value == "" ||
        		this.templateObjects.emailField.value == null || this.templateObjects.emailField.value == "" ||
        		this.templateObjects.projectField.value == null || this.templateObjects.projectField.value == "" ||
        		this.templateObjects.subjectField.value == null || this.templateObjects.subjectField.value == "" ||
        		this.templateObjects.feedbackField.value == null || this.templateObjects.feedbackField.value == "") {
        	
        		this.templateObjects.successMessage.value = 'Please make sure no fields are empty!';
        	} else {
	        	//creates JSON object to send to JIRA//
	            var issue = DataService.mainService.createDataObject(Issue.TYPE); 
				
				//creates new project instance//
				issue.project = Project.withKey(this.templateObjects.projectField.value);
				//
				issue.summary = this.templateObjects.subjectField.value;
				issue.description = 'name: '.concat(this.templateObjects.nameField.value, '      email: ', this.templateObjects.emailField.value, '    issue: ', this.templateObjects.feedbackField.value);
				DataService.mainService.saveDataObject(issue).then(function () { 
					console.log('issue saved'); 
					this.handleViewIssuesButtonAction();
				});
	    	}
        }
    }




});
