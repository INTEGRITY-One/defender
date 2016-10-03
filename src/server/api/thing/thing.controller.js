/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /things              ->  index
 * GET     /things/:id          ->  show
 */

'use strict';

var _ = require('lodash');
var _http = require('http');

var formatDate = function(date) {
  var yyyy = date.getFullYear();
  var mm = date.getMonth() < 9 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
  var dd = date.getDate() < 10 ? "0" + (date.getDate()) : date.getDate();
  return yyyy.toString() + mm.toString() + dd.toString();
}

// Get list of recalls
exports.index = function(req, res) {
  //var sector = escape("FOOD");

  console.log('things.controller: Received: search PARAMS='+req.params.search);

  var baseQueryString = "api_key=97hexPQBqiRG7qeNL5LCubmalvKuWQIhCjnrOHLB&limit=100";

  var curDate = new Date();
  var formattedCurDate = formatDate(curDate);
  curDate.setDate(curDate.getDate() - 90);
  var formattedPrevDate = formatDate(curDate);

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
exports.getFood = function(req, res) {
  //var sector = escape("FOOD");

  console.log('things.controller: Received: search PARAMS='+req.params.search);

  var baseQueryString = "api_key=97hexPQBqiRG7qeNL5LCubmalvKuWQIhCjnrOHLB&limit=100";

  var curDate = new Date();
  var formattedCurDate = formatDate(curDate);
  curDate.setDate(curDate.getDate() - 90);
  var formattedPrevDate = formatDate(curDate);

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

  var https = require('https');

  var recallResultsList = [];

  // Now perform the actual queries
  // Query Food API
  var qryReq = https.get({host: host, path: qrypath_food}, function(qryResp) {
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
  var formattedCurDate = formatDate(curDate);
  curDate.setDate(curDate.getDate() - 90);
  var formattedPrevDate = formatDate(curDate);

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
  var formattedCurDate = formatDate(curDate);
  curDate.setDate(curDate.getDate() - 90);
  var formattedPrevDate = formatDate(curDate);

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
