/**
 * KeyBindings.ts
 *
 * Default, out-of-the-box keybindings for Oni
 */

import * as Platform from "./../Platform"
import { Configuration } from "./../Services/Configuration"

export const applyDefaultKeyBindings = (oni: Oni.Plugin.Api, config: Configuration): void => {
    const { editors, input, menu } = oni

    input.unbindAll()

    const isVisualMode = () => editors.activeEditor.mode === "visual"
    const isNormalMode = () => editors.activeEditor.mode === "normal"
    const isInsertOrCommandMode = () => editors.activeEditor.mode === "insert" || editors.activeEditor.mode === "cmdline_normal"

    const isMenuOpen = () => menu.isMenuOpen()

    if (Platform.isMac()) {
        input.bind("<m-q>", "oni.quit")
        input.bind("<m-p>", "quickOpen.show")
        input.bind("<m-s-p>", "commands.show")
        input.bind("<m-enter>", "language.codeAction.expand")
        input.bind("<m-t>", "language.symbols.workspace")
        input.bind("<s-m-t>", "language.symbols.document")

        if (config.getValue("editor.clipboard.enabled")) {
            input.bind("<m-c>", "editor.clipboard.yank", isVisualMode)
            input.bind("<m-v>", "editor.clipboard.paste", isInsertOrCommandMode)
        }
    } else {
        input.bind("<a-f4>", "oni.quit")
        input.bind("<c-p>", "quickOpen.show", () => isNormalMode() && !isMenuOpen())
        input.bind("<s-c-p>", "commands.show", isNormalMode)
        input.bind("<a-enter>", "language.codeAction.expand")
        input.bind("<c-t>", "language.symbols.workspace")
        input.bind("<s-c-t>", "language.symbols.document")

        if (config.getValue("editor.clipboard.enabled")) {
            input.bind("<c-c>", "editor.clipboard.yank", isVisualMode)
            input.bind("<c-v>", "editor.clipboard.paste", isInsertOrCommandMode)
        }
    }

    input.bind("<f2>", "language.rename", () => isNormalMode()),
    input.bind("<esc>", "language.rename.cancel")
    input.bind("<enter>", "language.rename.commit")


    input.bind("<f3>", "language.formatDocument")
    input.bind(["<f12>"], "language.gotoDefinition", () => isNormalMode() && !menu.isMenuOpen())
    input.bind(["<c-enter>", "<c-f12>"], "language.gotoDefinition.openVertical", () => isNormalMode() && !menu.isMenuOpen())
    input.bind(["<s-enter>", "<s-f12>"], "language.gotoDefinition.openHorizontal", () => isNormalMode() && !menu.IsMenuOpen())
    input.bind("<S-C-P>", "commands.show", isNormalMode)
    input.bind("<C-pageup>", "oni.process.cyclePrevious")
    input.bind("<C-pagedown>", "oni.process.cycleNext")

    // QuickOpen
    input.bind("<C-/>", "quickOpen.showBufferLines", isNormalMode)
    input.bind(["<c-enter", "<C-v>"], "quickOpen.openFileVertical")
    input.bind(["<s-enter", "<C-s>"], "quickOpen.openFileHorizontal")
    input.bind("<C-t>", "quickOpen.openFileNewTab")

    // Completion
    input.bind(["<enter>", "<tab>"], "contextMenu.select")
    input.bind(["<down>", "<C-n>"], "contextMenu.next")
    input.bind(["<up>", "<C-p>"], "contextMenu.previous")

    // Menu
    input.bind(["<down>", "<C-n>"], "menu.next")
    input.bind(["<up>", "<C-p>"], "menu.previous")
    input.bind("<esc>", "menu.close")
    input.bind("<enter>", "menu.select")
}
