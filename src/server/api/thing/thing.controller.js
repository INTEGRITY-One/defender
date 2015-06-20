/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /things              ->  index
 * POST    /things              ->  create
 * GET     /things/:id          ->  show
 * PUT     /things/:id          ->  update
 * DELETE  /things/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var _http = require('http');

// Get list of recalls
exports.index = function(req, res) {
  //var sector = escape("FOOD");
  console.log('things.controller: Received: PARAMS='+req.params);

  //var shortDesc = escape("CHICKENS, (EXCL BROILERS) - INVENTORY");
  //var shortDesc = escape(req.params.commodity);
  //var searchQueryString = "api_key=97hexPQBqiRG7qeNL5LCubmalvKuWQIhCjnrOHLB&search=reason_for_recall:ice+cream";
  var recentQueryString = "api_key=97hexPQBqiRG7qeNL5LCubmalvKuWQIhCjnrOHLB&search=report_date:[2015-05-20+TO+2015-06-20]";
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
  var recallResultsList;

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
      var foodResults = JSON.parse(Buffer.concat(bodyChunks));

      console.log('BODY: ' + JSON.stringify(foodResults.results));
      // ...and/or process the entire body here.
      recallResultsList = foodResults;
      return res.json(200, JSON.stringify(recallResultsList));
    })
  });
  // Query Drug API
  qryReq = http.get({host: host, path: qrypath_drug}, function(qryResp) {
    console.log('STATUS: ' + qryResp.statusCode);
    console.log('HEADERS: ' + JSON.stringify(qryResp.headers));

    // Buffer the body entirely for processing as a whole.
    var bodyChunks = [];
    qryResp.on('data', function(chunk) {
      // You can process streamed parts here...
      bodyChunks.push(chunk);
    }).on('end', function() {
      var drugResults = JSON.parse(Buffer.concat(bodyChunks));

      console.log('BODY: ' + JSON.stringify(drugResults.results));
      // ...and/or process the entire body here.
      recallResultsList = drugResults;

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
      var deviceResults = JSON.parse(Buffer.concat(bodyChunks));

      console.log('BODY: ' + JSON.stringify(deviceResults.results));
      // ...and/or process the entire body here.
      recallResultsList = deviceResults;

    })
  });

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
  return res.send(500, "Oops!");
}
