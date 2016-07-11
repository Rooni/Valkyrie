(function() {
  'use strict';

  angular
    .module('valkyrie')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('exp-calc', {
        url: '/exp-calc',
        templateUrl: '/views/exp-calc.html',
        controller: 'CalcController',
        controllerAs: 'calc'
      })
      .state('booru', {
        url: '/booru',
        templateUrl: '/views/booru.html',
        controller: 'BooruController',
        controllerAs: 'booru'
      })
      .state('about', {
        url: '/about',
        templateUrl: '/views/about.html'
      })
      .state('dashboard', {
      url: '/',
      templateUrl: '/views/dashboard.html',
      controller: 'DashboardController',
      controllerAs: 'db'
    });

    $urlRouterProvider.otherwise('/');
  }

})();
