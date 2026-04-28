import { css } from '@emotion/react'
import { ItemButtonProps, ItemMenuButton } from '@gamepark/react-game'
import { HTMLAttributes, ReactNode } from 'react'
import { colors } from './colors'
import { fontDisplay } from './typography'

type BloodSealMenuButtonProps = ItemButtonProps & HTMLAttributes<HTMLButtonElement> & {
  children: ReactNode
}

export const BloodSealMenuButton = (props: BloodSealMenuButtonProps) =>
  <ItemMenuButton css={bloodSealCss} {...props}/>

const bloodSealCss = css`
  width: 2.2em;
  height: 2.2em;
  border-radius: 50%;
  background: radial-gradient(circle at 35% 30%, ${colors.bloodLight} 0%, ${colors.blood} 50%, ${colors.bloodDeep} 100%);
  border: 0.12em solid ${colors.ember};
  color: ${colors.ash};
  box-shadow:
    0 0.18em 0.45em rgba(0, 0, 0, 0.85),
    0 0.05em 0.15em rgba(0, 0, 0, 0.9),
    inset 0 0.08em 0.15em rgba(255, 220, 200, 0.18),
    inset 0 -0.08em 0.15em rgba(0, 0, 0, 0.4);
  font-family: ${fontDisplay};
  font-size: 1em;
  transition: margin-top 0.15s, box-shadow 0.15s, border-color 0.15s;

  &:hover:not(:disabled) {
    margin-top: -0.15em;
    border-color: ${colors.arcane};
    box-shadow:
      0 0.3em 0.6em rgba(0, 0, 0, 0.85),
      0 0.05em 0.15em rgba(0, 0, 0, 0.9),
      0 0 0.5em rgba(77, 217, 224, 0.35),
      inset 0 0.08em 0.15em rgba(255, 220, 200, 0.25),
      inset 0 -0.08em 0.15em rgba(0, 0, 0, 0.4);
  }

  &:disabled {
    background: radial-gradient(circle at 35% 30%, #6b6b6b 0%, #4a4a4a 100%);
    border-color: #5a5040;
    color: #9a9489;
    box-shadow: 0 0.1em 0.25em rgba(0, 0, 0, 0.5);
    cursor: default;
  }

  > span {
    font-family: ${fontDisplay};
    font-size: 0.85em;
    font-weight: 600;
    color: ${colors.ash};
    background: linear-gradient(180deg, ${colors.bloodDeep} 0%, #2a0404 100%);
    border: 0.1em solid ${colors.ember};
    border-radius: 0.3em;
    padding: 0.25em 0.65em;
    box-shadow:
      0 0.15em 0.4em rgba(0, 0, 0, 0.85),
      0 0.05em 0.15em rgba(0, 0, 0, 0.9),
      inset 0 0.06em 0.12em rgba(255, 200, 150, 0.12);
    text-shadow: 0 0.06em 0 rgba(0, 0, 0, 0.6);
    letter-spacing: 0.04em;
    white-space: nowrap;
  }
`
