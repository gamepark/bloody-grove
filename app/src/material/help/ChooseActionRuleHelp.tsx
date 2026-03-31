import { Trans } from 'react-i18next'
import { components } from './utils.tsx'

export const ChooseActionRuleHelp = () => {
  return (
    <div>
      <h2><Trans i18nKey="help.rule.title" /></h2>
      <p>
        <Trans i18nKey="help.rule.intro" />
      </p>

      <h3><Trans i18nKey="help.rule.invoke-title" /></h3>
      <p>
        <Trans
          i18nKey="help.rule.invoke-1"
          components={{ ...components, bold: <strong/> }}
        />
      </p>
      <p>
        <Trans
          i18nKey="help.rule.invoke-2"
          components={components}
        />
      </p>
      <p>
        <Trans
          i18nKey="help.rule.invoke-3"
          components={components}
        />
      </p>

      <h3><Trans i18nKey="help.rule.transform-title" /></h3>
      <p>
        <Trans
          i18nKey="help.rule.transform-1"
        />
      </p>
      <p>
        <Trans
          i18nKey="help.rule.transform-2"
          components={components}
        />
      </p>
      <p>
        <Trans
          i18nKey="help.rule.transform-3"
        />
      </p>
      <p>
        <Trans
          i18nKey="help.rule.transform-4"
          components={{ ...components, bold: <strong/> }}
        />
      </p>

      <p>
        <Trans
          i18nKey="help.rule.conclusion"
        />
      </p>
    </div>
  )
}
