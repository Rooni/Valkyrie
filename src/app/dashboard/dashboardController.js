(function() {
  'use strict';

  angular.module('valkyrie').controller('DashboardController', dashboardController);

  /** @ngInject */
  function dashboardController($scope ,$log, $interval, $cookies) {
    var vm = this;

    //Static
    //TODO: Fix rate for ether and iron after lvl 6
    vm.data = {
      0:{
        1:{
          stock: 1000,
          rate: 6
        },
        2:{
          stock: 1500,
          rate: 8
        },
        3:{
          stock: 1950,
          rate: 10
        },
        4:{
          stock: 2530,
          rate: 12
        },
        5:{
          stock: 3280,
          rate: 14
        },
        6:{
          stock: 4260,
          rate: 17
        },
        7:{
          stock: 5530,
          rate: 20
        },
        8:{
          stock: 7180,
          rate: 25
        },
        9:{
          stock: 9330,
          rate: 29
        },
        10:{
          stock: 12120,
          rate: 35
        }
      },
      1:{
        1:{
          stock: 1000,
          rate: 6
        },
        2:{
          stock: 1500,
          rate: 8
        },
        3:{
          stock: 1950,
          rate: 10
        },
        4:{
          stock: 2530,
          rate: 12
        },
        5:{
          stock: 3280,
          rate: 14
        },
        6:{
          stock: 4260,
          rate: 17
        },
        7:{
          stock: 5530,
          rate: 20
        },
        8:{
          stock: 7180,
          rate: 25
        },
        9:{
          stock: 9330,
          rate: 29
        },
        10:{
          stock: 12120,
          rate: 35
        }
      },
      2:{
        1:{
          stock: 1000,
          rate: 6
        },
        2:{
          stock: 1500,
          rate: 8
        },
        3:{
          stock: 1950,
          rate: 10
        },
        4:{
          stock: 2530,
          rate: 12
        },
        5:{
          stock: 3280,
          rate: 14
        },
        6:{
          stock: 4260,
          rate: 17
        },
        7:{
          stock: 5530,
          rate: 20
        },
        8:{
          stock: 7180,
          rate: 25
        },
        9:{
          stock: 9330,
          rate: 29
        },
        10:{
          stock: 12120,
          rate: 35
        }
      }
    };

    //Vars
    vm.farms = [];
    vm.serverTime = moment().utcOffset(9);
    vm.totals = {0: 0, 1: 0, 2: 0};

    vm.lastCollect = function(){
      return vm.collectTime.fromNow();
    };

    //Gets
    vm.getGold = function(){return 1337;};
    vm.getEther = function(){return 137;};
    vm.getIron = function(){return 17;};

    //Sets
    vm.setFarmCookie = function(){
      var str = "";
      for(var i=0;i<vm.farms.length;i++){
        str+=vm.farms[i].type;
        str+=vm.farms[i].lv-1;
      }
      $cookies.put('farmss',str,{'expires': moment().add(1,"year").toDate()});
    };

    vm.getFarmCookie = function(){
      var str = $cookies.get('farmss');
      for(var i=0;i<str.length;i+=2){
        vm.farms.push({
          id: i,
          type:parseInt(str.charAt(i)),
          lv:parseInt(str.charAt(i+1))+1
        });
      }
    };

    vm.resetFarmCookie = function(){
      $cookies.remove('farmss');
      $cookies.remove('collectTime');
    };

    vm.setFarm = function(id, lv) {
      var farm = vm.farms[vm.farms.map(function(x) {return x.id; }).indexOf(id)];
      farm.lv = Math.min(Math.max(farm.lv+lv, 1), 10);
      vm.setFarmCookie();
      vm.monitorTick();
    };

    vm.delFarm = function(id) {
      vm.farms.splice(vm.farms.map(function(x) {return x.id; }).indexOf(id),1);
      vm.setFarmCookie();
    };

    vm.addFarm = function(type,lv){
      function nextId(){
        var id = 0;
        for(var i in vm.farms) {
          id = Math.max(id,vm.farms[i].id);
        }
        return id+1;
      }
      vm.farms.push({
        id: nextId(),
        type:type,
        lv:lv
      });
      //TODO: Remove setting farm cookie from two places
      vm.setFarmCookie();
    };

    //Code
    var monitor;
    vm.monitorTick = function(){
      vm.totals = {0: 0, 1: 0, 2: 0};
      for (var f in vm.farms){
        var farm = vm.farms[f];
        var cap = vm.data[farm.type][farm.lv].stock;
        var gain = Math.min(cap,moment().diff(vm.collectTime,"second")*vm.data[farm.type][farm.lv].rate/60);// divide by 60
        vm.totals[farm.type]+=gain;
        farm.now=Math.floor(gain);
        farm.percent = (farm.now/cap)*100;
      }
      $log.log(vm.totals);
      $log.log("Tick");
    };

    vm.monitorStart = function(){
      vm.monitorTick();
      if (angular.isDefined(monitor)) {
        $interval.cancel(monitor);
      }
      monitor = $interval(vm.monitorTick, 10000);
    };

    $scope.$on("$destroy", function(){
      if (angular.isDefined(monitor)) {
        $interval.cancel(monitor);
      }
    });

    vm.collect = function(){
      //Reset values

      //Reset timers
      vm.collectTime = moment();
      $cookies.put('collectTime',vm.collectTime.unix(),{'expires': moment().add(1,"year").toDate()});
      vm.monitorStart();
    };

    //Load user config
    vm.styleMinimal = false;
    vm.styleEdit = false;
    if (angular.isDefined($cookies.get('styleMinimal'))){
      vm.styleMinimal = $cookies.get('styleMinimal');
    }

    if (angular.isDefined($cookies.get('farmss'))) {
      vm.getFarmCookie();
    }

    if (angular.isDefined($cookies.get('collectTime'))){
      vm.collectTime = moment.unix($cookies.get('collectTime'));
      vm.monitorStart();
    }else{
      vm.collectTime = moment();
    }
  }
})();
