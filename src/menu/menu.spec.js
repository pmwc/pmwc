import { h } from 'preact'
import { mount } from 'enzyme'
import {
  MenuSurfaceAnchor,
  Menu,
  MenuSurface,
  MenuItem,
  SimpleMenu,
  SimpleMenuSurface
} from './'
import { wait } from '../test-utils'

describe('Menu', () => {
  it('renders', () => {
    const el = mount(
      <Menu open onClose={() => {}}>
        <MenuItem>Cookies</MenuItem>
        <MenuItem>Pizza</MenuItem>
        <MenuItem>Icecream</MenuItem>
      </Menu>
    )

    el.setProps({ open: false, anchorCorner: 'bottomRight' })
  })

  it('can be fixed', () => {
    const el = mount(
      <MenuSurfaceAnchor>
        <button>Test</button>

        <Menu open fixed>
          <MenuItem>Cookies</MenuItem>
          <MenuItem>Pizza</MenuItem>
          <MenuItem>Icecream</MenuItem>
        </Menu>
      </MenuSurfaceAnchor>
    )

    expect(el.html().includes('mdc-menu-surface--fixed')).toBe(true)
  })

  it('dynamically updates aria-hidden based on whether or not the menu is open', () => {
    let el = mount(<Menu open />)

    expect(el.find(MenuSurface).prop('aria-hidden')).toBe(false)

    el = mount(<Menu />)

    expect(el.find(MenuSurface).prop('aria-hidden')).toBe(true)
  })

  it('MenuSurface renders', () => {
    mount(
      <MenuSurfaceAnchor>
        <button>Test</button>

        <MenuSurface open onClose={() => {}}>
          <MenuItem>Cookies</MenuItem>
          <MenuItem>Pizza</MenuItem>
          <MenuItem>Icecream</MenuItem>
        </MenuSurface>
      </MenuSurfaceAnchor>
    )
  })

  // FIXME: event bubbling in enzyme does not work
  it.skip('SimpleMenu renders', (done) => {
    let val = 0

    const el = mount(
      <SimpleMenu handle={<button>Test</button>} open onClose={() => val++}>
        <MenuItem>Cookies</MenuItem>
        <MenuItem>Pizza</MenuItem>
        <MenuItem>Icecream</MenuItem>
      </SimpleMenu>
    )

    // console.log(el.debug())
    el.find('li.mdc-list-item').first().simulate('click')
    setTimeout(() => {
      expect(val).toBe(1)
      done()
    }, 300)
  })

  // FIXME: event bubbling in enzyme does not work
  it.skip('Menu Item can be nested', async () => {
    let val = null

    const el = mount(
      <SimpleMenu
        handle={<button>Test</button>}
        open
        onSelect={(evt) => (val = evt.detail.index)}
      >
        <MenuItem>
          <span>Cookies</span>
        </MenuItem>
        <MenuItem>
          <span>Pizza</span>
        </MenuItem>
        <MenuItem>
          <span>Icecream</span>
        </MenuItem>
      </SimpleMenu>
    )

    el.find('li.mdc-list-item').last().simulate('click')
    await wait(300)
    expect(val).toBe(2)
  })

  it('SimpleMenuSurface renders', (done) => {
    let val = 0

    const el = mount(
      <SimpleMenuSurface
        handle={<button onClick={() => {}}>Test</button>}
        onClose={() => {
          val++
        }}
      >
        <div>Hello</div>
      </SimpleMenuSurface>
    )

    const button = el.find('button').first()
    button.simulate('click')

    setTimeout(() => {
      el.setProps({ anchorCorner: 'bottomRight' })
      button.simulate('click')

      setTimeout(() => {
        expect(val).toBe(1)
      }, 200)
      done()
    }, 200)
  })

  it('can have custom classnames', () => {
    [MenuSurfaceAnchor, Menu, MenuItem].forEach(
      (Component) => {
        const el = mount(<Component className='my-custom-classname' />)
        expect(!!~el.html().search('my-custom-classname')).toEqual(true)
      }
    )
  })
})
