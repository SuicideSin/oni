/**
 * ActionCreators.ts
 *
 * Action Creators are relatively simple - they are just a function that returns an `Action`
 *
 * For information on Action Creators, check out this link:
 * http://redux.js.org/docs/basics/Actions.html
 */

import * as types from "vscode-languageserver-types"

import * as Actions from "./Actions"
import * as State from "./State"

import { normalizePath } from "./../Utility"

import { IConfigurationValues } from "./../Services/Configuration"
import { IThemeColors } from "./../Services/Themes"

export type DispatchFunction = (action: any) => void
export type GetStateFunction = () => State.IState

export const setHasFocus = (hasFocus: boolean) => {
    return {
        type: "SET_HAS_FOCUS",
        payload: {
            hasFocus,
        },
    }
}

export const setLoadingComplete = () => {

    document.body.classList.add("loaded")

    return {
        type: "SET_LOADING_COMPLETE",
    }
}

export const setWindowTitle = (title: string) => {

    document.title = title

    return {
        type: "SET_WINDOW_TITLE",
        payload: {
            title,
        },
    }
}

export const setColors = (colors: IThemeColors) => ({
    type: "SET_COLORS",
    payload: {
        colors,
    },
})

export const setViewport = (width: number, height: number) => ({
    type: "SET_VIEWPORT",
    payload: {
        width,
        height,
    },
})

export const setImeActive = (imeActive: boolean) => ({
    type: "SET_IME_ACTIVE",
    payload: {
        imeActive,
    },
})

export const setFont = (fontFamily: string, fontSize: string) => ({
    type: "SET_FONT",
    payload: {
        fontFamily,
        fontSize,
    },
})

export const setWindowCursor = (windowId: number, line: number, column: number) => ({
    type: "SET_WINDOW_CURSOR",
    payload: {
        windowId,
        line,
        column,
    },
})

export const setErrors = (file: string, key: string, errors: types.Diagnostic[]) => ({
    type: "SET_ERRORS",
    payload: {
        file: normalizePath(file),
        key,
        errors,
    },
})

export const showStatusBarItem = (id: string, contents: JSX.Element, alignment?: State.StatusBarAlignment, priority?: number) => (dispatch: DispatchFunction, getState: GetStateFunction) => {

    const currentStatusBarItem = getState().statusBar[id]

    if (currentStatusBarItem) {
        alignment = alignment || currentStatusBarItem.alignment
        priority = priority || currentStatusBarItem.priority
    }

    dispatch({
        type: "STATUSBAR_SHOW",
        payload: {
            id,
            contents,
            alignment,
            priority,
        },
    })
}

export const hideStatusBarItem = (id: string) => ({
    type: "STATUSBAR_HIDE",
    payload: {
        id,
    },
})

export function setConfigValue<K extends keyof IConfigurationValues>(k: K, v: IConfigurationValues[K]): Actions.ISetConfigurationValue<K> {
    return {
        type: "SET_CONFIGURATION_VALUE",
        payload: {
            key: k,
            value: v,
        },
    }
}
