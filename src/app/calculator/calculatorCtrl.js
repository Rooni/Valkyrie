(function() {
    'use strict';


    angular.module('valkyrie').controller('CalcController', CalculatorController);

    /** @ngInject */
    function CalculatorController($log, $cookies) {
      var vm = this;

      //Alerts
      vm.alerts = [];
      if (!$cookies.get('calcnotice')) {
        vm.alerts.push({
            type: 'warning',
            msg: "Heya! This calculator is still in development, and there may be problems.Please report any issues or ideas to improve it. "
        });
      }

      vm.closeAlert = function(index) {
        vm.alerts.splice(index, 1);
        $cookies.put('calcnotice', true);
      };

      //Static data
      vm.exptable = {
        1: 0,
        2: 100,
        3: 207,
        4: 321,
        5: 443,
        6: 574,
        7: 714,
        8: 864,
        9: 1025,
        10: 1197,
        11: 1381,
        12: 1578,
        13: 1789,
        14: 2015,
        15: 2257,
        16: 2516,
        17: 2793,
        18: 3089,
        19: 3406,
        20: 3745,
        21: 4108,
        22: 4496,
        23: 4911,
        24: 5355,
        25: 5830,
        26: 6338,
        27: 6882,
        28: 7464,
        29: 8087,
        30: 8754,
        31: 9468,
        32: 10232,
        33: 11049,
        34: 11923,
        35: 12858,
        36: 13858,
        37: 14928,
        38: 16073,
        39: 17298,
        40: 18609,
        41: 20012,
        42: 21513,
        43: 23119,
        44: 24837,
        45: 26675,
        46: 28642,
        47: 30747,
        48: 32999,
        49: 35409,
        50: 37988,
        51: 40748,
        52: 43701,
        53: 46861,
        54: 50242,
        55: 53860,
        56: 57731,
        57: 61873,
        58: 66305,
        59: 71047,
        60: 76121,
        61: 81550,
        62: 87359,
        63: 93575,
        64: 100226,
        65: 107343,
        66: 114958,
        67: 123106,
        68: 131824,
        69: 141152,
        70: 151133,
        71: 161813,
        72: 173241,
        73: 185469,
        74: 198553,
        75: 212553,
        76: 227533,
        77: 243562,
        78: 260713,
        79: 279065,
        80: 298702,
        81: 319714,
        82: 342197,
        83: 366254,
        84: 391995,
        85: 419538,
        86: 449009,
        87: 480543,
        88: 514284,
        89: 550387,
        90: 589017
      };
      vm.cardtable = {
        "N" : {
          'maxlevel':30,
          'factor': 0.25,
          'base_exp': 100
        },
        "HN" : {
          'maxlevel':40,
          'factor': 0.375,
          'base_exp': 150
        },
        "X" : {
          'maxlevel': 0,
          'factor': 0.5,
          'base_exp': 200
        },
        'R' : {
          'maxlevel':40,
          'factor': 0.5,
          'base_exp': 200
        },
        "HR" : {
          'maxlevel':50,
          'factor': 0.75,
          'base_exp': 300
        },
        "SR" : {
          'maxlevel':50,
          'factor': 10,
          'base_exp': 4000
        },
        "HSR" : {
          'maxlevel':60,
          'factor': 15,
          'base_exp': 6000
        },
        "GSR" : {
          'maxlevel':70,
          'factor': 20,
          'base_exp': 8000
        },
        "UR" : {
          'maxlevel':70,
          'factor': 10,
          'base_exp': 4000
        },
        "HUR" : {
          'maxlevel':80,
          'factor': 15,
          'base_exp': 6000
        },
        "GUR" : {
          'maxlevel':90,
          'factor': 20,
          'base_exp': 8000
        },
        "Slime" : {
          'maxlevel':30,
          'factor': 1.25,
          'base_exp': 1000
        },
        "MetalSlime" : {
          'maxlevel':40,
          'factor': 3.75,
          'base_exp': 3000
        },
        "SlimeQueen" : {
          'maxlevel':50,
          'factor': 50,
          'base_exp': 40000
        },
        "SlimeQueenHSR" : {
          'maxlevel':60,
          'factor': 112.5,
          'base_exp': 90000
        }
      };

      //Input vars
      vm.selection = "N";
      vm.level = 5;


      vm.expFromLevel = function (lv) {
        return parseFloat(vm.exptable[lv]);
      };

      vm.expNeeded = function(){
        return vm.expTotal()-vm.expFromLevel(vm.level);
      };

      vm.expTotal = function(){
        return vm.exptable[vm.cardtable[vm.selection].maxlevel];
      };

      vm.calcTotalExp = function(){
        return vm.cardtable[vm.selection].base_exp+vm.cardtable[vm.selection].factor*vm.exptable[vm.level];
      };

      vm.getExp = function(card){
        return vm.cards[card].base_exp+(vm.cardtable[card].factor*vm.exptable[vm.level]);
      };

      vm.LevelFromExp = function(total){
        for (var key in vm.exptable) {
          if(vm.exptable[key]>total) {
            return key-1;
          }
        }
        return '90';
      };

      //Functions


      //Get exptable output from card+level
      vm.ExpFromCard = function (card,lv){
        var factor = vm.cardtable[card].factor;
        var base = vm.cardtable[card].base_exp;
        var xp = vm.exptable[lv];

        return Math.floor(base+(factor*xp));
      };

      vm.options=[];

      function PopulateWithSlime(){
        var add = ['Slime'];
        for(var i=0;i<add.length;i++ ){
          for (var lv=1;lv<vm.cardtable[add[i]].maxlevel;lv++){
            //angular.log("Adding ",lv);
            vm.options.push({
              name: "Lv" + lv + " "+add[i],
              type: i+1,
              output: vm.ExpFromCard(add[i], lv),
              priority: 1,
              level: lv
            });
          }
        }
        /*
         for(var i=1; i<=30; i++){
         vm.options.push({
         name: "Lv" + i + " Slime",
         output: vm.ExpFromCard('Slime', i),
         priority: 1,
         level: i
         });
         }
         /*
         for(var i=1; i<=40; i++){
         vm.options["Lv"+i+" Metal Slime"]= {
         name: "Lv" + i + "Metal Slime",
         output: vm.ExpFromCard('MetalSlime', i),
         priority: 3,
         image: "Metal_Slime_icon.png",
         level: i
         };
         }
         for(var i=1; i<=33; i++){
         vm.options["Lv"+i+" Slime Queen"]= {
         name: "Lv" + i + "Slime Queen",
         output: vm.ExpFromCard('SlimeQueen', i),
         priority: 3,
         image: "Slime_Queen_icon.png",
         level: i
         };
         }

         for(var i=1; i<=40; i++){
         vm.options["Lv"+i+" R card"]= {
         name: "Lv" + i + "R card",
         output: vm.ExpFromCard('R', i),
         priority: 2,
         image: "d",
         level: i
         };
         }
         */
      }

      PopulateWithSlime();

      vm.calculateData = function(){
        vm.optionlist = [];
        var targetexp = vm.expFromLevel(vm.cardtable[vm.selection].maxlevel)-vm.expFromLevel(vm.level);
        $.each(vm.options,function(index, option){
          for (var m=1;m<=4;m*=2) {
            var needed = targetexp/(option.output*m);
            var near = needed%1;
            vm.optionlist.push({
              name: option.name,
              type: option.type,
              lv: option.level,
              needed: Math.ceil(needed),
              near: near,
              waste: (1-near)*option.output*m,
              arcana: m
            });
          }

        });

        function purge(){
          var todel=[];
          $.each(vm.optionlist,function(index, option){
            if (index==0) return;
            if (vm.optionlist[index-1].needed==option.needed && option.type==vm.optionlist[index-1].type&&vm.optionlist[index-1].arcana==option.arcana){
              todel.push(index);
            }
          });
          for (var i = todel.length -1; i >= 0; i--)
            vm.optionlist.splice(todel[i],1);

        }

        function purge2(){
          var todel=[];
          $.each(vm.optionlist,function(index, option){
            if (index==0) return;
            if (option.type==vm.optionlist[index-1].type&&vm.optionlist[index-1].level<option.level){
              todel.push(index);
            }
          });
          for (var i = todel.length -1; i >= 0; i--)
            vm.optionlist.splice(todel[i],1);

        }

        function purge3(){
          var todel=[];
          $.each(vm.optionlist,function(index, option){
            if (index==0) return;
            if (vm.optionlist[index-1].waste<option.waste){
              todel.push(index);
            }
          });
          for (var i = todel.length -1; i >= 0; i--)
            vm.optionlist.splice(todel[i],1);

        }

        vm.optionlist.sort(function (x, y) { return x.needed - y.needed || x.lv-y.lv;});
        purge3();
        purge2();
      };
      /*
       vm.calculateData = function(){
       console.log('---------');
       vm.optionlist = [];
       var expneeded = vm.expFromLevel(vm.cardtable[vm.selection].maxlevel)-vm.expFromLevel(vm.level);
       var threshold = 0.5;
       $.each(vm.options,function(index, option){
       var total = expneeded/(option.output);
       var waste = Math.round((1-(total%1))*option.output);
       vm.optionlist.push({
       type: index,
       amount: total,
       waste: waste,
       perc: 1-(total%1),
       priority: option.priority,
       image: option.image,
       exp: expneeded+waste,
       explevel: vm.LevelFromExp(expneeded+waste),
       hi: Math.max(1-(total%1),1-(total/2%1),1-(total/4%1)).toFixed(2),
       hi2: Math.ceil(total/4),
       hi3: option.level
       });
       });
       vm.optionlist.sort(function (x, y) {return x.hi2 - y.hi2|| x.hi - y.hi|| x.priority - y.priority || x.hi3 - y.hi3; });
       };
       */
    }
})();
