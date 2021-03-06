import { h, cloneElement } from 'preact'

import { Tag, useClassNames, createComponent } from '@pmwcs/base'

/**
 * The ButtonGroup component.
 */
export const ButtonGroup = createComponent(function ButtonGroup (props, ref) {
  const {
    raised,
    outlined,
    unelevated,
    dense,
    secondary,
    standard,
    ripple,
    children,
    ...rest
  } = props

  const isFilled = unelevated || raised

  const className = useClassNames(props, [
    'pmwc-button-group',
    {
      'mdc-theme--standard-bg': standard && isFilled,
      'mdc-theme--on-standard': standard,
      'pmwc-button-group--raised': raised,
      'pmwc-button-group--dense': dense
    }
  ])

  return (
    <Tag tag='div' {...rest} className={className} ref={ref}>
      {children.map(element => cloneElement(element, {
        outlined,
        unelevated: isFilled,
        dense,
        secondary,
        ripple,
        standard
      }))}
    </Tag>
  )
})
