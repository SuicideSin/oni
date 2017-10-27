/**
 * Utility.ts
 */

import * as path from "path"

import * as types from "vscode-languageserver-types"

import { IDisplayPart } from "./Types"

export const zeroBasedPositionToOneBasedPosition = (zeroBasedPosition: types.Position) => ({
    line: zeroBasedPosition.line + 1,
    character: zeroBasedPosition.character + 1,
})

export const getLanguageFromFileName = (fileName:string) => {
    const extension = path.extname(fileName)
    const language = extension === ".js" || extension === ".jsx" ? "javascript" : "typescript"
    return language
}

export const convertCodeEditToTextEdit = (codeEdit: protocol.CodeEdit): types.TextEdit => {
       const range = types.Range.create(codeEdit.start.line - 1, codeEdit.start.offset - 1, codeEdit.end.line - 1, codeEdit.end.offset - 1)
       const newText = codeEdit.newText

       return {
           range,
           newText,
       }
    }

export const convertToDisplayString = (displayParts: IDisplayPart[]) => {
    let ret = ""

    if (!displayParts || !displayParts.forEach) {
        return ret
    }

    displayParts.forEach((dp) => {
        ret += dp.text
    })

    return ret
}

export const convertTypeScriptKindToSymbolKind = (kind: string): types.SymbolKind => {
    return types.SymbolKind.Field
}

export const convertTextSpanToRange = (span: protocol.TextSpan): types.Range => {
    return types.Range.create(span.start.line - 1, span.start.offset - 1, span.end.line - 1, span.end.offset - 1)
}

export const convertTextSpanToLocation = (fileUri: string, span: protocol.TextSpan): types.Location => {
    const range = convertTextSpanToRange(span)
    return types.Location.create(fileUri, range)
}
