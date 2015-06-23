'use strict';

defender = defender || {};

angular.module('defenderApp')
  .controller('TrendItemCtrl', function ($scope, $http) {

    defender.queryNews = function() {
      $('.dynamic-news-item').remove();

      var parseRSS = function (url, callback) {
        $.ajax({
          url: document.location.protocol + '//ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=8&callback=?&q=' + encodeURIComponent(url),
          dataType: 'jsonp',
          success: function (data) {
            console.log('data: ' + data.responseData.feed.entries[0]);

            for (var i = 0; i < data.responseData.feed.entries.length; i++) {

              //sorry!
              $('.prototype-news-item-container').parent().append("<div class='col-lg-3 prototype-news-item-container dynamic-news-item'>" + $('.prototype-news-item-container').html() + "</div>");

              $($('.news-item').get(i + 1)).append('<h4><a href="' + data.responseData.feed.entries[i].link + '" target="_blank">' + data.responseData.feed.entries[i].title + '</a></h4>');
              $($('.news-item').get(i + 1)).append('<p>' + data.responseData.feed.entries[i].contentSnippet + '</p>');
              $($('.news-item').get(i + 1)).append('<p>' + data.responseData.feed.entries[i].publishedDate + '</p>');
            }
          }
        });
      };

      var qterm = defender.searchTerm;
      var gterm = defender.searchTerm;
      if (qterm !== undefined) {
        while (qterm.indexOf(' ') !== -1) {
          qterm = qterm.replace(' ', '+')
        }
      }
      if (gterm !== undefined) {
        while (gterm.indexOf(' ') !== -1) {
          gterm = gterm.replace(' ', '%20')
        }
      }

      if (qterm === '' || gterm === '') {
        if ($('#selector-food').hasClass('selected')) {
          qterm = 'food';
          gterm = 'food';
        }
        if ($('#selector-drug').hasClass('selected')) {
          qterm = 'drug';
          gterm = 'drug';
        }
        if ($('#selector-device').hasClass('selected')) {
          qterm = 'device';
          gterm = 'device';
        }
      }
      else {
        if ($('#selector-food').hasClass('selected')) {
          qterm = 'food';
          gterm = 'food';
        }
        if ($('#selector-drug').hasClass('selected')) {
          qterm = 'drug';
          gterm = 'drug';
        }
        if ($('#selector-device').hasClass('selected')) {
          qterm = 'device';
          gterm = 'device';
        }
      }

      parseRSS('https://news.google.com/news/feeds?pz=1&cf=all&ned=us&hl=us&q=' + qterm + '+recall&output=rss',null);
      $('#GEO_MAP_0_0').attr('src','http://www.google.com/trends/fetchComponent?q=' + gterm + '%20recall&cid=GEO_MAP_0_0&export=5&h=200');
      $('#GEO_MAP_0_1').attr('src','http://www.google.com/trends/fetchComponent?q=' + gterm + '%20recall&cid=GEO_MAP_0_1&export=5&h=200');
      $('#TOP_ENTITIES_0_0').attr('src','http://www.google.com/trends/fetchComponent?q=' + gterm + '%20recall&cid=TOP_ENTITIES_0_0&export=5&h=200');
      $('#TOP_QUERIES_0_0').attr('src','http://www.google.com/trends/fetchComponent?q=' + gterm + '%20recall&cid=TOP_QUERIES_0_0&export=5&h=200');
      $('#TIMESERIES_GRAPH_0').attr('src','http://www.google.com/trends/fetchComponent?q=' + gterm + '%20recall&cid=TIMESERIES_GRAPH_0&export=5&h=200');
      $('#GEO_TABLE_0_0').attr('src','http://www.google.com/trends/fetchComponent?q=' + gterm + '%20recall&cid=GEO_TABLE_0_0&export=5&h=200');
    };

    defender.queryNews();
  }
);
