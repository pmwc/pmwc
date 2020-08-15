/** @jsx h */
import { h } from 'preact'
import { useState, useRef, useEffect } from 'preact/hooks'
import './styles.js'
import { MDCMenu } from '@material/menu'

import {
  Menu,
  MenuItem,
  MenuSurface,
  MenuSurfaceAnchor,
  SimpleMenu,
  SimpleMenuSurface
} from './index.js'

import { ListDivider } from '@pmwc/list'
import { Button } from '@pmwc/button'
import { IconButton } from '@pmwc/icon-button'
import { Select } from '@pmwc/select'
import { Checkbox } from '@pmwc/checkbox'

export default {
  title: 'Menu',
  component: Menu
}

// eslint-disable-next-line no-unused-vars
const plainHtml = () => {
  function Plain () {
    const menuRef = useRef(null)
    useEffect(() => {
      const menu = new MDCMenu(menuRef.current)
      menu.open = true
    }, [menuRef])

    return (
      <div ref={menuRef} class='mdc-menu mdc-menu-surface'>
        <ul class='mdc-list' role='menu' aria-hidden='true' aria-orientation='vertical' tabindex='-1'>
          <li class='mdc-list-item' role='menuitem'>
            <span class='mdc-list-item__ripple' />
            <span class='mdc-list-item__text'>A Menu Item</span>
          </li>
          <li class='mdc-list-item' role='menuitem'>
            <span class='mdc-list-item__ripple' />
            <span class='mdc-list-item__text'>Another Menu Item</span>
          </li>
        </ul>
      </div>
    )
  }

  return <Plain />
}

export const basic = () => {
  function Example () {
    const [open, setOpen] = useState(true)

    return (
      <MenuSurfaceAnchor>
        <Menu
          open={open}
          onSelect={evt => console.log(evt.detail.index)}
          onClose={evt => setOpen(false)}
        >
          <MenuItem>Cookies</MenuItem>
          <MenuItem>Pizza</MenuItem>
          {/** MenuItem is just a ListItem, so you can intermingle other List components */}
          <ListDivider />
          <MenuItem>Icecream</MenuItem>
        </Menu>

        <Button raised onClick={evt => setOpen(!open)}>
          Menu
        </Button>
      </MenuSurfaceAnchor>
    )
  }

  return <Example />
}

export const example = () => {
  function Example () {
    const [open, setOpen] = useState(false)

    return (
      <MenuSurfaceAnchor>
        <MenuSurface open={open} onClose={evt => setOpen(false)}>
          <div style={{ padding: '1rem', width: '8rem' }}>
            Make the content whatever you want.
          </div>
        </MenuSurface>

        <Button raised onClick={evt => setOpen(!open)}>
          Menu Surface
        </Button>
      </MenuSurfaceAnchor>
    )
  }
  return <Example />
}

export const other = () => {
  function Example () {
    const [open, setOpen] = useState(false)

    return (
      <MenuSurfaceAnchor>
        <MenuSurface open={open} onClose={evt => setOpen(false)}>
          <div style={{ padding: '1rem', width: '8rem' }}>Menu</div>
        </MenuSurface>
        {/** The handle can be any component you want */}
        <IconButton icon='menu' onClick={evt => setOpen(!open)} />
      </MenuSurfaceAnchor>
    )
  }

  return <Example />
}

export const simplified = () => (
  <section>
    <SimpleMenu handle={<Button>Simple Menu</Button>}>
      <MenuItem>Cookies</MenuItem>
      <MenuItem>Pizza</MenuItem>
      <MenuItem>Icecream</MenuItem>
    </SimpleMenu>

    <p>SimpleMenuSurface</p>

    <SimpleMenuSurface handle={<Button>Simple Menu Surface</Button>}>
      <div style={{ padding: '1rem', width: '8rem' }}>
        Make the content whatever you want.
      </div>
    </SimpleMenuSurface>
  </section>
)

export const anchoring = () => {
  function Example () {
    const [anchorCorner, setAnchorCorner] = useState(
      'topLeft'
    )

    return (
      <section>
        <MenuSurfaceAnchor>
          <MenuSurface anchorCorner={anchorCorner} open>
            <div style={{ padding: '1rem', width: '8rem' }}>
              anchorCorner: {anchorCorner}
            </div>
          </MenuSurface>
          <Button raised label='Anchored Menu' />
        </MenuSurfaceAnchor>

        <Select
          value={anchorCorner}
          label='anchorCorner'
          onChange={evt => setAnchorCorner(evt.currentTarget.value)}
          options={[
            'topLeft',
            'topRight',
            'bottomLeft',
            'bottomRight',
            'topStart',
            'topEnd',
            'bottomStart',
            'bottomEnd'
          ]}
        />
      </section>
    )
  }
  return <Example />
}

export const renderThroughPortals = () => {
  function Example () {
    const [renderToPortal, setRenderToPortal] = useState(true)
    const options = ['Cookies', 'Pizza', 'Icecream']
    return (
      <section>
        <div
          style={{
            marginBottom: '10rem',
            height: '3.5rem',
            overflow: 'hidden'
          }}
        >
          <MenuSurfaceAnchor>
            <Button raised>Open Menu</Button>
            <Menu open renderToPortal={renderToPortal}>
              {options.map(o => (
                <MenuItem key={o}>{o}</MenuItem>
              ))}
            </Menu>
          </MenuSurfaceAnchor>
        </div>
        <Checkbox
          checked={renderToPortal}
          onChange={evt => setRenderToPortal(evt.currentTarget.checked)}
          label='renderToPortal'
        />
      </section>
    )
  }
  return <Example />
}
