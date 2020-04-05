sap.ui.define([
	"scp/com/saparate/controller/BaseController",
	"scp/com/saparate/utils/formatter"
], function (BaseController, formatter) {
	"use strict";
	return BaseController.extend("scp.com.saparate.controller.buildStages", {
		formatter: formatter,
		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf scp.com.saparate.view.buildStages
		 */
		onInit: function () {
			this._oRouter = this.getOwnerComponent().getRouter();
			this._oRouter.getRoute("buildStages").attachPatternMatched(this._onObjectMatched, this);
			this._jobid = "";
			this._buildid = "";
		},
		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf scp.com.saparate.view.buildStages
		 */
		//	onBeforeRendering: function() {
		//
		//	},
		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf scp.com.saparate.view.buildStages
		 */
		//	onAfterRendering: function() {
		//
		//	},
		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf scp.com.saparate.view.buildStages
		 */
		//	onExit: function() {
		//
		//	}
		_onObjectMatched: function (oEvent) {
			var skey = sap.ui.getCore().getModel('oKeyModel').getProperty("/saparate/key").authorizationToken;
			if (typeof skey === "undefined" || skey === "" || skey === null) {
				this.getRouter().navTo("Authorize");
			} else {
				var jobId = oEvent.getParameter("arguments").jobId;
				var buildId = oEvent.getParameter("arguments").buildid;
				this._jobid = jobId;
				this._buildid = buildId;
				this.byId("idbc_build").setText(jobId);

				this.byId("idPipeLineBuildStageResults").setBusy(true);

				this.loadDatatoViewwithKey_GET_filter_2("JobStageResults", "?jobName=" + jobId + "&buildNumber=" + buildId, "Jobstatusdetails",
					sap.ui.getCore().getModel('oKeyModel').getProperty("/saparate/key"), this.byId("idPipeLineBuildStageResults"));

				var sHeaders = {
					"Content-Type": "application/json",
					"Authorization": sap.ui.getCore().getModel('oKeyModel').getProperty("/saparate/key").authorizationToken
				};

				this.byId("idBreadcrum_buildStages").setCurrentLocationText(buildId);
				var oModel_buildstageslog = new sap.ui.model.json.JSONModel();

				this.byId("idlog_content").setBusy(true);
				oModel_buildstageslog.loadData(this.getApiCall("log") + "?jobName=" + jobId +
					"&buildNumber=" + buildId, null, true, "GET", null, false, sHeaders);

				oModel_buildstageslog.attachRequestCompleted(function () {
					var p = this.byId("idlog_content");
					p.removeAllContent();
					var sResponse = oModel_buildstageslog.getData()["response"];
					var r = JSON.stringify(sResponse).replace(/\\r\\n/g, "<br />");
					var oText2 = new sap.ui.core.HTML();
					oText2.setContent("<div class='idBuildlogs_html'>" + r + " </div>");
					oText2.placeAt(this.byId("idlog_content"));
					this.byId("idlog_content").setBusy(false);
				}.bind(this));

			}
		},
		navigateTo: function (oEvent) {
			this.breadCrumbNavigate(oEvent.getSource().getParent(), "fromBuildStages", oEvent.getSource().data("selectedkey"));
		},
		/**
		 *@memberOf scp.com.saparate.controller.buildStages
		 */
		// ShowStageLog: function (oEvent) {
		// 	var otblRow = this.getView().getModel("Jobstatusdetails").getProperty(oEvent.getParameter("listItem").getBindingContextPath());
		// 	var id = otblRow.id;
		// 	var stage = otblRow.name;
		// 	this.byId("idtoolbar_stagelog_title").setText(stage + "-Logs");
		// 	var oModel_buildstageslog_Stage = new sap.ui.model.json.JSONModel();
		// 	var sHeaders = {
		// 		"Content-Type": "application/json",
		// 		"Authorization": sap.ui.getCore().getModel('oKeyModel').getProperty("/saparate/key").authorizationToken
		// 	};
		// 	var p = this.byId("idpanel_Stage");
		// 	p.setBusy(true);
		// 	oModel_buildstageslog_Stage.loadData(this.getApiCall("stagelog") + "?jobName=" + this._jobid +
		// 		"&buildNumber=" + this._buildid + "&stageId=" + id, null, true, "GET", null, false, sHeaders);
		// 	oModel_buildstageslog_Stage.attachRequestCompleted(function () {
		// 		p.removeAllContent();
		// 		var sResponse = oModel_buildstageslog_Stage.getData()["response"];
		// 		var r = JSON.stringify(sResponse).replace(/\n\s*\n/g, "<br />");
		// 		r = r.replace(/\n/g, "<br />");
		// 		var oText2 = new sap.ui.core.HTML();
		// 		oText2.setContent("<div class='idBuildlogs_html'>" + r + " </div>");
		// 		oText2.placeAt(this.byId("idpanel_Stage"));
		// 		p.setBusy(false);
		// 	}.bind(this));
		// 	this.getView().setBusy(false);
		// },
		showStagewiselogs: function (oEvent) {
			this.getView().setBusy(true);
			var stageId = oEvent.getSource().getParent().getBindingContext("Jobstatusdetails").getObject().id;
			var stage = oEvent.getSource().getParent().getBindingContext("Jobstatusdetails").getObject().name;
			var sHeaders = {
				"Content-Type": "application/json",
				"Authorization": sap.ui.getCore().getModel('oKeyModel').getProperty("/saparate/key").authorizationToken
			};
			var oModel_buildstageslog_Stage = new sap.ui.model.json.JSONModel();
			oModel_buildstageslog_Stage.loadData(this.getApiCall("stagelog") + "?jobName=" + this._jobid +
				"&buildNumber=" + this._buildid + "&stageId=" + stageId, null, true, "GET", null, false, sHeaders);
			oModel_buildstageslog_Stage.attachRequestCompleted(function () {
				this._getDialog().open();
				var sResponse = oModel_buildstageslog_Stage.getData()["response"];
				this.byId("idStagewiselogsbuildhtml").setHtmlText(sResponse);
				var otxt_Stagedialog = stage + " " + this.getView().getModel("i18n").getResourceBundle().getText("stageLogs");
				this.byId("idStgdlg").setTitle(otxt_Stagedialog);
				this.getView().setBusy(false);
			}.bind(this));
		},
		_getDialog: function () {
			if (!this._oDialog) {
				this._oDialog = sap.ui.xmlfragment(this.getView().getId(),
					"scp.com.saparate.view.fragments.Buildpipelinestagewisetasklogs", this);
				this.getView().addDependent(this._oDialog);
			}
			return this._oDialog;
		},
		onCloselog: function () {
			this.byId("idStagewiselogsbuildhtml").setHtmlText("");
			this._getDialog().close();
		},

		refreshData: function (oEvent) {
			this.refreshData_ui("JobStageResults", "?jobName=" + this._jobid + "&buildNumber=" + this._buildid, "Jobstatusdetails", this.byId(
				"idPipeLineBuildStageResults"));
		},
		toBuildChanges: function (oEvent) {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("Buildchanges", {
				jobId: this._jobid,
				buildid: this._buildid
			});
		}
	});
});
// this.byId("idBuildStages").setBusy(true);
//	var buildId = oEvent.getSource().getBindingContext("Jobstatusdetails").getObject().output.jenkinsBuildNumber;
// var stageId = oEvent.getSource().getBindingContext("Jobstatusdetails").getObject().output.jenkinsJobName;
// var r = JSON.stringify(sResponse).replace(/\n\s*\n/g, "<br />");
// r = r.replace(/\n/g, "<br />");
// var oText2 = new sap.ui.core.HTML();
// oText2.setContent("<div class='idBuildlogs_html'>" + r + " </div>");
// oText2.placeAt(this.byId("idlogs_BpipelineStages"));
// p.setBusy(false);
//	this._getDialog().setModel(oModel_buildstageslog_Stage);
// var p = this.byId("idStagewiselogsbuildhtml");
// oModel_buildstageslog.loadData(this.getApiCall("log") + "?jobName=" + jobId +
// 	"&buildNumber=" + buildId, null, true, "GET", null, false, sHeaders);
// oModel_releasestageslog.attachRequestCompleted(function () {
// 	this._getDialog().open();
// 	var p = this.byId("idlog_RLcontent");
// 	p.removeAllContent();
// 	var sResponse = oModel_releasestageslog.getData()["response"];
// 	var r = JSON.stringify(sResponse).replace(/\\r\\n/g, "<br />");
// 	var oText2 = new sap.ui.core.HTML();
// 	oText2.setContent("<div>" + r + " </div>");
// 	oText2.placeAt(this.byId("idlog_RLcontent"));
// 	this.byId("idlog_RLcontent").setBusy(false);
// 	this.byId("idWorkFlowStageResults").setBusy(false);
// }.bind(this));