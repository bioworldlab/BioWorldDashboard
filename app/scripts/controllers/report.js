'use strict';

/**
 * @ngdoc function
 * @name dashboardApp.controller:ReportCtrl
 * @description
 * # ReportCtrl
 * Controller of the dashboardApp
 */
angular.module('dashboardApp')
  .controller('ReportCtrl', function ( $scope, $filter) {
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
     
      ob[property.replace(/\n|\r/g, "")] = object[property].replace(/\n|\r/g, "");
  }
     $scope.biodata.push(ob);
  }
  
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
  
$scope.$watch('selected.user', function () {
                 
     $scope.options = {
     	chart: {
                    type: 'lineWithFocusChart',
                    height: 450,
                    margin : {
                        top: 20,
                        right: 40,
                        bottom: 60,
                        left: 40
                    },
                    x: function(d){ return d.x; },
                    y: function(d){ return d.y*1; },
                    duration: 500,
                    useInteractiveGuideline: true,
                    xAxis: {
                        axisLabel: 'Areas',
                        tickFormat: function(d){
                           // var label = $scope.data[0].values[d];
                           return areadata[d];
                        },
                         rotateLabels: 30
                    },
                    x2Axis: {
                        tickFormat: function(d){
                           // var label = $scope.data[0].values[d];
                           return areadata[d];
                        }
                    },
                    yAxis: {
                        axisLabel: 'Time(s)',
                        tickFormat: function(d){
                            return d3.format(',f')(d);
                        },
                        rotateYLabel: false
                    },
                    y2Axis: {
                        tickFormat: function(d){
                            return d3.format(',f')(d);
                        }
                    },
                     callback: highlightPoints,
                    dispatch: {
                      renderEnd: function(){
                        highlightPoints();
                      }
                    }
                }
           
        };

        $scope.options1 = {
     	chart: {
                    type: 'lineWithFocusChart',
                    height: 450,
                    margin : {
                        top: 20,
                        right: 40,
                        bottom: 60,
                        left: 40
                    },
                    x: function(d){ return d.x; },
                    y: function(d){ return d.y*1; },
                    duration: 500,
                    useInteractiveGuideline: true,
                    xAxis: {
                        axisLabel: 'Action',
                        tickFormat: function(d){
                           // var label = $scope.data[0].values[d];
                           return actiondata[d];
                        },
                         rotateLabels: 30
                    },
                    x2Axis: {
                        tickFormat: function(d){
                           // var label = $scope.data[0].values[d];
                           return actiondata[d];
                        }
                    },
                    yAxis: {
                        axisLabel: 'Time(s)',
                        tickFormat: function(d){
                            return d3.format(',f')(d);
                        },
                        rotateYLabel: false
                    },
                    y2Axis: {
                        tickFormat: function(d){
                            return d3.format(',f')(d);
                        }
                    },
                     callback: highlightPoints1,
                    dispatch: {
                      renderEnd: function(){
                        highlightPoints1();
                      }
                    }
                }
           
        };
         function highlightPoints(){
                var data = d3.select('.nv-groups').datum();
                $scope.curdata=[];
                 data.forEach(function (d1, index) {
                     var str='';
                    d1.values.forEach(function (val) {
                    str += areadata[val.x]+'---- '+val.y+ 'seconds</br>';
                    });   
               $scope.curdata[index] = 
                {
                  "key" : d1.key ,
                  "values" : str
                };

                });
               loadData();
            }

       function highlightPoints1(){
                var data = d3.select('.nv-groups').datum();
                $scope.curdata=[];
                 data.forEach(function (d1, index) {
                     var str='';
                    d1.values.forEach(function (val) {
                    str += actiondata[val.x]+'---- '+val.y+ 'seconds</br>';
                    });   
               $scope.curdata[index] = 
                {
                  "key" : d1.key ,
                  "values" : str
                };

                });
               loadData();
            }

        function loadData() {
        $(document).ready(function() {

        function loadTable(tableId, fields, data) {
            //$('#' + tableId).empty(); //not really necessary
            var rows = '';
            $.each(data, function(index, item) {
                var row = '<tr>';
                $.each(fields, function(index, field) {
                    row += '<td>' + item[field+''] + '</td>';
                });
                rows += row + '<tr>';
            });
            $('#' + tableId + ' tbody').html(rows);
        }

        loadTable('data-table', ['key', 'values'],  $scope.curdata);

    });
    }  
     
var dataArea1 =[];
var dataArea2 =[];
var dataArea3 =[];
var dataAction1 =[];
var dataAction2 =[];
var dataAction3 =[];
var dataFeedback =[];
var areadata =['Chart','History','Library','Summarize'];
var actiondata =['Linking Evidence','Unlinking Evidence','Adding Evidence','Lab Test','Categorize',
'Change Hypothesis','Delete Hypothesis','Select Hypothesis','Prioritize','Check Summary','Help'
];
 $scope.biodata.forEach(function(bdata) {
  if($scope.selected.user===bdata.user)
  {console.log(bdata.case)
  	if(bdata.case==='Amy')
  	{console.log('Amy')
   		dataArea1.push([0,bdata.time_interval_area_chart]);
   		dataArea1.push([1,bdata.time_interval_area_history]);
   		dataArea1.push([2,bdata.time_interval_area_library]);
   		dataArea1.push([3,bdata.time_interval_area_summarize]);

   		 dataAction1.push([0,bdata.time_interval_linking_evidence]);
   		dataAction1.push([1,bdata.time_interval_unlinking_evidence]);
   		dataAction1.push([2,bdata.time_interval_adding_evidence]);
   		dataAction1.push([3,bdata.time_interval_lab_test]);
   		dataAction1.push([4,bdata.time_interval_categorize]);
   		dataAction1.push([5,bdata.time_interval_change_hypothesis]);
   		dataAction1.push([6,bdata.time_interval_delete_hypothesis]);
   		dataAction1.push([7,bdata.time_interval_select_hypothesis]);
   		dataAction1.push([8,bdata.time_interval_prioritize]);
   		dataAction1.push([9,bdata.time_interval_check_summary]);
   		dataAction1.push([10,bdata.time_interval_help]);
   		
  	}
  	if(bdata.case==='Cynthia')
  	{console.log('Amy1')
   		dataArea2.push([0,bdata.time_interval_area_chart]);
   		dataArea2.push([1,bdata.time_interval_area_history]);
   		dataArea2.push([2,bdata.time_interval_area_library]);
   		dataArea2.push([3,bdata.time_interval_area_summarize]);

   		 dataAction2.push([0,bdata.time_interval_linking_evidence]);
   		dataAction2.push([1,bdata.time_interval_unlinking_evidence]);
   		dataAction2.push([2,bdata.time_interval_adding_evidence]);
   		dataAction2.push([3,bdata.time_interval_lab_test]);
   		dataAction2.push([4,bdata.time_interval_categorize]);
   		dataAction2.push([5,bdata.time_interval_change_hypothesis]);
   		dataAction2.push([6,bdata.time_interval_delete_hypothesis]);
   		dataAction2.push([7,bdata.time_interval_select_hypothesis]);
   		dataAction2.push([8,bdata.time_interval_prioritize]);
   		dataAction2.push([9,bdata.time_interval_check_summary]);
   		dataAction2.push([10,bdata.time_interval_help]);
   		
  	}
  	if(bdata.case==='Susan Taylor')
  	{console.log('Amy2')
   		dataArea3.push([0,bdata.time_interval_area_chart]);
   		dataArea3.push([1,bdata.time_interval_area_history]);
   		dataArea3.push([2,bdata.time_interval_area_library]);
   		dataArea3.push([3,bdata.time_interval_area_summarize]);

   		 dataAction3.push([0,bdata.time_interval_linking_evidence]);
   		dataAction3.push([1,bdata.time_interval_unlinking_evidence]);
   		dataAction3.push([2,bdata.time_interval_adding_evidence]);
   		dataAction3.push([3,bdata.time_interval_lab_test]);
   		dataAction3.push([4,bdata.time_interval_categorize]);
   		dataAction3.push([5,bdata.time_interval_change_hypothesis]);
   		dataAction3.push([6,bdata.time_interval_delete_hypothesis]);
   		dataAction3.push([7,bdata.time_interval_select_hypothesis]);
   		dataAction3.push([8,bdata.time_interval_prioritize]);
   		dataAction3.push([9,bdata.time_interval_check_summary]);
   		dataAction3.push([10,bdata.time_interval_help]);
   		
  	}
    
       
    dataAction1.push(
        {
      "label":'Linking Evidence',
      "value": bdata.time_interval_linking_evidence
    },
    {
      "label":'Unlinking Evidence',
      "value": bdata.time_interval_unnking_evidence
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


$scope.data =[
        {
           key: "AMY",
           values:dataArea1
        },
        {
           key: "Cynthia",
           values:dataArea2
        },
        {
           key: "Susan Taylor",
           values:dataArea3
        }].map(function(series) {
                series.values = series.values.map(function(d) { console.log('d[0]'+d[0]);
                	return {x: d[0], y: d[1] };});
                return series;
            });

        $scope.data1 =[
        {
           key: "AMY",
           values:dataAction1
        },
        {
           key: "Cynthia",
           values:dataAction2
        },
        {
           key: "Susan Taylor",
           values:dataAction3
        }].map(function(series) {
                series.values = series.values.map(function(d) { console.log('d[0]'+d[0]);
                	return {x: d[0], y: d[1] };});
                return series;
            });
  
 
  });
       
  });
   });
 });
