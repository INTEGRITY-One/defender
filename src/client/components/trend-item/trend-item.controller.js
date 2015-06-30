'use strict';

defender = defender || {};

angular.module('defenderApp')
  .controller('TrendItemCtrl', function ($scope, $http) {


    $scope.updateRssUI = function (className, idx, link, title, contentSnippet, publishedDate) {
      var el = $($(className).get(idx));
      if(el.length === 0 || link === undefined || title === undefined || contentSnippet === undefined || publishedDate === undefined) {
        return false;
      }

      el.append('<h4><a href="' + link + '" target="_blank">' + title + '</a></h4>');
      el.append('<p>' + contentSnippet + '</p>');
      el.append('<p>' + publishedDate + '</p>');

      return true;
    }

    $scope.parseRSS = function (url, callback) {
      $.ajax({
        url: document.location.protocol + '//ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=8&callback=?&q=' + encodeURIComponent(url),
        dataType: 'jsonp',
        success: function (data) {
          for (var i = 0; i < data.responseData.feed.entries.length; i++) {
            $('.prototype-news-item-container').parent().append("<div class='col-lg-3 prototype-news-item-container dynamic-news-item'>" + $('.prototype-news-item-container').html() + "</div>");

            $scope.updateRssUI('.news-item',
              (i + 1),
              data.responseData.feed.entries[i].link,
              data.responseData.feed.entries[i].title,
              data.responseData.feed.entries[i].contentSnippet,
              data.responseData.feed.entries[i].publishedDate);
          }
        }
      });
    };


    defender.queryNews = function() {
      $('.dynamic-news-item').remove();

      var rssTerm = defender.searchTerm;
      var trendTerm = defender.searchTerm;

      if (rssTerm === '' || trendTerm === '' || rssTerm === undefined || trendTerm === undefined) {
        if ($('#selector-food').hasClass('selected')) {
          rssTerm = 'food';
          trendTerm = 'food';
        }
        if ($('#selector-drug').hasClass('selected')) {
          rssTerm = 'drug';
          trendTerm = 'drug';
        }
        if ($('#selector-device').hasClass('selected')) {
          rssTerm = 'device';
          trendTerm = 'device';
        }
      }

      while (rssTerm.indexOf(' ') !== -1) {
        rssTerm = rssTerm.replace(' ', '+');
      }

      while (trendTerm.indexOf(' ') !== -1) {
        trendTerm = trendTerm.replace(' ', '%20');
      }

      $scope.parseRSS('https://news.google.com/news/feeds?pz=1&cf=all&ned=us&hl=us&q=' + rssTerm + '+recall&output=rss',null);
      $('#GEO_MAP_0_0').attr('src','https://www.google.com/trends/fetchComponent?q=' + trendTerm + '%20recall&cid=GEO_MAP_0_0&export=5&h=200');
      $('#GEO_MAP_0_1').attr('src','https://www.google.com/trends/fetchComponent?q=' + trendTerm + '%20recall&cid=GEO_MAP_0_1&export=5&h=200');
      $('#TOP_ENTITIES_0_0').attr('src','https://www.google.com/trends/fetchComponent?q=' + trendTerm + '%20recall&cid=TOP_ENTITIES_0_0&export=5&h=200');
      $('#TOP_QUERIES_0_0').attr('src','https://www.google.com/trends/fetchComponent?q=' + trendTerm + '%20recall&cid=TOP_QUERIES_0_0&export=5&h=200');
      $('#TIMESERIES_GRAPH_0').attr('src','https://www.google.com/trends/fetchComponent?q=' + trendTerm + '%20recall&cid=TIMESERIES_GRAPH_0&export=5&h=200');
      $('#GEO_TABLE_0_0').attr('src','https://www.google.com/trends/fetchComponent?q=' + trendTerm + '%20recall&cid=GEO_TABLE_0_0&export=5&h=200');


    };

    defender.queryNews();
  }
);
