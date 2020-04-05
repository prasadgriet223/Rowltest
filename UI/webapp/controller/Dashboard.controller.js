sap.ui.define(["scp/com/saparate/controller/BaseController", "scp/com/saparate/utils/formatter", "sap/ui/model/json/JSONModel"], function (
	BaseController, formatter, JSONModel) {
	"use strict";
	return BaseController.extend("scp.com.saparate.controller.Dashboard", {
		formatter: formatter,
		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf scp.com.saparate.view.Dashboard
		 */
		onInit: function () {
			this._oRouter = this.getOwnerComponent().getRouter();
			this._oRouter.getRoute("Dashboard").attachPatternMatched(this._onObjectMatched, this);
		},
		/**
		 *@memberOf scp.com.saparate.controller.Dashboard
		 */
		hideside: function (oEvent) {

		},
		_onObjectMatched: function (oEvent) {
			var skey = sap.ui.getCore().getModel('oKeyModel').getProperty("/saparate/key").authorizationToken;
			if (typeof skey === "undefined" || skey === "" || skey === null) {
				this.getRouter().navTo("Authorize");
			} else {
				this.loadDatatoViewwithKey_GET("latestBuildResults", "Jobdetails", skey);
				this.byId("idBuildstblHdr").setText("Recent Build Cycles").addStyleClass("releaseCycledTitle");
				this.loadDatatoViewwithKey_GET("recentcycles", "Cycledetails", skey);
				this.byId("idReleasePipelinesHdr").setText("Recent Release Cycles").addStyleClass("releaseCycledTitle");
				this.byId("idBreadcrum_dashboard").setCurrentLocationText("Dashboard");
				//this.getView().setModel(this.getOwnerComponent().getModel("buildChanges"), "buildChanges");
			}
		},
		handleSelectionChange: function (oEvent) {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("buildStages", {
				jobId: oEvent.getSource().getBindingContext("Jobdetails").getObject().name,
				buildid: oEvent.getSource().getBindingContext("Jobdetails").getObject().number
			});
		},
		handleSelectionChange_releaseCycle: function (oEvent) {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("WorkflowCycleStages", {
				RjobId: oEvent.getSource().getBindingContext("Cycledetails").getObject().id,
				CycleId: oEvent.getSource().getBindingContext("Cycledetails").getObject().pipelineId.split(":")[0],
				Rlname: oEvent.getSource().getBindingContext("Cycledetails").getObject().label
			});
		},
		refreshData: function (oEvent) {
			this.refreshData_ui("latestBuildResults", "", "Jobdetails", this.byId("idPipeLineBuildResults"));
		},
		refreshData_Cycles: function (oEvent) {
			this.refreshData_ui("recentcycles", "", "Cycledetails", this.byId("idPipeLineCycleResults"));
		},

		_getDialog: function () {
			if (!this._oDialog) {
				this._oDialog = sap.ui.xmlfragment(this.getView().getId(),
					"scp.com.saparate.view.fragments.BuildChanges.BuildChanges", this);
				this.getView().addDependent(this._oDialog);
			}
			return this._oDialog;

		},
		handleLinkPress: function () {
			this._getDialog().open();
		},
		onCloselog:function(){this._getDialog().close()}

	});
});