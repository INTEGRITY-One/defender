'use strict';

var defender = defender || {};
defender.currentResults = [];

//list of affected states by acronym. note west virginia comes first to avoid conflict with virginia in parsing
defender.affectedStates = ['wv','al','ak','az','ar','ca','co','ct','de','fl','ga','hi','id','il','in','ia','ks','ky','la','me','md','ma','mi','mn','ms','mo','mt','ne','nv','nh','nj','nm','ny','nc','nd','oh','ok','or','pa','ri','sc','sd','tn','tx','ut','vt','va','wa','wi','wy'];
defender.affectedStatesSynonyms = [];
//synonyms for each state that could potentially show up in results
//0th is 'begins with' check, 1th is 'equality' check, remaining are inner text checks. xx\\ check to parse instances with \n
defender.affectedStatesSynonyms['wv'] = ['wv ','wv', 'west virginia',',wv,',' wv.',', wv.', ', wv,',' wv ','wv\\'];
defender.affectedStatesSynonyms['al'] = ['al ','al', 'alabama',',al,',' al.',', al.', ', al,',' al ','al\\'];
defender.affectedStatesSynonyms['ak'] = ['ak ','ak', 'alaska',',ak,',' ak.',', ak.', ', ak,',' ak ','ak\\'];
defender.affectedStatesSynonyms['az'] = ['az ','az', 'arizona',',az,',' az.',', az.', ', az,',' az ','az\\'];
defender.affectedStatesSynonyms['ar'] = ['ar ','ar', 'arkansas',',ar,',' ar.',', ar.', ', ar,',' ar ','ar\\'];
defender.affectedStatesSynonyms['ca'] = ['ca ','ca', 'california',',ca,',' ca.',', ca.', ', ca,',' ca ','ca\\'];
defender.affectedStatesSynonyms['co'] = ['co ','co', 'colorado',',co,',' co.',', co.', ', co,',' co ','co\\'];
defender.affectedStatesSynonyms['ct'] = ['ct ','ct', 'connecticut',',ct,',' ct.',', ct.', ', ct,',' ct ','ct\\'];
defender.affectedStatesSynonyms['de'] = ['de ','de', 'delaware',',de,',' de.',', de.', ', de,',' de ','de\\'];
defender.affectedStatesSynonyms['fl'] = ['fl ','fl', 'florida',',fl,',' fl.',', fl.', ', fl,',' fl ','fl\\'];
defender.affectedStatesSynonyms['ga'] = ['ga ','ga', 'georgia',',ga,',' ga.',', ga.', ', ga,',' ga ','ga\\'];
defender.affectedStatesSynonyms['hi'] = ['hi ','hi', 'hawaii',',hi,',' hi.',', hi.', ', hi,',' hi ','hi\\'];
defender.affectedStatesSynonyms['id'] = ['id ','id', 'idaho',',id,',' id.',', id.', ', id,',' id ','id\\'];
defender.affectedStatesSynonyms['il'] = ['il ','il', 'illinois',',il,',' il.',', il.', ', il,',' il ','il\\'];
defender.affectedStatesSynonyms['in'] = ['in ','in', 'indiana',',in,',' in.',', in.', ', in,','in\\'];
defender.affectedStatesSynonyms['ia'] = ['ia ','ia', 'iowa',',ia,',' ia.',', ia.', ', ia,',' ia ','ia\\'];
defender.affectedStatesSynonyms['ks'] = ['ks ','ks', 'kansas',',ks,',' ks.',', ks.', ', ks,',' ks ','ks\\'];
defender.affectedStatesSynonyms['ky'] = ['ky ','ky', 'kentucky',',ky,',' ky.',', ky.', ', ky,',' ky ','ky\\'];
defender.affectedStatesSynonyms['la'] = ['la ','la', 'louisiana',',la,',' la.',', la.', ', la,',' la ','la\\'];
defender.affectedStatesSynonyms['me'] = ['me ','me', 'maine',',me,',' me.',', me.', ', me,',' me ','me\\'];
defender.affectedStatesSynonyms['md'] = ['md ','md', 'maryland',',md,',' md.',', md.', ', md,',' md ','md\\'];
defender.affectedStatesSynonyms['ma'] = ['ma ','ma', 'massachusetts',',ma,',' ma.',', ma.', ', ma,',' ma ','ma\\'];
defender.affectedStatesSynonyms['mi'] = ['mi ','mi', 'michigan',',mi,',' mi.',', mi.', ', mi,',' mi ','mi\\'];
defender.affectedStatesSynonyms['mn'] = ['mn ','mn', 'minnesota',',mn,',' mn.',', mn.', ', mn,',' mn ','mn\\'];
defender.affectedStatesSynonyms['ms'] = ['ms ','ms', 'mississippi',',ms,',' ms.',', ms.', ', ms,',' ms ','ms\\'];
defender.affectedStatesSynonyms['mo'] = ['mo ','mo', 'missouri',',mo,',' mo.',', mo.', ', mo,',' mo ','mo\\'];
defender.affectedStatesSynonyms['mt'] = ['mt ','mt', 'montana',',mt,',' mt.',', mt.', ', mt,',' mt ','mt\\'];
defender.affectedStatesSynonyms['ne'] = ['ne ','ne', 'nebraska',',ne,',' ne.',', ne.', ', ne,',' ne ','ne\\'];
defender.affectedStatesSynonyms['nv'] = ['nv ','nv', 'nevada',',nv,',' nv.',', nv.', ', nv,',' nv ','nv\\'];
defender.affectedStatesSynonyms['nh'] = ['nh ','nh', 'new hampshire',',nh,',' nh.',', nh.', ', nh,',' nh ','nh\\'];
defender.affectedStatesSynonyms['nj'] = ['nj ','nj', 'new jersey',',nj,',' nj.',', nj.', ', nj,',' nj ','nj\\'];
defender.affectedStatesSynonyms['nm'] = ['nm ','nm', 'new mexico',',nm,',' nm.',', nm.', ', nm,',' nm ','nm\\'];
defender.affectedStatesSynonyms['ny'] = ['ny ','ny', 'new york',',ny,',' ny.',', ny.', ', ny,',' ny ','ny\\'];
defender.affectedStatesSynonyms['nc'] = ['nc ','nc', 'north carolina',',nc,',' nc.',', nc.', ', nc,',' nc ','nc\\'];
defender.affectedStatesSynonyms['nd'] = ['nd ','nd', 'north dakota',',nd,',' nd.',', nd.', ', nd,',' nd ','nd\\'];
defender.affectedStatesSynonyms['oh'] = ['oh ','oh', 'ohio',',oh,',' oh.',', oh.', ', oh,',' oh ','oh\\'];
defender.affectedStatesSynonyms['ok'] = ['ok ','ok', 'oklahoma',',ok,',' ok.',', ok.', ', ok,',' ok ','ok\\'];
defender.affectedStatesSynonyms['or'] = ['or ','or', 'oregon',',or,',' or.',', or.', ', or,',' or ','or\\'];
defender.affectedStatesSynonyms['pa'] = ['pa ','pa', 'pennsylvania',',pa,',' pa.',', pa.', ', pa,','pa\\'];
defender.affectedStatesSynonyms['ri'] = ['ri ','ri', 'rhode island',',ri,',' ri.',', ri.', ', ri,',' ri ','ri\\'];
defender.affectedStatesSynonyms['sc'] = ['sc ','sc', 'south carolina',',sc,',' sc.',', sc.', ', sc,',' sc ','sc\\'];
defender.affectedStatesSynonyms['sd'] = ['sd ','sd', 'south dakota',',sd,',' sd.',', sd.', ', sd,',' sd ','sd\\'];
defender.affectedStatesSynonyms['tn'] = ['tn ','tn', 'tennessee',',tn,',' tn.',', tn.', ', tn,',' tn ','tn\\'];
defender.affectedStatesSynonyms['tx'] = ['tx ','tx', 'texas',',tx,',' tx.',', tx.', ', tx,',' tx ','tx\\'];
defender.affectedStatesSynonyms['ut'] = ['ut ','ut', 'utah',',ut,',' ut.',', ut.', ', ut,',' ut ','ut\\'];
defender.affectedStatesSynonyms['vt'] = ['vt ','vt', 'vermont',',vt,',' vt.',', vt.', ', vt,',' vt ','vt\\'];
defender.affectedStatesSynonyms['va'] = ['va ','va', 'virginia',',va,',' va.',', va.', ', va,',' va ','va\\'];
defender.affectedStatesSynonyms['wa'] = ['wa ','wa', 'washington',',wa,',' wa.',', wa.', ', wa,',' wa ','wa\\'];
defender.affectedStatesSynonyms['wi'] = ['wi ','wi', 'wisconsin',',wi,',' wi.',', wi.', ', wi,',' wi ','wi\\'];
defender.affectedStatesSynonyms['wy'] = ['wy ','wy', 'wyoming',',wy,',' wy.',', wy.', ', wy,',' wy ','wy\\'];
//list of foreign countries
defender.affectedForeignCountries = ['afghanistan','albania','algeria','andorra','angola','antigua and barbuda','argentina','armenia','aruba','australia','austria','azerbaijan'];
defender.affectedForeignCountries = defender.affectedForeignCountries.concat(['bahamas','bahrain','bangladesh','barbados','belarus','belgium','belize','benin','bhutan','bolivia','bosnia and herzegovina','botswana','brazil','brunei','bulgaria','burkina faso','burma','burundi']);
defender.affectedForeignCountries = defender.affectedForeignCountries.concat(['cambodia','cameroon','canada','cape verde','central african republic','chad','chile','china','columbia','comoros','democratic republic of congo','republic of congo','costa rica','cote d\'ivoire','croatia','cuba','curacao','cyprus','czech republic']);
defender.affectedForeignCountries = defender.affectedForeignCountries.concat(['denmark','djibouti','dominican republic','dominica']);
defender.affectedForeignCountries = defender.affectedForeignCountries.concat(['east timor','ecuador','egypt','el salvador','equatorial guinea','eritrea','estonia','ethiopia']);
defender.affectedForeignCountries = defender.affectedForeignCountries.concat(['fiji','finland','france']);
defender.affectedForeignCountries = defender.affectedForeignCountries.concat(['gabon','gambia','georgia','germany','ghana','greece','grenada','guatemala','guinea-bissau','papua new guinea','guinea','guyana']);
defender.affectedForeignCountries = defender.affectedForeignCountries.concat(['haiti','holy see','honduras','hong kong','hungary']);
defender.affectedForeignCountries = defender.affectedForeignCountries.concat(['iceland','india','indonesia','iran','iraq','ireland','israel','italy']);
defender.affectedForeignCountries = defender.affectedForeignCountries.concat(['jamaica','japan','jordan']);
defender.affectedForeignCountries = defender.affectedForeignCountries.concat(['kazakhstan','kenya','kiribati','north korea','south korea','kosovo','kuwait','kyrgyzstan']);
defender.affectedForeignCountries = defender.affectedForeignCountries.concat(['laos','latvia','lebanon','lesotho','liberia','libya','liechtenstein','lithuania','luxembourg']);
defender.affectedForeignCountries = defender.affectedForeignCountries.concat(['macau','macedonia','madagascar','malawi','malaysia','maldives','mali','malta','marshall islands','mauritania','mexico','micronesia','moldova','monaco','mongolia','montenegro','morocco','mozambique']);
defender.affectedForeignCountries = defender.affectedForeignCountries.concat(['namibia','nauru','nepal','netherlands antilles','netherlands','new zealand','nicaragua','nigeria','niger','norway']);
defender.affectedForeignCountries = defender.affectedForeignCountries.concat(['oman']);
defender.affectedForeignCountries = defender.affectedForeignCountries.concat(['pakistan','palau','palestinian territories','panama','paraguay','peru','philipines','poland','portugal']);
defender.affectedForeignCountries = defender.affectedForeignCountries.concat(['qatar']);
defender.affectedForeignCountries = defender.affectedForeignCountries.concat(['romania','russia','rwanda']);
defender.affectedForeignCountries = defender.affectedForeignCountries.concat(['saint kitts and nevis','saint lucia','saint vincent and the grenadines','samoa','san  marino','sao tome and principe','saudi arabia','senegal','serbia','seychelles','sierra leone','singapore','sint maarten','slovakia','slovenia','solomon islands','somalia','south africa','south sudan','spain','sri lanka','sudan','suriname','swaziland','sweden','switzerland','syria']);
defender.affectedForeignCountries = defender.affectedForeignCountries.concat(['taiwan','tajikistan','tanzania','thailand','timor-leste','togo','tonga','trinidad and tobago','tunisia','turkey','turkmenistan','tuvalu']);
defender.affectedForeignCountries = defender.affectedForeignCountries.concat(['uganda','ukraine','united arab emirates','united kimgdom','uruguay','uzbekistan']);
defender.affectedForeignCountries = defender.affectedForeignCountries.concat(['vanuatu','venezuela','vietnam']);
defender.affectedForeignCountries = defender.affectedForeignCountries.concat(['yemen']);
defender.affectedForeignCountries = defender.affectedForeignCountries.concat(['zambia','zimbabwe']);

defender.updateAffectedAreaValues = function() {
  for(var i = 0; i < defender.affectedStates.length; i++) {
    defender.affectedStates[defender.affectedStates[i]] = 0;
  }
  for(var i = 0; i < defender.affectedForeignCountries.length; i++) {
    defender.affectedForeignCountries[defender.affectedForeignCountries[i]] = 0;
  }

  for(var i = 0; i < defender.currentResults.length; i++) {
    var result = defender.currentResults[i]['distribution_pattern'].toLowerCase();
    var parsedResult = result;
    var stateDetected = false;

    //worldwide check, however this does not appear to be a valid case
    if(result.indexOf('worldwide') !== -1 && 1==2) {
      for (var j = 0; j < defender.affectedStates.length; j++) {
        defender.affectedStates[defender.affectedStates[j]]++;
      }
      for (var j = 0; j < defender.affectedForeignCountries.length; j++) {
        defender.affectedForeignCountries[defender.affectedForeignCountries[j]]++;
      }
    }

    //state check
    for (var j = 0; j < defender.affectedStates.length; j++) {
      parsedResult = defender.updateAffectedAreaStateParse(result, defender.affectedStates[j]);
      if (parsedResult !== result) {
        defender.affectedStates[defender.affectedStates[j]]++;
        result = parsedResult;
        stateDetected = true;
      }
    }

    //us check if states were NOT found, implying it could be listed as just a nationwide recall
    if(!stateDetected) {
      if (result.indexOf('united states') !== -1 ||
        result.indexOf('nationwide') !== -1 ||
        result.indexOf('u.s.') !== -1 ||
        result.indexOf(' us ') !== -1 ||
        result.indexOf(',us,') !== -1 ||
        result.indexOf(', us,') !== -1 ||
        result.indexOf(', us.') !== -1 ||
        result.substr(2) === 'us') {
        for (var j = 0; j < defender.affectedStates.length; j++) {
          defender.affectedStates[defender.affectedStates[j]]++;
        }
      }
    }

    //foreign check
    for(var j = 0; j < defender.affectedForeignCountries.length; j++) {
      if(result.indexOf(defender.affectedForeignCountries[j]) !== -1) {
        defender.affectedForeignCountries[defender.affectedForeignCountries[j]]++;
        result = result.replace(defender.affectedForeignCountries[j],'');
      }
    }
  }
};

defender.updateAffectedAreaStateParse = function(text, state) {

  //if text begins with acronym synonym
  if(text.length >= defender.affectedStatesSynonyms[state][0].length) {
    if (text.substr(defender.affectedStatesSynonyms[state][0].length) === defender.affectedStatesSynonyms[state][0]) {
      text = text.replace(defender.affectedStatesSynonyms[state][i], '');
      return text;
    }
  }

  //if text is just the acronym synonym
  if(text === defender.affectedStatesSynonyms[state][1]) {
    text = text.replace(defender.affectedStatesSynonyms[state][i],'');
    return text;
  }

  //if synonyms in text
  for(var i = 2; i < defender.affectedStatesSynonyms[state].length; i++) {
    if(text.indexOf(defender.affectedStatesSynonyms[state][i]) !== -1) {
      text = text.replace(defender.affectedStatesSynonyms[state][i],'');
      return text;
    }
  }

  return text;
}

angular.module('defenderApp')
  .controller('ResultsAreaCtrl', function ($scope, $http) {
    //this file pull data from server and populate bootstrap grid on client

    //on error
    $scope.errorHappenedResultsArea = false;
    $scope.currSearchTerm = "";

    //pagination (deprec)
    $scope.skip = 30;
    $scope.pageSize = 10;
    $scope.totalPages = 0;
    $scope.currentPage = 1;
    $scope.recallResultsList = [];
    $scope.showInfoIsVisible = false;

    $scope.getApiSearchTermFood = function() {
      $http.get('/api/things/food/reason_for_recall:"' + $scope.currSearchTerm + '"+product_description:"' + $scope.currSearchTerm + '"+recalling_firm:"' + $scope.currSearchTerm + '"')
        .success(function (recallResultsList) {
          var response = JSON.parse(recallResultsList);
          var results = response.results;
          $scope.totalPages = Math.ceil(response.meta.results.total / $scope.pageSize);
          $scope.recallResultsList = results;
          defender.currentResults = results; //for map
          $('#big-query-text-value').text(response.meta.results.total);
          $('#big-query-text-label').text('"' + $scope.currSearchTerm + '" food recalls in the past 90 days');
          $scope.formatDates();
          defender.updateAffectedAreaValues();
        })
        .error(function () {
          $scope.errorHappenedResultsArea = true;
        });
    };

    $scope.getApiSearchTermDrug = function() {
      $http.get('/api/things/drug/reason_for_recall:"' + $scope.currSearchTerm + '"+product_description:"' + $scope.currSearchTerm + '"+recalling_firm:"' + $scope.currSearchTerm + '"')
        .success(function (recallResultsList) {
          var response = JSON.parse(recallResultsList);
          var results = response.results;
          $scope.totalPages = Math.ceil(response.meta.results.total / $scope.pageSize);
          $scope.recallResultsList = results;
          defender.currentResults = results; //for map
          $('#big-query-text-value').text(response.meta.results.total);
          $('#big-query-text-label').text('"' + $scope.currSearchTerm + '" drug recalls in the past 90 days');
          $scope.formatDates();
          defender.updateAffectedAreaValues();
        })
        .error(function () {
          $scope.errorHappenedResultsArea = true;
        });
    };

    $scope.getApiSearchTermDevice = function() {
      $http.get('/api/things/device/reason_for_recall:"' + $scope.currSearchTerm + '"+product_description:"' + $scope.currSearchTerm + '"+recalling_firm:"' + $scope.currSearchTerm + '"')
        .success(function (recallResultsList) {
          var response = JSON.parse(recallResultsList);
          var results = response.results;
          $scope.totalPages = Math.ceil(response.meta.results.total / $scope.pageSize);
          $scope.recallResultsList = results;
          defender.currentResults = results; //for map
          $('#big-query-text-value').text(response.meta.results.total);
          $('#big-query-text-label').text('"' + $scope.currSearchTerm + '" device recalls in the past 90 days');
          $scope.formatDates();
          defender.updateAffectedAreaValues();
        })
        .error(function () {
          $scope.errorHappenedResultsArea = true;
        });
    };

    $scope.getApiFood = function() {
      $http.get('/api/things/food')
        .success(function (recallResultsList) {
          var response = JSON.parse(recallResultsList);
          var results = response.results;
          $scope.totalPages = Math.ceil(response.meta.results.total / $scope.pageSize);
          $scope.recallResultsList = results;
          defender.currentResults = results; //for map
          $('#big-query-text-value').text(response.meta.results.total);
          $('#big-query-text-label').text('food recalls in the past 90 days');
          $scope.formatDates();
          defender.updateAffectedAreaValues();
        })
        .error(function () {
          $scope.errorHappenedResultsArea = true;
        });
    };

    $scope.getApiDrug = function() {
      $http.get('/api/things/drug')
        .success(function (recallResultsList) {
          var response = JSON.parse(recallResultsList);
          var results = response.results;
          $scope.totalPages = Math.ceil(response.meta.results.total / $scope.pageSize);
          $scope.recallResultsList = results; //view-scoped
          defender.currentResults = results; //for map and other controllers
          $('#big-query-text-value').text(response.meta.results.total);
          $('#big-query-text-label').text('drug recalls in the past 90 days');
          $scope.formatDates();
          defender.updateAffectedAreaValues();
        })
        .error(function () {
          $scope.errorHappenedResultsArea = true;
        });
    };

    $scope.getApiDevice = function() {
      $http.get('/api/things/device')
        .success(function (recallResultsList) {
          var response = JSON.parse(recallResultsList);
          var results = response.results;
          $scope.totalPages = Math.ceil(response.meta.results.total / $scope.pageSize);
          $scope.recallResultsList = results;
          defender.currentResults = results; //for map
          $('#big-query-text-value').text(response.meta.results.total);
          $('#big-query-text-label').text('device recalls in the past 90 days');
          $scope.formatDates();
          defender.updateAffectedAreaValues();
        })
        .error(function () {
          $scope.errorHappenedResultsArea = true;
        });
    };

    //on page init, get food data
    $scope.getApiFood();

    $scope.formatDates = function() {
      for(var i = 0; i < defender.currentResults.length; i++) {
        defender.currentResults[i]['report_date'] = $scope.formatDate(defender.currentResults[i]['report_date'])
        defender.currentResults[i]['recall_initiation_date'] = $scope.formatDate(defender.currentResults[i]['recall_initiation_date'])
      }
    }

    $scope.formatDate = function(unformattedDate) {
      if(unformattedDate.length !== 8) {
        return unformattedDate;
      }
      var yyyy = unformattedDate.substr(0,4);
      var mm = unformattedDate.substr(4,2);
      var dd = unformattedDate.substr(6,2);
      return mm + '/' + dd + '/' + yyyy;
    }

    //poll for search implication
    window.setInterval(function() {
      if(defender.searchTerm !== $scope.currSearchTerm) {
        $scope.currSearchTerm = defender.searchTerm;

        if(defender.searchTerm === '_execFood') {
          defender.searchTerm = '';
          $scope.currSearchTerm = '';
        }
        if(defender.searchTerm === '_execDrug') {
          defender.searchTerm = '';
          $scope.currSearchTerm = '';
        }
        if(defender.searchTerm === '_execDevice') {
          defender.searchTerm = '';
          $scope.currSearchTerm = '';
        }

        defender.queryNews();

        if($scope.currSearchTerm !== "") {
          $('#big-query-text-value').text("0");
          $scope.recallResultsList = [];

          if($('#selector-food').hasClass('selected')) {
            $('#big-query-text-label').text('"' + $scope.currSearchTerm + '" food recalls in the past 90 days');
            $scope.getApiSearchTermFood();
          }
          else if($('#selector-drug').hasClass('selected')) {
            $('#big-query-text-label').text('"' + $scope.currSearchTerm + '" drug recalls in the past 90 days');
            $scope.getApiSearchTermDrug();
            console.log('called drug')
          }
          else if($('#selector-device').hasClass('selected')) {
            $('#big-query-text-label').text('"' + $scope.currSearchTerm + '" device recalls in the past 90 days');
            $scope.getApiSearchTermDevice();
          }
        }
        else {
          if($('#selector-food').hasClass('selected')) {
            $scope.getApiFood();
          }
          else if($('#selector-drug').hasClass('selected')) {
            $scope.getApiDrug();
          }
          else if($('#selector-device').hasClass('selected')) {
            $scope.getApiDevice();
          }
        }
      }
    },500);

    $scope.showMoreInfo = function(idx) {
      if(idx >= $scope.recallResultsList.length) {
        return false;
      }

      $('#showMoreModalTitle').text('Recall #' + $scope.recallResultsList[idx]['recall_number']);
      $('#text_reason_for_recall').text($scope.recallResultsList[idx]['reason_for_recall']);
      $('#text_status').text($scope.recallResultsList[idx]['status']);
      $('#text_distribution_pattern').text($scope.recallResultsList[idx]['distribution_pattern']);
      $('#text_product_quantity').text($scope.recallResultsList[idx]['product_quantity']);
      $('#text_recall_initiation_date').text($scope.recallResultsList[idx]['recall_initiation_date']);
      $('#text_state').text($scope.recallResultsList[idx]['state']);
      $('#text_product_type').text($scope.recallResultsList[idx]['product_type']);
      $('#text_event_id').text($scope.recallResultsList[idx]['event_id']);
      $('#text_product_description').text($scope.recallResultsList[idx]['product_description']);
      $('#text_country').text($scope.recallResultsList[idx]['country']);
      $('#text_city').text($scope.recallResultsList[idx]['city']);
      $('#text_recalling_firm').text($scope.recallResultsList[idx]['recalling_firm']);
      $('#text_report_date').text($scope.recallResultsList[idx]['report_date']);
      $('#text_voluntary_mandated').text($scope.recallResultsList[idx]['voluntary_mandated']);
      $('#text_classification').text($scope.recallResultsList[idx]['classification']);
      $('#text_code_info').text($scope.recallResultsList[idx]['code_info']);
      $('#text_initial_firm_notification').text($scope.recallResultsList[idx]['initial_firm_notification']);

      return true;
    }

    //deprec
    $scope.nextPage = function() {
      $scope.currentPage = $scope.currentPage + 1;
      $scope.skip = $scope.skip + 10;
      $scope.getApi();
      console.log($scope.skip)
    }
  });

/**
 * Ng-Repeat implementation working with number ranges.
 *
 * @author Umed Khudoiberdiev
 */
angular.module('defenderApp').directive('ngRepeatRange', ['$compile', function ($compile) {
  return {
    replace: true,
    scope: { from: '=', to: '=', step: '=' },

    link: function (scope, element, attrs) {

      // returns an array with the range of numbers
      // you can use _.range instead if you use underscore
      function range(from, to, step) {
        var array = [];
        while (from + step <= to)
          array[array.length] = from += step;

        return array;
      }

      // prepare range options
      var from = scope.from || 0;
      var step = scope.step || 1;
      var to   = scope.to || attrs.ngRepeatRange;

      // get range of numbers, convert to the string and add ng-repeat
      var rangeString = range(from, to + 1, step).join(',');
      angular.element(element).attr('ng-repeat', 'n in [' + rangeString + ']');
      angular.element(element).removeAttr('ng-repeat-range');

      $compile(element)(scope);
    }
  };
}]);
