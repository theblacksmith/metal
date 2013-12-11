/// <reference path='../../_all.ts' />
/// <reference path='../../typings/all.d.ts' />
/// <reference path='../../common/ModelCollection.ts' />
/// <reference path='models.ts' />
/// <reference path='commands.ts' />
/// <reference path='controller.ts' />

angular.module('app.home', [])

.config(function config( $stateProvider ) {

    $stateProvider

    .state( 'home', {
      url: '/',
      views: {
        "main": {
          controller: 'ProposalsCtrl',
          templateUrl: App.viewUrl('projects', 'ProposalForm'),
          resolve: Sparrow.Projects.ProposalsCtrl.resolve
        }
      }
    });
})

.controller('HomeCtrl', app.home.HomeCtrl.prototype.injection());