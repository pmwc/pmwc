/** @jsx h */
import 'preact/debug'
import { h } from 'preact'
import { useState, useRef, useEffect } from 'preact/hooks'
import { action } from '@storybook/addon-actions'
import './styles.js'
import { MDCSelect } from '@material/select'

import {
  Select
} from './index.js'

export default {
  title: 'Select',
  component: Select
}

function Br () {
  return (
    <div style={{ height: '2em', width: '100%' }}>
      {' '}
    </div>
  )
}

// eslint-disable-next-line no-unused-vars
const plainHtml = () => {
  function Plain () {
    const selectRef = useRef(null)
    useEffect(() => {
      // console.log(selectRef.current)
      const select = new MDCSelect(selectRef.current)
      // debugger
      select.listen('MDCSelect:change', () => {
        action('plain')(`Selected option at index ${select.selectedIndex} with value "${select.value}"`)
      })
    }, [selectRef])

    return (
      <div ref={selectRef} class='mdc-select mdc-select--filled '>
        <div class='mdc-select__anchor'>
          <span class='mdc-select__ripple' />
          <span class='mdc-select__selected-text'>Selected</span>
          <span class='mdc-select__dropdown-icon'>
            <svg
              class='mdc-select__dropdown-icon-graphic'
              viewBox='7 10 10 5'
            >
              <polygon
                class='mdc-select__dropdown-icon-inactive'
                stroke='none'
                fill-rule='evenodd'
                points='7 10 12 15 17 10'
              />
              <polygon
                class='mdc-select__dropdown-icon-active'
                stroke='none'
                fill-rule='evenodd'
                points='7 15 12 10 17 15'
              />
            </svg>
          </span>
          <span class='mdc-floating-label mdc-floating-label--float-above'>Pick a Food Group</span>
          <span class='mdc-line-ripple' />
        </div>

        <div class='mdc-select__menu mdc-menu mdc-menu-surface mdc-menu-surface--fullwidth'>
          <ul class='mdc-list'>
            <li class='mdc-list-item mdc-list-item--selected' data-value=''>
              <span class='mdc-list-item__ripple' />
            </li>
            <li class='mdc-list-item' data-value='grains'>
              <span class='mdc-list-item__ripple' />
              <span class='mdc-list-item__text'>Bread, Cereal, Rice, and Pasta</span>
            </li>
            <li class='mdc-list-item' data-value='vegetables'>
              <span class='mdc-list-item__ripple' />
              <span class='mdc-list-item__text'>Vegetables</span>
            </li>
            <li class='mdc-list-item' data-value='fruit'>
              <span class='mdc-list-item__ripple' />
              <span class='mdc-list-item__text'>Fruit</span>
            </li>
          </ul>
        </div>
      </div>
    )
  }

  return <Plain />
}

export const basic = () => (
  <section className='mdc-typography'>
    <Select
      label='Standard'
      options={['Cookies', 'Pizza', 'Icecream']}
      onChange={(evt) => action('Standard')(evt.currentTarget.value)}
    />

    <Br />
    {/* outlined */}
    <Select
      label='Outlined'
      options={['Cookies', 'Pizza', 'Icecream']}
      outlined
      onChange={(evt) => action('Outlined')(evt.currentTarget.value)}
    />

    <Br />
    {/* with help text */}
    <Select
      label='With Icon'
      options={['Cookies', 'Pizza', 'Icecream']}
      defaultValue='Pizza'
      helpText='Choose your favorite snack...'
      icon='favorite'
      onChange={(evt) => action('With Icon')(evt.currentTarget.value)}
    />

    <Br />
    {/* no label */}
    <Select
      options={['Cookies', 'Pizza', 'Icecream']}
      onChange={(evt) => action('Standard')(evt.currentTarget.value)}
    />
  </section>
)

export const enhanced = () => (
  <section>
    <Select
      label='Standard'
      options={['Cookies', 'Pizza', 'Icecream']}
      enhanced
      onChange={(evt) => action('Standard')(evt.currentTarget.value)}
    />
    <Br />

    <Select
      label='Outlined'
      options={['Cookies', 'Pizza', 'Icecream']}
      outlined
      enhanced
      onChange={(evt) => action('Outlined')(evt.currentTarget.value)}
    />
    <Br />

    <Select
      label='With Icon'
      options={['Cookies', 'Pizza', 'Icecream']}
      defaultValue='Pizza'
      helpText='Choose your favorite snack...'
      icon='favorite'
      enhanced
      onChange={(evt) => action('With Icon')(evt.currentTarget.value)}
    />
  </section>
)

export const validation = () => (
  <section>
    <Select
      label='Required'
      required
      options={['Cookies', 'Pizza', 'Icecream']}
    />
    <Br />

    <Select
      label='Invalid'
      invalid
      options={['Cookies', 'Pizza', 'Icecream']}
    />
    <Br />

    <Select
      label='Disabled'
      disabled
      options={['Cookies', 'Pizza', 'Icecream']}
    />
    <Br />

  </section>
)

export const controlled = () => {
  const initialValue = (option) => typeof option === 'object'
    ? option.value
    : option

  function Controlled (props) {
    const [value, setValue] = useState(initialValue(props.options[0]))
    console.log(value, typeof value)
    return (
      <Select
        {...props}
        value={value}
        onChange={(evt) => {
          action('Controlled')(evt.currentTarget.value)
          setValue(evt.currentTarget.value)
        }}
      />
    )
  }

  return (
    <section>
      <Controlled
        label='Controlled'
        options={['Cookies', 'Pizza', 'Icecream']}
      />
      <Br />

      <Controlled
        label='Controlled only numbers'
        options={[
          { value: 4, label: 'Cookies' },
          { value: 7, label: 'Pizza' },
          { value: 8, label: 'Icecream' }
        ]}
      />
      <Br />

      <Controlled
        enhanced
        label='Enhanced only numbers'
        options={[
          { value: 4, label: 'Cookies' },
          { value: 7, label: 'Pizza' },
          { value: 8, label: 'Icecream' }
        ]}
      />
      <Br />

      <Select
        label='Uncontrolled'
        options={['Cookies', 'Pizza', 'Icecream']}
        defaultValue='Cookies'
        onChange={(evt) => {
          action('Uncontrolled')(evt.currentTarget.value)
        }}
      />
    </section>
  )
}

export const small = () => (
  <section className='mdc-typography'>
    <p>size='small'</p>
    <Select
      size='small'
      label='Standard'
      options={['Cookies', 'Pizza', 'Icecream']}
      onChange={(evt) => action('Standard')(evt.currentTarget.value)}
    />

    <p>size='small' noBorder placeholder='--Order--'</p>
    <Select
      size='small'
      noBorder
      placeholder='--Order--'
      style={{ minWidth: '4rem' }}
      label='Standard'
      options={['Cookies', 'Pizza', 'Icecream']}
      onChange={(evt) => action('Standard')(evt.currentTarget.value)}
    />

    <p>size='small' noBorder enhanced</p>
    <Select
      size='small'
      noBorder
      enhanced
      label='Standard'
      options={['Cookies', 'Pizza', 'Icecream']}
      onChange={(evt) => action('Standard')(evt.currentTarget.value)}
    />

    <p>size='small' outlined</p>
    <Select
      size='small'
      outlined
      label='Standard'
      options={['Cookies', 'Pizza', 'Icecream']}
      onChange={(evt) => action('Standard')(evt.currentTarget.value)}
    />
  </section>
)
