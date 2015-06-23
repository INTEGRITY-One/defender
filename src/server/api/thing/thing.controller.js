/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /things              ->  index
 * GET     /things/:id          ->  show
 */

'use strict';

var _ = require('lodash');
var _http = require('http');


// Get list of recalls
exports.getFood = function(req, res) {
  //var sector = escape("FOOD");

  console.log('things.controller: Received: search PARAMS='+req.params.search);

  var baseQueryString = "api_key=97hexPQBqiRG7qeNL5LCubmalvKuWQIhCjnrOHLB&limit=100";

  var curDate = new Date();
  var yyyy = curDate.getFullYear();
  var mm = curDate.getMonth() < 9 ? "0" + (curDate.getMonth() + 1) : curDate.getMonth() + 1;
  var dd = curDate.getDate() < 10 ? "0" + (curDate.getDate() + 1) : curDate.getDate() + 1;
  var formattedCurDate = yyyy.toString() + mm.toString() + dd.toString();

  curDate.setDate(curDate.getDate() - 90);
  yyyy = curDate.getFullYear();
  mm = curDate.getMonth() < 9 ? "0" + (curDate.getMonth() + 1) : curDate.getMonth() + 1;
  dd = curDate.getDate() < 10 ? "0" + (curDate.getDate() + 1) : curDate.getDate() + 1;
  var formattedPrevDate = yyyy.toString() + mm.toString() + dd.toString();

  console.log(formattedPrevDate);
  console.log(formattedCurDate);
  var recentQueryString = baseQueryString + "&search=report_date:[" + formattedPrevDate + "+TO+" + formattedCurDate + "]";

  if(req.params.search !== undefined && req.params.search !== "") {
    var searchParam = req.params.search;
    while(searchParam.indexOf(' ') !== -1) {
      searchParam = searchParam.replace(' ','%20');
    }
    recentQueryString += "+AND+(" + searchParam + ")";
  }

  console.log('query: ' + recentQueryString)

  var host = "api.fda.gov";
  var qrypath_food = "/food/enforcement.json?"+recentQueryString;
  var qrypath_drug = "/drug/enforcement.json?"+recentQueryString;
  var qrypath_device = "/device/enforcement.json?"+recentQueryString;

  var http = require('http');

  var recallResultsList = [];

  // Now perform the actual queries
  // Query Food API
  var qryReq = http.get({host: host, path: qrypath_food}, function(qryResp) {
    console.log('STATUS: ' + qryResp.statusCode);
    console.log('HEADERS: ' + JSON.stringify(qryResp.headers));

    // Buffer the body entirely for processing as a whole.
    var bodyChunks = [];
    qryResp.on('data', function(chunk) {
      // You can process streamed parts here...
      bodyChunks.push(chunk);
    }).on('end', function() {
      var body = JSON.parse(Buffer.concat(bodyChunks));
      var foodResults = body;
      console.log('BODY: ' + foodResults);
      // ...and/or process the entire body here.
      //recallResultsList.concat(foodResults);

      return res.json(200, JSON.stringify(foodResults));
    })
  });
};

// Get list of recalls
exports.getDevice = function(req, res) {
  //var sector = escape("FOOD");

  console.log('things.controller: Received: search PARAMS='+req.params.search);

  var baseQueryString = "api_key=97hexPQBqiRG7qeNL5LCubmalvKuWQIhCjnrOHLB&limit=100";

  var curDate = new Date();
  var yyyy = curDate.getFullYear();
  var mm = curDate.getMonth() < 9 ? "0" + (curDate.getMonth() + 1) : curDate.getMonth() + 1;
  var dd = curDate.getDate() < 10 ? "0" + (curDate.getDate() + 1) : curDate.getDate() + 1;
  var formattedCurDate = yyyy.toString() + mm.toString() + dd.toString();

  curDate.setDate(curDate.getDate() - 90);
  yyyy = curDate.getFullYear();
  mm = curDate.getMonth() < 9 ? "0" + (curDate.getMonth() + 1) : curDate.getMonth() + 1;
  dd = curDate.getDate() < 10 ? "0" + (curDate.getDate() + 1) : curDate.getDate() + 1;
  var formattedPrevDate = yyyy.toString() + mm.toString() + dd.toString();

  console.log(formattedPrevDate);
  console.log(formattedCurDate);
  var recentQueryString = baseQueryString + "&search=report_date:[" + formattedPrevDate + "+TO+" + formattedCurDate + "]";

  if(req.params.search !== undefined && req.params.search !== "") {
    var searchParam = req.params.search;
    while(searchParam.indexOf(' ') !== -1) {
      searchParam = searchParam.replace(' ','%20');
    }
    recentQueryString += "+AND+(" + searchParam + ")";
  }

  console.log('query: ' + recentQueryString)

  var host = "api.fda.gov";
  var qrypath_food = "/food/enforcement.json?"+recentQueryString;
  var qrypath_drug = "/drug/enforcement.json?"+recentQueryString;
  var qrypath_device = "/device/enforcement.json?"+recentQueryString;

  var http = require('http');

  var recallResultsList = [];

  // Now perform the actual queries
  // Query Food API
  var qryReq = http.get({host: host, path: qrypath_device}, function(qryResp) {
    console.log('STATUS: ' + qryResp.statusCode);
    console.log('HEADERS: ' + JSON.stringify(qryResp.headers));

    // Buffer the body entirely for processing as a whole.
    var bodyChunks = [];
    qryResp.on('data', function(chunk) {
      // You can process streamed parts here...
      bodyChunks.push(chunk);
    }).on('end', function() {
      var body = JSON.parse(Buffer.concat(bodyChunks));
      var foodResults = body;
      console.log('BODY: ' + foodResults);
      // ...and/or process the entire body here.
      //recallResultsList.concat(foodResults);

      return res.json(200, JSON.stringify(foodResults));
    })
  });
};

// Get list of recalls
exports.getDrug = function(req, res) {
  //var sector = escape("FOOD");

  console.log('things.controller: Received: search PARAMS='+req.params.search);

  var baseQueryString = "api_key=97hexPQBqiRG7qeNL5LCubmalvKuWQIhCjnrOHLB&limit=100";

  var curDate = new Date();
  var yyyy = curDate.getFullYear();
  var mm = curDate.getMonth() < 9 ? "0" + (curDate.getMonth() + 1) : curDate.getMonth() + 1;
  var dd = curDate.getDate() < 10 ? "0" + (curDate.getDate() + 1) : curDate.getDate() + 1;
  var formattedCurDate = yyyy.toString() + mm.toString() + dd.toString();

  curDate.setDate(curDate.getDate() - 90);
  yyyy = curDate.getFullYear();
  mm = curDate.getMonth() < 9 ? "0" + (curDate.getMonth() + 1) : curDate.getMonth() + 1;
  dd = curDate.getDate() < 10 ? "0" + (curDate.getDate() + 1) : curDate.getDate() + 1;
  var formattedPrevDate = yyyy.toString() + mm.toString() + dd.toString();

  console.log(formattedPrevDate);
  console.log(formattedCurDate);
  var recentQueryString = baseQueryString + "&search=report_date:[" + formattedPrevDate + "+TO+" + formattedCurDate + "]";

  if(req.params.search !== undefined && req.params.search !== "") {
    var searchParam = req.params.search;
    while(searchParam.indexOf(' ') !== -1) {
      searchParam = searchParam.replace(' ','%20');
    }
    recentQueryString += "+AND+(" + searchParam + ")";
  }

  console.log('query: ' + recentQueryString)

  var host = "api.fda.gov";
  var qrypath_food = "/food/enforcement.json?"+recentQueryString;
  var qrypath_drug = "/drug/enforcement.json?"+recentQueryString;
  var qrypath_device = "/device/enforcement.json?"+recentQueryString;

  var http = require('http');

  var recallResultsList = [];

  // Now perform the actual queries
  // Query Food API
  var qryReq = http.get({host: host, path: qrypath_drug}, function(qryResp) {
    console.log('STATUS: ' + qryResp.statusCode);
    console.log('HEADERS: ' + JSON.stringify(qryResp.headers));

    // Buffer the body entirely for processing as a whole.
    var bodyChunks = [];
    qryResp.on('data', function(chunk) {
      // You can process streamed parts here...
      bodyChunks.push(chunk);
    }).on('end', function() {
      var body = JSON.parse(Buffer.concat(bodyChunks));
      var foodResults = body;
      console.log('BODY: ' + foodResults);
      // ...and/or process the entire body here.
      //recallResultsList.concat(foodResults);

      return res.json(200, JSON.stringify(foodResults));
    })
  });
};

function handleError(res, err) {
  return res.send(200, "Oops!");
}
