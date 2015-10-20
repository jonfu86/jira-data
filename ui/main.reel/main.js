var Component = require("montage/ui/component").Component,
	DataSelector = require("montage-data/logic/service/data-selector").DataSelector,
	DataService = require("montage-data/logic/service/data-service").DataService,
	Issue = require("logic/issue").Issue;


/**
 * @class Main
 * @extends Component
 */
exports.Main = Component.specialize(/** @lends Main# */ {

	// constructor: {
	// 	value: function () {
	// 		this.service = new JiraService();
			
	// 	}
	// },
    
    issues: {
    	get: function () {
    		return DataService.mainService.fetchData(DataSelector.withTypeAndCriteria(Issue.TYPE, {project: "HIVESCHOOL"})).data;
    	}
    }


});
