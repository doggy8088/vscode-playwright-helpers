import * as vscode from "vscode";
import { CommandsViewProvider } from "./providers/commands-view.provider";
import { SettingsViewProvider } from "./providers/settings-view.provider";
import { getCommandList, runTestWithParameters } from "./scripts/commands";
import { getSettingsList } from "./scripts/settings";
import MyExtensionContext from "./helpers/my-extension.context";
import { ScriptsViewProvider } from "./providers/scripts-view.provider";
import { DEFAULT_TEST_REPORTS_DIR, DEFAULT_TEST_RESULTS_DIR, EXTENSION_NAME } from "./helpers/consts";
import { getPlaywrightReports, getPlaywrightScriptsFromPackageJson, getPlaywrightTraces } from "./helpers/helpers";
import { showInformationMessage } from "./helpers/window-messages.helpers";
import { CommandComposerViewProvider } from "./providers/command-composer-view.provider";
import { getCommandComposerData } from "./scripts/command-composer";
import { TraceViewProvider } from "./providers/trace-view.provider";
import { ReportViewProvider } from "./providers/report-view.provider";

export function activate(context: vscode.ExtensionContext) {
  MyExtensionContext.init(context);
  MyExtensionContext.instance.setWorkspaceValue("workspaceFolders", vscode.workspace.workspaceFolders);
  MyExtensionContext.instance.setWorkspaceValue("environmentVariables", []);

  if (MyExtensionContext.instance.getWorkspaceValue("testResultsDir") === undefined) {
    MyExtensionContext.instance.setWorkspaceValue("testResultsDir", DEFAULT_TEST_RESULTS_DIR);
  }
  if (MyExtensionContext.instance.getWorkspaceValue("testReportsDir") === undefined) {
    MyExtensionContext.instance.setWorkspaceValue("testReportsDir", DEFAULT_TEST_REPORTS_DIR);
  }

  const commandsList = getCommandList();

  for (const { key, func } of commandsList) {
    registerCommand(context, `${EXTENSION_NAME}.${key}`, func);
  }

  const settingsList = getSettingsList();

  for (const { key, func } of settingsList) {
    registerCommand(context, `${EXTENSION_NAME}.${key}`, func);
  }

  const commandComposerData = getCommandComposerData();

  // Register the Sidebar Panel - Commands
  const commandsViewProvider = new CommandsViewProvider(context.extensionUri, commandsList);
  context.subscriptions.push(
    vscode.window.registerWebviewViewProvider(CommandsViewProvider.viewType, commandsViewProvider)
  );

  // Register the Sidebar Panel - Settings
  const settingsViewProvider = new SettingsViewProvider(context.extensionUri, settingsList);
  context.subscriptions.push(
    vscode.window.registerWebviewViewProvider(SettingsViewProvider.viewType, settingsViewProvider)
  );

  // Register the Sidebar Panel - Scripts
  const scriptsViewProvider = new ScriptsViewProvider(context.extensionUri);
  context.subscriptions.push(
    vscode.window.registerWebviewViewProvider(ScriptsViewProvider.viewType, scriptsViewProvider)
  );

  // Register the Sidebar Panel - Trace
  const traceViewProvider = new TraceViewProvider(context.extensionUri);
  context.subscriptions.push(vscode.window.registerWebviewViewProvider(TraceViewProvider.viewType, traceViewProvider));

  // Register the Sidebar Panel - Trace
  const reportViewProvider = new ReportViewProvider(context.extensionUri);
  context.subscriptions.push(
    vscode.window.registerWebviewViewProvider(ReportViewProvider.viewType, reportViewProvider)
  );

  // Register the Sidebar Panel - Scripts
  const commandComposerViewProvider = new CommandComposerViewProvider(
    context.extensionUri,
    commandComposerData,
    runTestWithParameters
  );
  context.subscriptions.push(
    vscode.window.registerWebviewViewProvider(CommandComposerViewProvider.viewType, commandComposerViewProvider)
  );

  registerCommand(context, `${EXTENSION_NAME}.refreshPlaywrightScripts`, () => {
    getPlaywrightScriptsFromPackageJson(true).then((scripts) => {
      scriptsViewProvider.refresh(scripts);
      commandComposerViewProvider.refreshScripts(scripts);
      showInformationMessage("Playwright scripts from package.json refreshed");
    });
  });

  registerCommand(context, `${EXTENSION_NAME}.refreshTraces`, () => {
    const testResultsDir = MyExtensionContext.instance.getWorkspaceValue("testResultsDir");
    getPlaywrightTraces(testResultsDir, true).then((traces) => {
      traceViewProvider.refresh(traces);
      showInformationMessage(`Playwright traces refreshed (from ${testResultsDir})`);
    });
  });

  registerCommand(context, `${EXTENSION_NAME}.refreshReports`, () => {
    const testReportsDir = MyExtensionContext.instance.getWorkspaceValue("testReportsDir");
    getPlaywrightReports(testReportsDir, true).then((reports) => {
      reportViewProvider.refresh(reports);
      showInformationMessage(`Playwright reports refreshed (from ${testReportsDir})`);
    });
  });

  registerCommand(context, `${EXTENSION_NAME}.runSelectedCommand`, (param) => {
    if (param.key === undefined) {
      showInformationMessage("Click on the command");
      return;
    }
    commandsViewProvider.invokeCommand(param.key, true);
  });
  registerCommand(context, `${EXTENSION_NAME}.pasteSelectedCommand`, (param) => {
    if (param.key === undefined) {
      showInformationMessage("Click on the command");
      return;
    }
    commandsViewProvider.invokeCommand(param.key, false);
  });
  // registerCommand(context, `${EXTENSION_NAME}.addToFavSelectedCommand`, (param) => {
  //   console.log("Run Command", param);
  // });

  registerCommand(context, `${EXTENSION_NAME}.toggleHideShowCommands`, () => {});

  getPlaywrightScriptsFromPackageJson().then((scripts) => {
    scriptsViewProvider.refresh(scripts);
    commandComposerViewProvider.refreshScripts(scripts);
  });

  getPlaywrightTraces(MyExtensionContext.instance.getWorkspaceValue("testResultsDir")).then((traces) => {
    traceViewProvider.refresh(traces);
  });

  getPlaywrightReports(MyExtensionContext.instance.getWorkspaceValue("testReportsDir")).then((reports) => {
    reportViewProvider.refresh(reports);
  });

  // // Register the CommandsTreeViewProvider
  // const commandsTreeViewProvider = new CommandsTreeViewProvider(context.extensionUri, commandsList);
  // context.subscriptions.push(
  //   vscode.window.registerTreeDataProvider(`${EXTENSION_NAME}.commandsTreeView`, commandsTreeViewProvider)
  // );
  // {
  //   "type": "tree",
  //   "id": "playwright-helpers.commandsTreeView",
  //   "name": "Commands Tree View"
  // },
}

function registerCommand(context: vscode.ExtensionContext, id: string, callback: (...args: any[]) => any) {
  let disposable = vscode.commands.registerCommand(id, callback, context);
  context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
