(function(){
	'use strict';

	var _url = 'https://api.twitter.com/1.1/search/tweets.json';


	angular.module('Twitter', [])
	.controller('TwitController', ['$scope', 'TwitService', function($scope, TwitService) {

		$scope.submitSearch = function(query) {

			return new Promise(function(resolve, reject) {
				
				if (query.indexOf('#') !== -1) {
					return TwitService.searchForTweet(query)
				} else {
					return TwitService.searchForUser(query);
				}				
			}).then(function(response){
				//do something with response
			});
			
		}

	}])
	.service('TwitService', ['$http',function($http){

		this.searchFor = function(query) {
			return new Promise(function(resolve, reject) {
				return $http({
					method: 'GET',
					url: _url,
					params: query,
					timeout: 25000
				}, function(res){
					return resolve(res);
				}, function(err){
					return reject(err);
				});
			});
		}

		this.searchForUser = function(query){

			return new Promise(function(resolve, reject) {
			
				var _params = {
					q: '%40'+query
				}

				return this.searchFor(_params)
				.then(function(res){
					return resolve(res);
				}, function(err) {
					return reject(err);
				});

			});

		}

		this.searchForTweet = function(query) {
			return new Promise(function(resolve, reject) {

				var _params = {
					q: '%23'+query
				};

				return this.searchFor(_params)
				.then(function(res){
					return resolve(res);
				}, function(err) {
					return reject(err);
				});
			})
		}

	}])
})();