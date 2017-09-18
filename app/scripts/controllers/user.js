'use strict';

/**
 * @ngdoc function
 * @name dashboardApp.controller:UserCtrl
 * @description
 * # UserCtrl
 * Controller of the dashboardApp
 */
angular.module('dashboardApp')
  .controller('UserCtrl', function ($scope, $filter) {
    $scope.users = [];
    $scope.cases = [];
    $scope.selected={};
    $scope.selecteduserCollapsed =true;
  $(document).ready(function(){
   $.get('assets/bioworld_data.csv', function (data) {
     var lines = data.split('\n');
     $scope.result = [];
     var headers=lines[0].split(",");

     for(var i=1;i<lines.length;i++){
       var obj = {};
       var currentline=lines[i].split(",");
       for(var j=0;j<headers.length;j++){
            obj[headers[j]] = currentline[j];
           }
       $scope.result.push(obj);
        }

  $scope.users = removeDuplicates($scope.result);
  $scope.cases = removeDuplicates1($scope.result);
  $scope.reports=["Time Spent in Areas", "Time Spent on Actions", "Evidence",
  "Lab Tests","Review", "Feedback", "Planning" ];

 
 $scope.biodata = [];

for (var i = 0; i < $scope.result.length; i++) {
    var object = $scope.result[i];
    var sss=[];
    var ob  = {};
    for (var property in object) {
      //var res =property;
     // if(property!=='undefined'){
    //  console.log('property '+property+' : '+object[property]);
      ob[property.replace(/\n|\r/g, "")] = object[property].replace(/\n|\r/g, "");
   // }
            // sss.push({user :object[property]});
          // {'user':res.user},
          // {'case':res.case},
          // {'time_interval_area':[
          //     {'Chart':res.time_interval_area_chart},
          //     {'History':res.time_interval_area_history},
          //     {'Library':res.time_interval_area_library},
          //     {'Summarize':res.time_interval_area_summarize}
          // ]}
          // {'time_interval_action':[
          //     {'Linking Evidence':res.time_interval_linking_evidence},
          //     {'Unlinking Evidence':res.time_interval_unlinking_evidence},
          //     {'Adding Evidence':res.time_interval_adding_evidence},
          //     {'Lab Test':res.time_interval_area_lab_test},
          //     {'Categorize':res.time_interval_area_categorize},
          //     {'Categorize':res.time_interval_area_categorize},
          //     {'Change Hypothesis':res.time_interval_change_hypothesis},
          //     {'Delete_Hypothesis':res.time_interval_delete_hypothesis},
          //     {'Select Hypothesis':res.time_interval_select_hypothesis},
          //     {'Prioritize':res.time_interval_prioritize},
          //     {'Check Summary':res.time_interval_check_summary},
          //     {'Help':res.time_interval_help}
          //     // {'Unlinking Evidence':res.time_interval_unlinking_evidence},
          //     // {'Unlinking Evidence':res.time_interval_unlinking_evidence}
          // ]},
          // {'Time taken to solve case in seconds':res.time_taken_to_solve_case_in_seconds},
          // {'Per centage of evidence items and labtests matches with expert solution':res.percentageofevidenceitemsandlabtestsmatcheswithexpertsolution},
          // {'Number of lab tests ordered':res.number_of_lab_tests_ordered},
          // {'Confidence percentage':res.confidence_percentage},
          // {'Perceived Difficulty':res.perceived_difficulty},
          // {'Correctness diagnostic is correct true false':res.time_correctness_diagnostic_is_correct_true_false},
          // {'Goal orientation_m':res.goal_orientation_m},
          // {'Goal orientation_pp':res.goal_orientation_pp},
          // {'Goal orientation_pa':res.goal_orientation_pa},
          // {'Freq class':res.feq_class},
          // {'Feedback':[
          //     {'Time Seconds':res.feedback_time_seconds},
          //     {'Accepting':res.feedback_accepting},
          //     {'Modifying manipulating':res.feedback_modifying_manipulating},
          //     {'Rejecting':res.feedback_rejecting},
          //     {'Seeking':res.feedback_seeking},
          //     {'Self generating':res.feedback_self_generating}
          // ]}
          
       //   );
       // console.log('item ' + i + ': ' + property + '=' + object[property]);
    }
   // console.log(JSON.stringify(ob )); 
   $scope.biodata.push(ob);
    // If property names are known beforehand, you can also just do e.g.
    // alert(object.id + ',' + object.Title);
}

 
  //console.log(JSON.stringify($scope.result )); 

  // $scope.selected.user= $scope.users[0].user;
  // $scope.selected.case=$scope.cases[0].case;
  // $scope.selected.report=$scope.reports[0];
  // $scope.biodata = [];
  
  // $scope.result.forEach(function(res) { 
  // $scope.users.forEach(function(user) {
  //    $scope.cases.forEach(function(curcase) { 
  //     if(res.user===user){
  //       $scope.biodata.push(
  //         {'user':user},
  //         {'case':curcase},
  //         {'time_interval_area':[
  //             {'Chart':res.time_interval_area_chart},
  //             {'History':res.time_interval_area_history},
  //             {'Library':res.time_interval_area_library},
  //             {'Summarize':res.time_interval_area_summarize}
  //         ]},
  //         {'time_interval_action':[
  //             {'Linking Evidence':res.time_interval_linking_evidence},
  //             {'Unlinking Evidence':res.time_interval_unlinking_evidence},
  //             {'Adding Evidence':res.time_interval_adding_evidence},
  //             {'Lab Test':res.time_interval_area_lab_test},
  //             {'Categorize':res.time_interval_area_categorize},
  //             {'Categorize':res.time_interval_area_categorize},
  //             {'Change Hypothesis':res.time_interval_change_hypothesis},
  //             {'Delete_Hypothesis':res.time_interval_delete_hypothesis},
  //             {'Select Hypothesis':res.time_interval_select_hypothesis},
  //             {'Prioritize':res.time_interval_prioritize},
  //             {'Check Summary':res.time_interval_check_summary},
  //             {'Help':res.time_interval_help}
  //             // {'Unlinking Evidence':res.time_interval_unlinking_evidence},
  //             // {'Unlinking Evidence':res.time_interval_unlinking_evidence}
  //         ]},
  //         {'Time taken to solve case in seconds':res.time_taken_to_solve_case_in_seconds},
  //         {'Per centage of evidence items and labtests matches with expert solution':res.percentageofevidenceitemsandlabtestsmatcheswithexpertsolution},
  //         {'Number of lab tests ordered':res.number_of_lab_tests_ordered},
  //         {'Confidence percentage':res.confidence_percentage},
  //         {'Perceived Difficulty':res.perceived_difficulty},
  //         {'Correctness diagnostic is correct true false':res.time_correctness_diagnostic_is_correct_true_false},
  //         {'Goal orientation_m':res.goal_orientation_m},
  //         {'Goal orientation_pp':res.goal_orientation_pp},
  //         {'Goal orientation_pa':res.goal_orientation_pa},
  //         {'Freq class':res.feq_class},
  //         {'Feedback':[
  //             {'Time Seconds':res.feedback_time_seconds},
  //             {'Accepting':res.feedback_accepting},
  //             {'Modifying manipulating':res.feedback_modifying_manipulating},
  //             {'Rejecting':res.feedback_rejecting},
  //             {'Seeking':res.feedback_seeking},
  //             {'Self generating':res.feedback_self_generating}
  //         ]}
          
  //         );
  //     }

  //    });
  // });
  // });

  
  
   

/* 
 * Function from http://stackoverflow.com/questions/21951115/remove-duplicate-values-from-json-data. Answered by Tushar Gupta
 */

 function removeDuplicates1(json_all) {
    var arr = [],
        collection = [];
    
    $.each(json_all, function (index, value) {
        if ($.inArray(value.case, arr) == -1) {
            arr.push(value.case);
            collection.push(value);
        }
    });
    return collection;
 }
    function removeDuplicates(json_all) {
        var arr = [], 
            collection = [];
        
        $.each(json_all, function (index, value) {
            if ($.inArray(value.user, arr) == -1) {
                arr.push(value.user);
                collection.push(value);
            }
        });
        return collection;
    }

  $scope.selected.user= $scope.users[0].user;
  $scope.selected.case=$scope.cases[0].case;
  $scope.selected.report=$scope.reports[0];
    var xlabel='Area'; 
   // $scope.$watch('selected.report' , function () { 
   // if($scope.selected.report==='Time Spent on Actions') {
   //  console.log('ggggg');
   //     xlabel='Action';
   // } 
   // });   
$scope.$watch('[selected.user,selected.case]', function () {
                 

     $scope.options = {
            chart: {
                type: 'discreteBarChart',
                height: 400,
                margin : {
                    top: 20,
                    right: 20,
                    bottom: 100,
                    left: 55
                },
                x: function(d){return d.label;},
                y: function(d){return d.value*1;},
                showValues: true,
                valueFormat: function(d){
                    return d3.format(',f')(d);
                },
                duration: 500,
                xAxis: {
                    axisLabel: xlabel,
                    rotateLabels: 30
                },
                yAxis: {
                    axisLabel: 'Time(s)',
                    axisLabelDistance:-10
                },

            }
        };

         $scope.options2 = {
            chart: {
                type: 'discreteBarChart',
                height: 400,
                margin : {
                    top: 20,
                    right: 20,
                    bottom: 100,
                    left: 55
                },
                x: function(d){return d.label;},
                y: function(d){return d.value*1;},
                showValues: true,
                valueFormat: function(d){
                    return d3.format(',f')(d);
                },
                duration: 500,
                xAxis: {
                    axisLabel: 'Action',
                    rotateLabels: 30
                },
                yAxis: {
                    axisLabel: 'Time(s)',
                    axisLabelDistance:-10
                }
            }
        };

      $scope.options1 = {
            chart: {
                type: 'pieChart',
                height: 450,
                donut: true,
                x: function(d){return d.label;},
                y: function(d){return d.value;},
                valueFormat: function(d){
                    return d3.format(',f')(d);
                },
                 showLabels: true,
                duration: 500,
                labelThreshold: 0.01,
                labelSunbeamLayout: true,
                legend: {
                    margin: {
                        top: 5,
                        right: 35,
                        bottom: 5,
                        left: 0
                    }
                }
            }
        };   
var dataArea =[];
var dataAction =[];
var dataFeedback =[];
//var dataArea =[];
 $scope.biodata.forEach(function(bdata) {
  if($scope.selected.user===bdata.user&&$scope.selected.case===bdata.case)
  {
   dataArea.push(
    {
      "label":'Chart',
      "value": bdata.time_interval_area_chart*1
    },
    {
      "label":'History',
      "value": bdata.time_interval_area_history
    },
    {
      "label":'Library',
      "value": bdata.time_interval_area_library
    },
    {
      "label":'Summarize',
      "value": bdata.time_interval_area_summarize
    }
    );

    dataAction.push(
    {
      "label":'Linking Evidence',
      "value": bdata.time_interval_linking_evidence
    },
    {
      "label":'Unlinking Evidence',
      "value": bdata.time_interval_unlinking_evidence
    },
    {
      "label":'Adding Evidence',
      "value": bdata.time_interval_adding_evidence
    },
     {
      "label":'Lab Test',
      "value": bdata.time_interval_lab_test
    },
     {
      "label":'Categorize',
      "value": bdata.time_interval_categorize
    },
     {
      "label":'Change Hypothesis',
      "value": bdata.time_interval_change_hypothesis
    },
     {
      "label":'Delete_Hypothesis',
      "value": bdata.time_interval_delete_hypothesis
    },
     {
      "label":'Select Hypothesis',
      "value": bdata.time_interval_select_hypothesis
    },
     {
      "label":'Prioritize',
      "value": bdata.time_interval_prioritize
    },
     {
      "label":'Check Summary',
      "value": bdata.time_interval_check_summary
    },
     {
      "label":'Help',
      "value": bdata.time_interval_help
    }
    );
   // console.log(bdata.feedback_time_seconds);
   $scope.ftime=bdata.feedback_time_seconds;
   $scope.faccepting=bdata.feedback_accepting;
   $scope.fmodifying_manipulating=bdata.feedback_modifying_manipulating;
   $scope.frejecting=bdata.feedback_rejecting;
   $scope.fseeking=bdata.feedback_seeking;
   $scope.fself_generating=bdata.feedback_self_generating;
  
    dataFeedback.push(
    {
      "label":'Time Spent(s)',
      "value": bdata.feedback_time_seconds
    },
    {
      "label":'Accepting',
      "value": bdata.feedback_accepting
    },
    {
      "label":'Modifying',
      "value": bdata.feedback_modifying_manipulating
    },
    {
      "label":'Rejecting',
      "value": bdata.feedback_rejecting
    },
    {
      "label":'Seeking',
      "value": bdata.feedback_seeking
    },
    {
      "label":'Self generating',
      "value": bdata.feedback_self_generating
    }
    );
  }

  });

dataArea.sort(function (a, b) {
                return a.value - b.value;
            }).reverse();
dataAction.sort(function (a, b) {
                return a.value - b.value;
            }).reverse();
$scope.maxArea=dataArea[0].label;
$scope.minArea=dataArea[dataArea.length-1].label;
$scope.data =[
        {
           key: "Cumulative Return",
           values:dataArea
        }]
  $scope.data1 =[
        {
           key: "Cumulative Return",
           values:dataAction
        }]

        //  $scope.data2 =[
        // {
        //    key: "Cumulative Return",
        //    values:dataFeedback
        // }]

         $scope.data2 =dataFeedback; 
  
  //$scope.groups = ['Not accurate at all','Somewhat accurate', 'Accurate', 'Very accurate'];
 $scope.user = {
    status: 2
  }; 

  $scope.statuses = [
    {value: 1, text: 'Not accurate at all'},
    {value: 2, text: 'Somewhat accurate'},
    {value: 3, text: 'Accurate'},
    {value: 4, text: 'Very accurate'}
  ]; 

  $scope.showStatus = function() {
    var selected = $filter('filter')($scope.statuses, {value: $scope.user.status});
    return ($scope.user.status && selected.length) ? selected[0].text : 'Not set';
  };
  $scope.user2 = {
    status: 1
  }; 

  $scope.statuses2 = [
    {value: 1, text: 'Yes'},
    {value: 2, text: 'No'}
  ]; 

  $scope.showStatus2 = function() {
    var selected = $filter('filter')($scope.statuses2, {value: $scope.user2.status});
    return ($scope.user2.status && selected.length) ? selected[0].text : 'Not set';
  };
  $scope.user1 = {
    status: 2
  }; 

  $scope.statuses1 = [
    {value: 1, text: 'History'},
    {value: 2, text: 'Chart'},
    {value: 3, text: 'Library'},
    {value: 4, text: 'Summarize'}
  ]; 

  $scope.showStatus1 = function() {
    var selected = $filter('filter')($scope.statuses1, {value: $scope.user1.status});
    return ($scope.user1.status && selected.length) ? selected[0].text : 'Not set';
  };
 
  });
       
  });
   });
 });
