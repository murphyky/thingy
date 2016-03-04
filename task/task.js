(function(){
	'use strict';

	angular.module('Form', [])
	.controller('TaskFormController', ['$scope', '$timeout', 'FormSubmitService',
		function($scope, $timeout, FormSubmitService) {

			document.getElementById('formSubmit').addEventListener('click',
				function(e){
				//e.preventDefault();
				//prevent annoying refresh on ajax
			}, false);

			$scope.submitForm = function()
			{

				$scope.taskForm.$submitted = true;

				if (new Date() - new Date($scope.birth_year) < 568099881609) {
					alert("You must be 18 years of age or older");
					return;
				}				

				if (!$scope.taskForm.$valid) {
					alert("Please check submission");
					//just check required fields
					return FormSubmitService.displayErrors(angular.copy($scope.taskForm.$error.required));
				}
					
				alert("Submission successful");
			}

		}])
	.service('FormSubmitService', function(){

		//custom treatment of validation errors
		this.displayErrors = function(res) {
			
			if (typeof res === 'undefined') {
				return;
			}

			//remove any existing error display first
			var elements = document.getElementsByClassName('validation-failure');

			if (elements.length > 0)
				Object.keys(elements).forEach(function(ele) {
					if (typeof elements[ele] !== 'undefined') {
						elements[ele].className = elements[ele].className.replace(/\bvalidation-failure\b/, '');
					}
				});

			//now we populate DOM with custom error styling
			Object.keys(res).forEach(function(_param_field) {
				var _param_field_name = res[_param_field].$name;

				try {
					if (document.getElementById(_param_field_name)) {
						if (document.getElementById(_param_field_name).className += (' ' + 'validation-failure'));	

					}
				} catch (e) {
					throw e;
				}
			});
		}
	})

})();