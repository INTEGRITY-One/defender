/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /things              ->  index
 * GET     /things/:id          ->  show
 */

'use strict';

var _ = require('lodash');
var _http = require('http');

// Get list of recalls
exports.index = function(req, res) {
  //var sector = escape("FOOD");
  console.log('things.controller: Received: PARAMS='+req.params.toString());
  console.log('things.controller: Received: PARAMS='+req.params.skip);
  var skipcount = "0";
  var testval = req.params;
  if (testval.length > 0)
    skipcount = testval.get("skip");
  //var shortDesc = escape("CHICKENS, (EXCL BROILERS) - INVENTORY");
  //var shortDesc = escape(req.params.commodity);
  //var searchQueryString = "api_key=97hexPQBqiRG7qeNL5LCubmalvKuWQIhCjnrOHLB&search=reason_for_recall:ice+cream";
  var baseQueryString = "api_key=97hexPQBqiRG7qeNL5LCubmalvKuWQIhCjnrOHLB&limit=10&skip=" + skipcount;

  var curDate = new Date();
  var yyyy = curDate.getFullYear();
  var mm = curDate.getMonth() < 9 ? "0" + (curDate.getMonth() + 1) : curDate.getMonth() + 1;
  var dd = curDate.getDate() < 10 ? "0" + (curDate.getDate() + 1) : curDate.getDate() + 1;
  var formattedCurDate = yyyy.toString() + mm.toString() + dd.toString();

  curDate.setDate(curDate.getDate() - 30);
  yyyy = curDate.getFullYear();
  mm = curDate.getMonth() < 9 ? "0" + (curDate.getMonth() + 1) : curDate.getMonth() + 1;
  dd = curDate.getDate() < 10 ? "0" + (curDate.getDate() + 1) : curDate.getDate() + 1;
  var formattedPrevDate = yyyy.toString() + mm.toString() + dd.toString();

  console.log(formattedPrevDate);
  console.log(formattedCurDate);
  var recentQueryString = baseQueryString + "&search=report_date:[" + formattedPrevDate + "+TO+" + formattedCurDate + "]";

  var host = "api.fda.gov";
  var qrypath_food = "/food/enforcement.json?"+recentQueryString;
  var qrypath_drug = "/drug/enforcement.json?"+recentQueryString;
  var qrypath_device = "/device/enforcement.json?"+recentQueryString;
  //var cntpath = "/api/api_GET/?"+queryString;
  var http = require('http');

  // See how many recs will bbe returned
  //var cntReq = http.get({host: host, path: cntpath}, function(cntResp) {
    /*console.log('STATUS: ' + cntResp.statusCode);
     console.log('HEADERS: ' + JSON.stringify(cntResp.headers));*/

    // Buffer the body entirely for processing as a whole.
    /*var bodyChunks = [];
    cntResp.on('data', function(chunk) {
      // You can process streamed parts here...
      bodyChunks.push(chunk);
    }).on('end', function() {
      var body = Buffer.concat(bodyChunks);
      //console.log('BODY: ' + body);

      var jbody = JSON.parse(body);
      console.log('livestock.controller: There are %d records matching the criteria', jbody.count);
    })
  });*/
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

  // Query Drug API
  /*qryReq = http.get({host: host, path: qrypath_drug}, function(qryResp) {
    console.log('STATUS: ' + qryResp.statusCode);
    console.log('HEADERS: ' + JSON.stringify(qryResp.headers));

    // Buffer the body entirely for processing as a whole.
    var bodyChunks = [];
    qryResp.on('data', function(chunk) {
      // You can process streamed parts here...
      bodyChunks.push(chunk);
    }).on('end', function() {
      var body = JSON.parse(Buffer.concat(bodyChunks));
      var drugResults = body.results;
      console.log('BODY: ' + JSON.stringify(drugResults));
      // ...and/or process the entire body here.
      recallResultsList.concat(drugResults);

    })
  });
  // Query Device API
  qryReq = http.get({host: host, path: qrypath_device}, function(qryResp) {
    console.log('STATUS: ' + qryResp.statusCode);
    console.log('HEADERS: ' + JSON.stringify(qryResp.headers));

    // Buffer the body entirely for processing as a whole.
    var bodyChunks = [];
    qryResp.on('data', function(chunk) {
      // You can process streamed parts here...
      bodyChunks.push(chunk);
    }).on('end', function() {
      var body = JSON.parse(Buffer.concat(bodyChunks));
      var deviceResults = body.results;
      console.log('BODY: ' + JSON.stringify(deviceResults));
      // ...and/or process the entire body here.
      recallResultsList.concat(deviceResults);

      //return res.json(200, JSON.stringify(recallResultsList));
    })
  });*/

  //if (err) return handleError(err);
  // Continue if there are no errors...
  //console.log("retrieved data: " + recallResultsList);
  //return res.json(200, JSON.stringify(recallResultsList));


  /*  console.log('livestock.controller: There are %d records matching the criteria', data);
   console.log('retrieved data: ' + livestockData);
   return res.json(200, livestockData);*/
};

// Get list of distinct Commodity values
/*exports.distinct = function(req, res) {
  console.log('livestock.controller: Received: field='+req.params.field);

  return res.json(200, [ "CHICKENS, (EXCL BROILERS) - INVENTORY" ]);
  /*Empl.distinct( req.params.field, null, function (err, distinctEmpls) {
   if (err) return handleError(err);
   // Continue if there are no errors...
   return res.json(200, distinctEmpls);
   });*/
//};

function handleError(res, err) {
  return res.send(200, "Oops!");
}
