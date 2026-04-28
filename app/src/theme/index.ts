import { css } from '@emotion/react'
import { defaultTheme, GameTheme } from '@gamepark/react-game'
import { colors } from './colors'
import { fontBody, fontDisplay } from './typography'

const dialogContainer = css`
  box-shadow:
    0 0 0 0.1em rgba(200, 144, 10, 0.4),
    0 0.6em 1.5em rgba(0, 0, 0, 0.6);
`

const buttonBase = css`
  background: ${colors.blood} !important;
  color: ${colors.ash} !important;
  border: 0.15em solid ${colors.ember} !important;
  border-radius: 0.3em !important;
  padding: 0.4em 1em !important;
  font-family: ${fontDisplay};
  font-weight: 600;
  letter-spacing: 0.04em;
  cursor: pointer;
  box-shadow: 0 0.2em 0.4em rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(242, 237, 227, 0.08);
  transition: background 150ms ease, color 150ms ease, border-color 150ms ease, transform 120ms ease;
  outline: none !important;

  &:hover:not(:disabled),
  &:focus:hover:not(:disabled) {
    background: ${colors.ember} !important;
    color: ${colors.bloodDeep} !important;
    border-color: ${colors.emberDeep} !important;
  }

  &:focus:not(:hover):not(:disabled) {
    background: ${colors.blood} !important;
    color: ${colors.ash} !important;
    border-color: ${colors.arcane} !important;
  }

  &:active:not(:disabled) {
    background: ${colors.emberDeep} !important;
    color: ${colors.ash} !important;
    border-color: ${colors.emberDeep} !important;
    transform: translateY(0.05em);
  }

  &:disabled {
    opacity: 0.45;
    cursor: not-allowed;
  }
`

const headerBar = css`
  background: rgba(30, 5, 5, 0.93);
  border-bottom: 0.15em solid ${colors.ember};
  color: ${colors.ash};
  font-family: ${fontDisplay};
  box-shadow: 0 0.2em 0.5em rgba(0, 0, 0, 0.6);

  h1 {
    color: ${colors.ash};
    font-weight: 600;
    letter-spacing: 0.04em;
  }

  b, strong {
    color: ${colors.ember};
  }
`

const headerButtons = css`
  background: transparent !important;
  color: ${colors.ash} !important;
  border: 0.08em solid rgba(242, 237, 227, 0.5) !important;
  border-radius: 0.3em !important;
  font-family: ${fontDisplay};
  font-weight: 600;
  letter-spacing: 0.03em;
  cursor: pointer;
  padding: 0 0.45em !important;
  box-shadow: none !important;
  outline: none !important;
  transition: background 150ms ease, color 150ms ease, border-color 150ms ease;

  &:hover:not(:disabled),
  &:focus:hover:not(:disabled) {
    background: ${colors.ash} !important;
    color: ${colors.bloodDeep} !important;
    border-color: ${colors.ash} !important;
  }

  &:focus:not(:hover):not(:disabled) {
    background: transparent !important;
    color: ${colors.ash} !important;
    border-color: ${colors.arcane} !important;
  }

  &:active:not(:disabled) {
    background: ${colors.ember} !important;
    color: ${colors.bloodDeep} !important;
    border-color: ${colors.ember} !important;
  }
`

const journalHistoryEntry = css`
  background-color: rgba(74, 8, 8, 0.85) !important;
  border: 0.08em solid rgba(200, 144, 10, 0.2) !important;
  border-left: 0.3em solid ${colors.ember} !important;
  border-radius: 0.3em !important;
  color: ${colors.ash} !important;
  font-family: ${fontBody} !important;
  font-size: 1.05em !important;
  padding: 0.55em 0.8em 0.55em 0.9em !important;
  margin: 0.35em 0 !important;
  box-sizing: border-box !important;
  box-shadow: 0 0.15em 0.3em rgba(0, 0, 0, 0.4) !important;

  strong, b { color: ${colors.ember}; font-weight: 600; }
  a { color: ${colors.arcane}; font-weight: 600; }
`

const menuPanel = css`
  background: ${colors.bloodDeep};
  color: ${colors.ash};
  border: 0.05em solid ${colors.blood};
  box-shadow:
    0 0 0 0.1em rgba(200, 144, 10, 0.4),
    0 0.6em 1.5em rgba(0, 0, 0, 0.6);
  font-family: ${fontDisplay};

  h2 {
    color: ${colors.ash};
    border-bottom: 0.15em solid ${colors.ember};
    padding-bottom: 0.3em;
    letter-spacing: 0.04em;
  }
`

const menuMainButton = css`
  background: ${colors.ember} !important;
  color: ${colors.bloodDeep} !important;
  border: 0.15em solid ${colors.emberDeep} !important;
  outline: none !important;

  &:hover:not(:disabled) {
    background: ${colors.emberDeep} !important;
    color: ${colors.ash} !important;
  }

  &:focus:not(:hover):not(:disabled) {
    background: ${colors.ember} !important;
    color: ${colors.bloodDeep} !important;
  }
`

const tutorialContainer = css`
  font-family: ${fontBody};
  font-size: 1.05em;
  color: ${colors.ash};
  background: ${colors.bloodDeep};

  h2, h3 {
    font-family: ${fontDisplay};
    color: ${colors.ash};
    letter-spacing: 0.04em;
  }

  strong, b { color: ${colors.ember}; }
`

export const theme: GameTheme = {
  ...defaultTheme,
  root: {
    ...defaultTheme.root,
    fontFamily: fontBody
  },
  palette: {
    primary: colors.blood,
    primaryHover: colors.bloodLight,
    primaryActive: colors.bloodDeep,
    primaryLight: colors.ash,
    primaryLighter: colors.ashSoft,
    surface: colors.bloodDeep,
    onSurface: colors.ash,
    onSurfaceFocus: '#5A1010',
    onSurfaceActive: '#6B1515',
    danger: '#C13737',
    dangerHover: '#9E2828',
    dangerActive: '#7A1E1E',
    disabled: '#6B6B6B'
  },
  buttons: buttonBase,
  dialog: {
    ...defaultTheme.dialog,
    backgroundColor: colors.bloodDeep,
    color: colors.ash,
    container: dialogContainer,
    buttons: buttonBase
  },
  journal: {
    ...(defaultTheme.journal ?? {}),
    historyEntry: journalHistoryEntry
  },
  header: {
    bar: headerBar,
    buttons: headerButtons
  },
  menu: {
    panel: menuPanel,
    mainButton: menuMainButton
  },
  playerPanel: {
    activeRingColors: [colors.ember, colors.blood]
  },
  tutorial: {
    container: tutorialContainer
  }
}
