"use strict";



// var _ = require('lodash');
//
// var parser = document.createElement('a');
// var UrlParser = function(url) {
//     parser.setAttribute('href', url);
//     this.protocol = parser.protocol;
//     this.host = parser.host;
//     this.hostname = parser.hostname;
//     this.port = parser.port;
//     this.pathname = pathnameToArray(parser.pathname);
//     this.query = queryToObject(parser.search.substring(1));
//     this.queryString = parser.search.substring(1);
//     this.hash = parser.hash.substring(1);
// };
// /**
//  * http: | https;
//  * @type string
//  */
// UrlParser.prototype.protocol = null;
// /**
//  * "example.com:8050"
//  * @type string
//  */
// UrlParser.prototype.host = null;
// /**
//  * example.com
//  * @type string
//  */
// UrlParser.prototype.hostname = null;
// /**
//  * 8050
//  * @type number
//  */
// UrlParser.prototype.port = null;
// /**
//  * /pathname/
//  * @type string
//  */
// UrlParser.prototype.pathname = null;
// /**
//  * {search: 'test'}
//  * @type object
//  */
// UrlParser.prototype.query = null;
// /**
//  * search=test
//  * @type string
//  */
// UrlParser.prototype.queryString = null;
// /**
//  * #hash
//  * @type string
//  */
// UrlParser.prototype.hash = null;
//
// // ##########################################
//
// UrlParser.prototype.toString = function() {
//     if (this.port) {
//         this.host = this.host.replace(/([\S]+):(?:\d+)/, '$1:8060');
//     }
//     var params = '';
//     if (this.query) {
//         params = '?' + objectToQuery(this.query); //$.param(this.query);
//     }
//     var hash = '';
//     if (this.hash && this.hash !== '') {
//         hash = '#' + this.hash;
//     }
//
//     var pathname = '';
//     if (this.pathname.length > 0) {
//         pathname = '/' + this.pathname.join('/');
//     }
//
//     return this.protocol + '//' + this.host + pathname + params + hash;
// };
// UrlParser.prototype.makeShareable = function(url) {
//     var obj = this.toObject(url);
//     obj.query.hash = obj.hash;
//     obj.hash = null;
//     return obj.toString();
// };
// UrlParser.prototype.convertUrlToCollection = function(string, pattern) {
//     var stack = null;
//     switch (pattern) {
//         case 'REST':
//             break;
//         case 'GETREST':
//             stack = this.convertRESTUrlToCollection(string);
//             break;
//         default:
//             stack = this.convertGETUrlToCollection(string);
//             break;
//     }
//     return stack;
// };
// UrlParser.prototype.convertGETUrlToCollection = function(url) {
//     return convertToCollection(this.toObject(url).queryString, '&', function(collection, splittedQuery) {
//         var keyValue = null;
//         for (var i = 0, item; item = splittedQuery[i]; ++i) {
//             keyValue = item.split('=');
//             var value = true;
//             if (keyValue.length > 1) {
//                 value = decodeURIComponent(keyValue[1].replace(/\+/g, ' '));
//             }
//             collection.push({
//                 name: keyValue[0],
//                 value: value
//             });
//         }
//         return collection;
//     });
// };
// UrlParser.prototype.convertRESTUrlToCollection = function(url) {
//     return convertToCollection(this.toObject(url).queryString, '/', function(collection, splittedQuery) {
//         splittedQuery = _.without(splittedQuery, '', undefined, null);
//         for (var i = 0; i < splittedQuery.length; i += 2) {
//             collection.push({
//                 name: splittedQuery[i],
//                 value: decodeURIComponent(splittedQuery[i + 1].replace(/\+/g, ' '))
//             });
//         }
//         return collection;
//     });
// };
// UrlParser.prototype.convertCollectionToUrl = function(collection, pattern) {
//     var queryString = '';
//     switch (pattern) {
//         case 'REST':
//             break;
//         case 'GETREST':
//             queryString = this.convertCollectionToRESTUrl(collection);
//             if (!!queryString) {
//                 return window.location.origin + window.location.pathname + '?/' + queryString;
//             }
//             break;
//         default:
//             queryString = this.convertCollectionToGETUrl(collection);
//             if (!!queryString) {
//                 return window.location.origin + window.location.pathname + '?' + queryString;
//             }
//             break;
//     }
//     return window.location.origin + window.location.pathname;
// };
// UrlParser.prototype.convertCollectionToGETUrl = function(collection) {
//     return convertCollectionToQueryList(collection, '&', '=');
// };
// UrlParser.prototype.convertCollectionToRESTUrl = function(collection) {
//     return convertCollectionToQueryList(collection, '/', '/');
// };
//
// function pathnameToArray(pathname) {
//     pathname = pathname.split('/');
//     pathname.shift();
//     return pathname;
// }
//
// function objectToQuery(query) {
//     var url = [];
//     for (var key in query) {
//         if (query.hasOwnProperty(key)) {
//             url.push(key + '=' + query[key]);
//         }
//     }
//     return url.join('&');
// }
//
// function queryToObject(query) {
//     var paramValueStrings = query.split('&');
//     var obj = {},
//         keyValue = [];
//     for (var i = 0, item; item = paramValueStrings[i]; ++i) {
//         keyValue = item.split('=');
//         obj[keyValue[0]] = keyValue[1] || true;
//     }
//     return obj;
// }
//
// function convertToCollection(queryString, separator, converter) {
//     var collection = [],
//         keyValue = [];
//     if ((!!queryString)) {
//         collection = converter(collection, queryString.split(separator));
//     }
//     return collection;
// }
//
// function convertCollectionToQueryList(collection, separator, subSeparator, converter) {
//     var queryList = [];
//     for (var i = 0, item; item = collection[i]; ++i) {
//         if (!!item.value) {
//             queryList.push(item.name + subSeparator + item.value);
//         }
//     }
//     return queryList.join(separator);
// }
//
// module.exports = UrlParser;
