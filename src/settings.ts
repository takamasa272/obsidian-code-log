import { App, PluginSettingTab, Setting } from "obsidian";
import CodeLogLineHighlighter from "./main";

export interface CodeLogLineHighlighterSettings {
	highlightColor1: string;
	highlightColor2: string;
	highlightColor3: string;
}

export const DEFAULT_SETTINGS: CodeLogLineHighlighterSettings = {
	highlightColor1: "rgba(255, 0, 128, 0.1)",
	highlightColor2: "rgba(0, 0, 255, 0.1)",
	highlightColor3: "rgba(0, 255, 128, 0.1)",
};

// export class SampleSettingTab extends PluginSettingTab {
// 	plugin: CodeLogLineHighlighter;

// 	constructor(app: App, plugin: CodeLogLineHighlighter) {
// 		super(app, plugin);
// 		this.plugin = plugin;
// 	}

// 	display(): void {
// 		const {containerEl} = this;

// 		containerEl.empty();

// 		new Setting(containerEl)
// 			.setName('Settings #1')
// 			.setDesc('It\'s a secret')
// 			.addText(text => text
// 				.setPlaceholder('Enter your secret')
// 				.setValue(this.plugin.settings.mySetting)
// 				.onChange(async (value) => {
// 					this.plugin.settings.mySetting = value;
// 					await this.plugin.saveSettings();
// 				}));
// 	}
// }
