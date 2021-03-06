import { h } from 'preact'
import { memo, forwardRef } from 'preact/compat'

import { Tag, useClassNames, mergeRefs, createComponent } from '@pmwcs/base'
import { withRipple } from '@pmwcs/ripple'
import { useRadioFoundation } from './foundation'

/*********************************************************************
 * Radio
 *********************************************************************/

/** A Radio button component. */
export const Radio = createComponent(function Radio (props, ref) {
  const { renderToggle, id, toggleRootProps, rootEl } = useRadioFoundation(
    props
  )

  const {
    children,
    className,
    label,
    style,
    inputRef,
    foundationRef,
    primary,
    ...rest
  } = props

  const radio = (
    <RadioRoot
      {...rootEl.props(toggleRootProps)}
      primary={primary}
      ref={mergeRefs(rootEl.setRef, ref)}
    >
      <input
        {...rest}
        className='mdc-radio__native-control'
        type='radio'
        id={id}
        ref={inputRef}
      />
      <RadioBackground />
      <RadioRipple />
    </RadioRoot>
  )

  return renderToggle(radio)
})

/*********************************************************************
 * Bits
 *********************************************************************/

const RadioRipple = memo(function RadioRipple () {
  return <div className='mdc-radio__ripple' />
})

const RadioRoot = withRipple({
  surface: false,
  unbounded: true
})(
  forwardRef(function RadioRoot (
    props,
    ref
  ) {
    const { disabled, primary, ...rest } = props
    const className = useClassNames(props, [
      'mdc-radio',
      {
        'mdc-radio--disabled': disabled,
        'mdc-radio--primary': primary
      }
    ])
    return <Tag {...rest} className={className} ref={ref} />
  })
)

const RadioBackground = memo(function RadioBackground () {
  return (
    <div className='mdc-radio__background'>
      <div className='mdc-radio__outer-circle' />
      <div className='mdc-radio__inner-circle' />
    </div>
  )
})
