/*=== Lists Controller ===*/
'use strict';

var fs = require("fs");
var _ = require("lodash");
var ManualEvaluationCtrl = require("./ManualEvaluationsCtrl");

var URL_PREFIX = "http://dbpedia.org/resource/";

var ListsCtrl = {};

_.extend(ListsCtrl, {
	NOT_FOUND_RESPONSE: {
	  "status": "not_found",
	  "message": "Resource was not found"
	},

	getResourceById: function(listId) {
	  try {
	    return require("../lists/"+listId+".js");
	  } catch(e) {
	    if (e.code === "MODULE_NOT_FOUND") {
	      return null;
	    }

	    throw e;
	  }
	},

	buildUrlById: function(listId) {
		return URL_PREFIX+listId;
	},

	listExists: function (listId) {
		return ManualEvaluationCtrl.exists(listId);
	},

	listIdFromFilename: function (filename) {
		return filename.replace(".js", "");
	},

	isJsFile: function (file) {
		var tokens = file.split(".");
		return tokens[tokens.length - 1] == "js";
	},

	getListNames: function () {
		var jsFiles = _.filter(fs.readdirSync(__dirname + "/../lists"), ListsCtrl.isJsFile);
		return _.map(jsFiles, ListsCtrl.listIdFromFilename);
	},

	getListNamesWithStatus: function () {
		var listNames = ListsCtrl.getListNames();
		return _.map(listNames, function(listId) {
			return { listId: listId, validated: ListsCtrl.listExists(listId) };
		});
	},

	getValidatedListNames: function() {
		return _(ListsCtrl.getListNamesWithStatus())
      .filter(function(list) { return list.validated; })
      .pluck('listId')
			.value();
	},


	fetch: function (req, res) {
		var resource = ListsCtrl.getResourceById(req.params.id);

		if (resource === null) {
      res.json(_.extend({}, ListsCtrl.NOT_FOUND_RESPONSE, { resource: listId }));
    }

		res.json(resource);
	},

	fetchAll : function (req, res) {
		res.json(ListsCtrl.getListNames());
	},

	fetchAllWithStatus : function (req, res) {
		res.json(ListsCtrl.getListNamesWithStatus());
	}
});

module.exports = ListsCtrl;
