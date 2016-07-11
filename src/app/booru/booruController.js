(function() {
  'use strict';


  angular.module('valkyrie').controller('BooruController', BooruController);

  /** @ngInject */
  function BooruController($log, $http) {
    var vm = this;

    vm.BOORU = "http://danbooru.donmai.us";

    $http.get("");
    /*
    $http.get(vm.BOORU+'/posts.json?limit=100&tags=neptune_(choujigen_game_neptune)').
    success(function(data, status, headers, config) { //data, status, headers, config
      vm.posts = data;
      $log.log(data);
      $log.warn("WARNING");
      $log.error("ERORR");
    }).
    error(function(data, status, headers, config) {
      // log error
    });
    */
  }
})();
