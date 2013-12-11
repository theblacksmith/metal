/// <reference path='_all.ts' />

/**
 * The Sparrow app Projects module.
 *
 * @type {angular.Module}
 */
module Sparrow {
	'use strict';

	export interface ISparrowApp extends ng.IModule {
	}

	angular.module('Sparrow', ['ui.select2','Sparrow.Projects'])

	.config(function ($routeProvider) {
		$routeProvider
	    
	    .when('/new', {
	      templateUrl: App.viewUrl('projects', 'ProposalForm'),
	      controller: Sparrow.Projects.ProposalsCtrl,
	      resolve: Sparrow.Projects.ProposalsCtrl.resolve
	    })

	    .when('/edit/:proposalId', {
		  templateUrl: App.viewUrl('projects', 'ProposalForm'),
	      controller: Sparrow.Projects.ProposalsCtrl,
	      resolve: Sparrow.Projects.ProposalsCtrl.resolve
	    });
	})

	.directive('controlGroup', Sparrow.Common.Directives.ControlGroup.prototype.injection())
	
	.run(['$rootScope', '$location', '$routeParams', function ($rootScope, $location, $routeParams) {
		$rootScope.$on('$routeChangeSuccess', function (e, current, pre) {
			console.log('Current route name: ' + $location.path());
			// Get all URL parameter
			console.log($routeParams);
		});
	}]);
}