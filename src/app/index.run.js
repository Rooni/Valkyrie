(function() {
  'use strict';

  angular
    .module('valkyrie')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }

})();
