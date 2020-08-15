import { h } from 'preact'
import { mount } from 'enzyme'
import {
  Snackbar,
  SnackbarAction,
  createSnackbarQueue,
  SnackbarQueue
} from './'
import { wait } from '@pmwc/base/utils/test-utils'

describe('Snackbar', () => {
  it('renders', (done) => {
    const el = mount(
      <Snackbar
        open
        timeout={1000}
        onClose={() => {}}
        message='This is a new message'
        action={<div />}
      />
    )

    setTimeout(() => {
      expect(!!~el.html().search('mdc-snackbar')).toBe(true)
      done()
    }, 1500)
  })

  it('can be leading', () => {
    const el = mount(<Snackbar open message='This is a new message' leading />)
    expect(!!~el.html().search('mdc-snackbar--leading')).toBe(true)
  })

  it('can have an icon', () => {
    const el = mount(
      <Snackbar icon='favorite' open message='This is a new message' leading />
    )
    expect(!!~el.html().search('favorite')).toBe(true)
  })

  it('can be multiline', () => {
    mount(<Snackbar open message='This is a new message' />)
  })

  it('can dismissesOnAction', () => {
    const el = mount(
      <Snackbar open message='This is a new message' dismissesOnAction />
    )
    el.setProps({ dismissesOnAction: false })
  })

  it('can be have JSX', () => {
    mount(
      <Snackbar>
        <div>Hello World</div>
      </Snackbar>
    )

    mount(<Snackbar message={<div>Hello World</div>} />)
  })

  it('handles events', () => {
    const el = mount(
      <Snackbar
        open
        timeout={1000}
        onClose={() => {}}
        message='This is a new message'
        dismissIcon
        action={<SnackbarAction label='foo' />}
      />
    )
    // el.simulate('keydown')
    el.find('div').first().simulate('keydown')

    const surface = el.find('div.mdc-snackbar__surface')
    surface.simulate('click')

    const action = el.find('button.mdc-snackbar__action').first()
    action.simulate('click')

    const dismiss = el.find('i.mdc-snackbar__dismiss').first()
    dismiss.simulate('click')
  })
})

describe('SnackbarQueue', () => {
  it('renders', () => {
    const queue = createSnackbarQueue()
    const el = mount(<SnackbarQueue messages={queue.messages} />)
    el.unmount()
  })

  it('notifies', async (done) => {
    const queue = createSnackbarQueue()
    const el = mount(<SnackbarQueue messages={queue.messages} />)
    // check multiple notifications
    queue.notify({
      title: 'myNotificationTitle1',
      body: 'myNotificationBody1',
      timeout: 500,
      onClose: () => {}
    })

    queue.notify({
      title: 'myNotificationTitle2',
      body: 'myNotificationBody2',
      timeout: 500,
      image: 'test',
      actions: [
        {
          // NotificationAction api format
          title: 'Fix It!',
          icon: 'close',
          action: 'fixit' // action will be available as evt.detail.reason in the onClose event
        },
        {
          // OR SnackbarActionProps format
          label: 'Continue...',
          icon: 'check',
          onClick: () => {}
        }
      ]
    })

    await wait(500)

    expect(el.html().includes('myNotificationTitle1')).toBe(true)
    expect(el.html().includes('myNotificationBody1')).toBe(true)

    setTimeout(() => {
      expect(el.html().includes('myNotificationTitle2')).toBe(true)
      expect(el.html().includes('myNotificationBody2')).toBe(true)
      done()
    }, 800)
  })
})
