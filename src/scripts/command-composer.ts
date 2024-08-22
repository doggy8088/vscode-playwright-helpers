import { CommandComposerCategory, PwCommandComposer } from "../helpers/types";

export function getCommandComposerData() {
  const commandsList: PwCommandComposer[] = [
    {
      key: "package.json script",
      option: "package.json script",
      valueType: "select",
      defaultValue: [],
      prettyName: "",
      category: CommandComposerCategory.general,
      skipAsOption: true,
      overwriteBaseCommand: true,
      notCheckbox: true,
      optionType: "PwScripts",
    },
    {
      key: "--config",
      option: "--config",
      valueType: "string",
      defaultValue: "playwright.config.ts",
      prettyName: "Configuration file",
      category: CommandComposerCategory.general,
    },
    {
      key: "--only-changed",
      option: "--only-changed",
      prettyName: "Only run changed files",
      category: CommandComposerCategory.general,
    },
    {
      key: "--debug",
      option: "--debug",
      prettyName: "Run in debug mode",
      category: CommandComposerCategory.general,
    },
    {
      key: "--workers",
      option: "--workers",
      valueType: "number",
      defaultValue: 1,
      prettyName: "Number of workers",
      category: CommandComposerCategory.general,
    },
    {
      key: "--fail-on-flaky-tests",
      option: "--fail-on-flaky-tests",
      prettyName: "Fail on flaky tests",
      category: CommandComposerCategory.general,
    },
    {
      key: "--forbid-only",
      option: "--forbid-only",
      prettyName: "Forbid only",
      category: CommandComposerCategory.general,
    },
    {
      key: "--global-timeout",
      option: "--global-timeout",
      valueType: "number",
      defaultValue: 0,
      prettyName: "Global timeout",
      category: CommandComposerCategory.general,
    },
    {
      key: "--grep",
      option: "--grep",
      valueType: "string",
      defaultValue: '"Login"',
      prettyName: "grep",
      category: CommandComposerCategory.general,
    },
    {
      key: "--max-failures",
      option: "--max-failures",
      valueType: "number",
      defaultValue: 0,
      prettyName: "Max failures",
      category: CommandComposerCategory.general,
    },
    {
      key: "--repeat-each",
      option: "--repeat-each",
      valueType: "number",
      defaultValue: 1,
      prettyName: "Repeat each",
      category: CommandComposerCategory.general,
    },
    {
      key: "--retries",
      option: "--retries",
      valueType: "number",
      defaultValue: 0,
      prettyName: "Retries",
      category: CommandComposerCategory.general,
    },
    {
      key: "--timeout",
      option: "--timeout",
      valueType: "number",
      defaultValue: 60000,
      prettyName: "Timeout",
      category: CommandComposerCategory.general,
    },
    {
      key: "--update-snapshots",
      option: "--update-snapshots",
      prettyName: "Update snapshots",
      category: CommandComposerCategory.general,
    },
    {
      key: "--reporter",
      option: "--reporter",
      valueType: "select",
      defaultValue: ["dot", "line", "list", "json", "junit", "blob", "verbose", "github"],
      optionType: "string",
      prettyName: "Reporter",
      category: CommandComposerCategory.general,
    },
    {
      key: "--project",
      option: "--project",
      valueType: "string",
      defaultValue: "chromium",
      prettyName: "Project",
      category: CommandComposerCategory.general,
    },
    {
      key: "--headed",
      option: "--headed",
      prettyName: "Run in headed mode",
      category: CommandComposerCategory.general,
    },
    {
      key: "--ignore-snapshots",
      option: "--ignore-snapshots",
      prettyName: "Ignore snapshots",
      category: CommandComposerCategory.general,
    },
    {
      key: "--last-failed",
      option: "--last-failed",
      prettyName: "Only re-run the failures",
      category: CommandComposerCategory.general,
    },
    {
      key: "--list",
      option: "--list",
      prettyName: "List all the tests (not run)",
      category: CommandComposerCategory.general,
    },
    {
      key: "--no-deps",
      option: "--no-deps",
      prettyName: "Ignore the dependencies between projects",
      category: CommandComposerCategory.general,
    },
    {
      key: "--output",
      option: "--output",
      valueType: "string",
      defaultValue: "test-results",
      prettyName: "Directory for artifacts",
      category: CommandComposerCategory.general,
    },
    {
      key: "--pass-with-no-tests",
      option: "--pass-with-no-tests",
      prettyName: "Allows tests to pass when no files are found",
      category: CommandComposerCategory.general,
    },
    {
      key: "--quiet",
      option: "--quiet",
      prettyName: "Suppress stdout and stderr",
      category: CommandComposerCategory.general,
    },
    {
      key: "--shard",
      option: "--shard",
      valueType: "string",
      defaultValue: "1/1",
      prettyName: "Execute only selected shard",
      category: CommandComposerCategory.general,
    },
    {
      key: "--trace",
      option: "--trace",
      valueType: "select",
      optionType: "string",
      defaultValue: ["on", "off", "on-first-retry", "on-all-retries", "retain-on-failure"],
      prettyName: "Force tracing mode",
      category: CommandComposerCategory.general,
    },
  ];

  return commandsList;
}
