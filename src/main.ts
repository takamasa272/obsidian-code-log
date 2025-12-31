import {
	type App,
	type MarkdownPostProcessorContext,
	Plugin,
	PluginSettingTab,
	Setting,
	loadPrism,
} from "obsidian";
// import {DEFAULT_SETTINGS, CodeLogLineHighlighterSettings, SampleSettingTab} from "./settings";
import { DEFAULT_SETTINGS, CodeLogLineHighlighterSettings } from "./settings";

export default class CodeLogLineHighlighter extends Plugin {
	settings: CodeLogLineHighlighterSettings;
	async onload() {
		console.log("CodeLogLineHighlighter Plugin loaded.");

		this.registerMarkdownPostProcessor((element: HTMLElement, context) => {
			const codeBlocks = element.querySelectorAll(
				"pre.language-log code, code.language-log",
			);

			codeBlocks.forEach((codeBlock: HTMLElement) => {
				const lines = codeBlock.textContent
					? codeBlock.textContent.split("\n")
					: [];

				codeBlock.innerHTML = "";

				lines.forEach((lineText, index) => {
					const lineSpan = codeBlock.createEl("span", {
						text: lineText,
					});
					lineSpan.style.display = "block"; // 各行をブロック要素として表示

					let maxConsecutiveLessThanCount = 0;
					const consecutiveMatches = lineText.match(/<+/g); // 1つ以上の '<' が連続するパターンをすべて検索

					if (consecutiveMatches) {
						for (const match of consecutiveMatches) {
							if (match.length > maxConsecutiveLessThanCount) {
								maxConsecutiveLessThanCount = match.length;
							}
						}
					}

					if (maxConsecutiveLessThanCount >= 2) {
						let color: string;
						// 2個:赤, 3個:青, 4個:緑, 5個:赤, ... と3色を繰り返し
						const colorIndex =
							(maxConsecutiveLessThanCount - 2) % 3;

						switch (colorIndex) {
							case 0:
								color = "red";
								break;
							case 1:
								color = "blue";
								break;
							case 2:
								color = "green";
								break;
							default:
								color = "black"; // デフォルト色（到達しないはず）
								break;
						}
						lineSpan.style.color = color;
					}
				});
			});
		});
	}

	async onunload() {
		console.log("CodeLogLineHighlighter Plugin unloaded."); // ログメッセージも変更
	}

	async loadSettings() {
		this.settings = Object.assign(
			{},
			DEFAULT_SETTINGS,
			await this.loadData(),
		);
	}

	async saveSettings() {
		await this.saveData(this.settings);
		// this.applyDynamicStyles(); // Apply styles after saving new settings
	}
}

class CodeLogLineHighlighterSettingTab extends PluginSettingTab {
	plugin: CodeLogLineHighlighter;

	constructor(app: App, plugin: CodeLogLineHighlighter) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const { containerEl } = this;
		containerEl.empty();

		containerEl.createEl("h2", { text: "CodeLogLineHighlighter Settings" });

		new Setting(containerEl)
			.setName("Highlight color 1")
			.setDesc("Set font color of highlighted line")
			.addText((text) =>
				text
					.setPlaceholder(DEFAULT_SETTINGS.highlightColor1)
					.setValue(this.plugin.settings.highlightColor1)
					.onChange(async (value) => {
						this.plugin.settings.highlightColor1 = value;
						await this.plugin.saveSettings();
					}),
			);

		new Setting(containerEl)
			.setName("Highlight color 2")
			.setDesc("Set font color of highlighted line")
			.addText((text) =>
				text
					.setPlaceholder(DEFAULT_SETTINGS.highlightColor2)
					.setValue(this.plugin.settings.highlightColor2)
					.onChange(async (value) => {
						this.plugin.settings.highlightColor2 = value;
						await this.plugin.saveSettings();
					}),
			);

		new Setting(containerEl)
			.setName("Highlight color 3")
			.setDesc("Set font color of highlighted line")
			.addText((text) =>
				text
					.setPlaceholder(DEFAULT_SETTINGS.highlightColor3)
					.setValue(this.plugin.settings.highlightColor3)
					.onChange(async (value) => {
						this.plugin.settings.highlightColor3 = value;
						await this.plugin.saveSettings();
					}),
			);
	}
}
