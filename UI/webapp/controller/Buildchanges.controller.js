sap.ui.define([
	"scp/com/saparate/controller/BaseController"
], function (BaseController) {
	"use strict";

	return BaseController.extend("scp.com.saparate.controller.Buildchanges", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf scp.com.saparate.view.Buildchanges
		 */
		onInit: function () {

			this._oRouter = this.getOwnerComponent().getRouter();
			this._oRouter.getRoute("Buildchanges").attachPatternMatched(this._onObjectMatched, this);

		},
		_onObjectMatched: function (oEvent) {
			var skey = sap.ui.getCore().getModel('oKeyModel').getProperty("/saparate/key").authorizationToken;
			if (typeof skey === "undefined" || skey === "" || skey === null) {
				this.getRouter().navTo("Authorize");
			} else {
				var jobId = oEvent.getParameter("arguments").jobId;
				var buildId = oEvent.getParameter("arguments").buildid;
				this.loadDatatoViewwithKey_GET_filter("buildChanges", "?jobName=" + jobId + "&buildNumber=" + buildId, "buildChanges",
						sap.ui.getCore().getModel('oKeyModel').getProperty("/saparate/key"));
				this.byId("idbc_build_bc").setText(jobId);
				this.byId("idbc_buildno_bc").setText(buildId);
				var idBuildchangetxt = this.getView().getModel("i18n").getResourceBundle().getText("msgBuildchange") + " " +jobId + this.getView().getModel(
					"i18n").getResourceBundle().getText("Buildno") +" "+ buildId;
				this.byId("idBreadcrum_buildChanges").setCurrentLocationText(idBuildchangetxt);

			}
		},
		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf scp.com.saparate.view.Buildchanges
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf scp.com.saparate.view.Buildchanges
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf scp.com.saparate.view.Buildchanges
		 */
		//	onExit: function() {
		//
		//	}
		navigateTo: function (oEvent) {
			this.breadCrumbNavigate(oEvent.getSource().getParent(), "fromBuildStages", oEvent.getSource().data("selectedkey"));
		}
	});

});
				// var oModel_jobchanges = new sap.ui.model.json.JSONModel();
				// //	oModel_jobchanges.loadData(this.getApiCall("jobs"));

				// oModel_jobchanges.setData({
				// 	"items": [{
				// 		"affectedPaths": [
				// 			"test/groovy/BatsExecuteTestsTest.groovy",
				// 			"test/groovy/SonarExecuteScanTest.groovy",
				// 			"test/groovy/SnykExecuteTest.groovy",
				// 			"test/groovy/KarmaExecuteTestsTest.groovy",
				// 			"vars/karmaExecuteTests.groovy",
				// 			"test/groovy/SeleniumExecuteTestsTest.groovy",
				// 			"test/groovy/GaugeExecuteTestsTest.groovy",
				// 			"test/groovy/NewmanExecuteTest.groovy",
				// 			"resources/metadata/karma.yaml",
				// 			"test/groovy/WhitesourceExecuteScanTest.groovy",
				// 			"vars/npmExecute.groovy",
				// 			"cmd/karmaExecuteTests_generated.go",
				// 			"resources/default_pipeline_environment.yml",
				// 			"test/groovy/NpmExecuteTest.groovy"
				// 		],
				// 		"commitId": "92441577d82ae5745251fde9f14ae7c80a7bd7b8",
				// 		"timestamp": "1580293076000",
				// 		"author": {
				// 			"absoluteUrl": "http://52.7.53.120/user/noreply",
				// 			"fullName": "noreply"
				// 		},
				// 		"comment": "fix(NPM): change NodeJS image to LTS (#1069)\n* change NodeJS image to current LTS\n\n* Update default_pipeline_environment.yml\n\n* Update SonarExecuteScanTest.groovy\n\n* use node:lts-stretch image\n",
				// 		"date": "2020-01-29 11:17:56 +0100",
				// 		"id": "92441577d82ae5745251fde9f14ae7c80a7bd7b8",
				// 		"msg": "fix(NPM):  change NodeJS image to LTS (#1069)",
				// 		"paths": [{
				// 			"editType": "edit",
				// 			"file": "cmd/karmaExecuteTests_generated.go"
				// 		}, {
				// 			"editType": "edit",
				// 			"file": "resources/metadata/karma.yaml"
				// 		}, {
				// 			"editType": "edit",
				// 			"file": "vars/karmaExecuteTests.groovy"
				// 		}, {
				// 			"editType": "edit",
				// 			"file": "test/groovy/NpmExecuteTest.groovy"
				// 		}, {
				// 			"editType": "edit",
				// 			"file": "test/groovy/SonarExecuteScanTest.groovy"
				// 		}, {
				// 			"editType": "edit",
				// 			"file": "vars/npmExecute.groovy"
				// 		}, {
				// 			"editType": "edit",
				// 			"file": "test/groovy/SnykExecuteTest.groovy"
				// 		}, {
				// 			"editType": "edit",
				// 			"file": "test/groovy/NewmanExecuteTest.groovy"
				// 		}, {
				// 			"editType": "edit",
				// 			"file": "test/groovy/KarmaExecuteTestsTest.groovy"
				// 		}, {
				// 			"editType": "edit",
				// 			"file": "test/groovy/BatsExecuteTestsTest.groovy"
				// 		}, {
				// 			"editType": "edit",
				// 			"file": "test/groovy/SeleniumExecuteTestsTest.groovy"
				// 		}, {
				// 			"editType": "edit",
				// 			"file": "resources/default_pipeline_environment.yml"
				// 		}, {
				// 			"editType": "edit",
				// 			"file": "test/groovy/GaugeExecuteTestsTest.groovy"
				// 		}, {
				// 			"editType": "edit",
				// 			"file": "test/groovy/WhitesourceExecuteScanTest.groovy"
				// 		}]
				// 	}, {
				// 		"affectedPaths": [
				// 			"src/com/sap/piper/Utils.groovy",
				// 			"vars/piperStageWrapper.groovy"
				// 		],
				// 		"commitId": "53833eaae99dfdb38032b97518fa73e6aace2ca9",
				// 		"timestamp": "1580297407000",
				// 		"author": {
				// 			"absoluteUrl": "http://52.7.53.120/user/stephan.assmus",
				// 			"fullName": "stephan.assmus"
				// 		},
				// 		"comment": "Move stage stashing functionality into Utils\n * No functional change intended\n* Steps in the SDK pipeline may use Utils for stashing,\n  as separate stashFiles and unstashFiles steps are eliminated.\n",
				// 		"date": "2020-01-29 12:30:07 +0100",
				// 		"id": "53833eaae99dfdb38032b97518fa73e6aace2ca9",
				// 		"msg": "Move stage stashing functionality into Utils",
				// 		"paths": [{
				// 			"editType": "edit",
				// 			"file": "src/com/sap/piper/Utils.groovy"
				// 		}, {
				// 			"editType": "edit",
				// 			"file": "vars/piperStageWrapper.groovy"
				// 		}]
				// 	}, {
				// 		"affectedPaths": [
				// 			"pkg/generator/helper/testdata/TestProcessMetaFiles/step_code_generated.golden",
				// 			"cmd/githubPublishRelease_generated.go",
				// 			"pkg/telemetry/data_test.go",
				// 			"cmd/kubernetesDeploy_generated.go",
				// 			"cmd/githubCreatePullRequest_generated.go",
				// 			"go.mod",
				// 			"cmd/checkmarxExecuteScan_generated.go",
				// 			"pkg/telemetry/telemetry.go",
				// 			"pkg/generator/helper/helper.go",
				// 			"cmd/detectExecuteScan_generated.go",
				// 			"cmd/xsDeploy_generated.go",
				// 			"cmd/piper.go",
				// 			"Dockerfile",
				// 			"go.sum",
				// 			"pkg/telemetry/data.go",
				// 			"pkg/http/http.go",
				// 			"cmd/karmaExecuteTests_generated.go",
				// 			"pkg/telemetry/telemetry_test.go",
				// 			"cmd/version_generated.go"
				// 		],
				// 		"commitId": "aa3fb8adb400c27a518c990e3fb83cbef515e675",
				// 		"timestamp": "1580300274000",
				// 		"author": {
				// 			"absoluteUrl": "http://52.7.53.120/user/noreply",
				// 			"fullName": "noreply"
				// 		},
				// 		"comment": "feat(go): add telemetry reporting (#1100)\n* Add telemetry support\n\n* First round telemetry\n\n* Add telemetry flag\n\n* fix: move files to avoid import cycles\n\n* add noTelemetry as global config option\n\n* Respect telemetry configuration for reporting\n\n* add site id, swa endpoint\n\n* correct logger initialization\n\n* add http logic\n\n* rename init method\n\n* rename consts & types\n\n* convert struct to payload\n\n* convert data to payload string\n\n* move activation flag out of data structure\n\n* extract types to own file\n\n* build query using net/url\n\n* correct field mapping\n\n* extract notify coding to own file\n\n* cleanup parameter mapping\n\n* preare base data\n\n* fix codeclimate issue\n\n* correct test case\n\n* fill values from env\n\n* test all fields\n\n* untrack notify.go\n\n* ignore empty custom values\n\n* cleanup data.go\n\n* add test cases\n\n* cleanup\n\n* add usage reporting to karma step\n\n* add usage reporting to step generator\n\n* externalise siteID\n\n* correct custom field names\n\n* test env handling\n\n* simplify method signature\n\n* revert parameter negation\n\n* correct import\n\n* adjust golden file\n\n* inclease log level\n\n* ignore test case\n\n* Revert \"inclease log level\"\n This reverts commit 70cae0e0296afb2aa9e7d71e83ea70aa83d1a6d7.\n\n* add test case for envvars\n\n* remove duplicate reporting\n\n* remove duplicate reporting\n\n* correct format\n\n* regenerate checkmarx file\n\n* add log message on deactivation\n\n* rename function\n\n* add comments to understand SWA mapping\n Co-authored-by: Oliver Nocon\n<33484802+OliverNocon@users.noreply.github.com>\n",
				// 		"date": "2020-01-29 13:17:54 +0100",
				// 		"id": "aa3fb8adb400c27a518c990e3fb83cbef515e675",
				// 		"msg": "feat(go): add telemetry reporting (#1100)",
				// 		"paths": [{
				// 			"editType": "edit",
				// 			"file": "cmd/version_generated.go"
				// 		}, {
				// 			"editType": "edit",
				// 			"file": "cmd/piper.go"
				// 		}, {
				// 			"editType": "edit",
				// 			"file": "cmd/checkmarxExecuteScan_generated.go"
				// 		}, {
				// 			"editType": "edit",
				// 			"file": "cmd/xsDeploy_generated.go"
				// 		}, {
				// 			"editType": "edit",
				// 			"file": "pkg/generator/helper/testdata/TestProcessMetaFiles/step_code_generated.golden"
				// 		}, {
				// 			"editType": "edit",
				// 			"file": "pkg/http/http.go"
				// 		}, {
				// 			"editType": "add",
				// 			"file": "pkg/telemetry/telemetry.go"
				// 		}, {
				// 			"editType": "edit",
				// 			"file": "cmd/karmaExecuteTests_generated.go"
				// 		}, {
				// 			"editType": "add",
				// 			"file": "pkg/telemetry/data_test.go"
				// 		}, {
				// 			"editType": "edit",
				// 			"file": "cmd/githubCreatePullRequest_generated.go"
				// 		}, {
				// 			"editType": "edit",
				// 			"file": "Dockerfile"
				// 		}, {
				// 			"editType": "edit",
				// 			"file": "cmd/detectExecuteScan_generated.go"
				// 		}, {
				// 			"editType": "edit",
				// 			"file": "cmd/kubernetesDeploy_generated.go"
				// 		}, {
				// 			"editType": "edit",
				// 			"file": "go.mod"
				// 		}, {
				// 			"editType": "add",
				// 			"file": "pkg/telemetry/telemetry_test.go"
				// 		}, {
				// 			"editType": "edit",
				// 			"file": "cmd/githubPublishRelease_generated.go"
				// 		}, {
				// 			"editType": "add",
				// 			"file": "pkg/telemetry/data.go"
				// 		}, {
				// 			"editType": "edit",
				// 			"file": "go.sum"
				// 		}, {
				// 			"editType": "edit",
				// 			"file": "pkg/generator/helper/helper.go"
				// 		}]
				// 	}, {
				// 		"affectedPaths": [
				// 			"pkg/piperutils/fileUtils_test.go"
				// 		],
				// 		"commitId": "4b1ca5697d618aabbf3517da99c92ebd09bae48f",
				// 		"timestamp": "1580301988000",
				// 		"author": {
				// 			"absoluteUrl": "http://52.7.53.120/user/noreply",
				// 			"fullName": "noreply"
				// 		},
				// 		"comment": "Add missing test (#1116)\nCo-authored-by: Oliver Nocon\n<33484802+OliverNocon@users.noreply.github.com>\n",
				// 		"date": "2020-01-29 13:46:28 +0100",
				// 		"id": "4b1ca5697d618aabbf3517da99c92ebd09bae48f",
				// 		"msg": "Add missing test (#1116)",
				// 		"paths": [{
				// 			"editType": "add",
				// 			"file": "pkg/piperutils/fileUtils_test.go"
				// 		}]
				// 	}, {
				// 		"affectedPaths": [
				// 			"test/groovy/DockerExecuteOnKubernetesTest.groovy"
				// 		],
				// 		"commitId": "cea3d0b4e352773ffb6cc839b9772eddf998ab14",
				// 		"timestamp": "1580303712000",
				// 		"author": {
				// 			"absoluteUrl": "http://52.7.53.120/user/noreply",
				// 			"fullName": "noreply"
				// 		},
				// 		"comment": "Add test handling exception in dockerExecuteOnK8S in case exception is\nraised. (#1081)\nCo-authored-by: Oliver Nocon\n<33484802+OliverNocon@users.noreply.github.com>\n",
				// 		"date": "2020-01-29 14:15:12 +0100",
				// 		"id": "cea3d0b4e352773ffb6cc839b9772eddf998ab14",
				// 		"msg": "Add test handling exception in dockerExecuteOnK8S in case exception is",
				// 		"paths": [{
				// 			"editType": "edit",
				// 			"file": "test/groovy/DockerExecuteOnKubernetesTest.groovy"
				// 		}]
				// 	}, {
				// 		"affectedPaths": [
				// 			"cmd/interfaces.go"
				// 		],
				// 		"commitId": "40f0a17b4571e68f4e81ee046bd2d69be86990e7",
				// 		"timestamp": "1580304163000",
				// 		"author": {
				// 			"absoluteUrl": "http://52.7.53.120/user/noreply",
				// 			"fullName": "noreply"
				// 		},
				// 		"comment": "re-use execRunner for envExecRunner (#1117)\nCo-authored-by: Oliver Nocon\n<33484802+OliverNocon@users.noreply.github.com>\n",
				// 		"date": "2020-01-29 14:22:43 +0100",
				// 		"id": "40f0a17b4571e68f4e81ee046bd2d69be86990e7",
				// 		"msg": "re-use execRunner for envExecRunner (#1117)",
				// 		"paths": [{
				// 			"editType": "edit",
				// 			"file": "cmd/interfaces.go"
				// 		}]
				// 	}, {
				// 		"affectedPaths": [
				// 			"src/com/sap/piper/Utils.groovy"
				// 		],
				// 		"commitId": "479123a8002620d81ef1617e092082081356798f",
				// 		"timestamp": "1580307201000",
				// 		"author": {
				// 			"absoluteUrl": "http://52.7.53.120/user/stephan.assmus",
				// 			"fullName": "stephan.assmus"
				// 		},
				// 		"comment": "Remove try-blocks in new stashing methods\n",
				// 		"date": "2020-01-29 15:13:21 +0100",
				// 		"id": "479123a8002620d81ef1617e092082081356798f",
				// 		"msg": "Remove try-blocks in new stashing methods",
				// 		"paths": [{
				// 			"editType": "edit",
				// 			"file": "src/com/sap/piper/Utils.groovy"
				// 		}]
				// 	}, {
				// 		"affectedPaths": [
				// 			"test/groovy/CommonPipelineEnvironmentTest.groovy",
				// 			"cmd/kubernetesDeploy_generated.go",
				// 			"vars/commonPipelineEnvironment.groovy",
				// 			"resources/metadata/kubernetesdeploy.yaml"
				// 		],
				// 		"commitId": "152c4dc9d2a0247a2b986cd026442003f473d466",
				// 		"timestamp": "1580310198000",
				// 		"author": {
				// 			"absoluteUrl": "http://52.7.53.120/user/noreply",
				// 			"fullName": "noreply"
				// 		},
				// 		"comment": "Pass container image via CPE (#1113)\n* Pass container image via CPE\n* Update generated step\n* update map name to better represent content\n",
				// 		"date": "2020-01-29 16:03:18 +0100",
				// 		"id": "152c4dc9d2a0247a2b986cd026442003f473d466",
				// 		"msg": "Pass container image via CPE (#1113)",
				// 		"paths": [{
				// 			"editType": "edit",
				// 			"file": "cmd/kubernetesDeploy_generated.go"
				// 		}, {
				// 			"editType": "edit",
				// 			"file": "vars/commonPipelineEnvironment.groovy"
				// 		}, {
				// 			"editType": "edit",
				// 			"file": "resources/metadata/kubernetesdeploy.yaml"
				// 		}, {
				// 			"editType": "edit",
				// 			"file": "test/groovy/CommonPipelineEnvironmentTest.groovy"
				// 		}]
				// 	}, {
				// 		"affectedPaths": [
				// 			".github/workflows/verify-go.yml"
				// 		],
				// 		"commitId": "2da06bfa910b7061850e0d0c9b9a5b9ae2b1a47e",
				// 		"timestamp": "1580317791000",
				// 		"author": {
				// 			"absoluteUrl": "http://52.7.53.120/user/noreply",
				// 			"fullName": "noreply"
				// 		},
				// 		"comment": "chore(build): use GH actions to verify if go codebase is up to date\n(#1125)\n* add action to keep codebase up to date\n\n* add go mod tidy command\n\n* use official go action\n\n* correct go fmt command\n\n* fix code climate findings\n\n* remove dummy changes\n\n* separate checks\n",
				// 		"date": "2020-01-29 18:09:51 +0100",
				// 		"id": "2da06bfa910b7061850e0d0c9b9a5b9ae2b1a47e",
				// 		"msg": "chore(build): use GH actions to verify if go codebase is up to date",
				// 		"paths": [{
				// 			"editType": "add",
				// 			"file": ".github/workflows/verify-go.yml"
				// 		}]
				// 	}],
				// 	"kind": "git"
				// });

				// this.getView().setModel(oModel_jobchanges, "buildChanges");