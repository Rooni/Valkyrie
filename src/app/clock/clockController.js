(function() {
  'use strict';

  angular.module('valkyrie').controller('ClockController', ClockController);

  /** @ngInject */
  function ClockController($interval) {
    var vm = this;
    var tick = function() {
      vm.clock = moment().utcOffset(9);
    };
    tick();
    $interval(tick, 1000);
  }
})();
