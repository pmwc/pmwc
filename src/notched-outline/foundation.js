import { useEffect, useRef } from 'preact/hooks'
import { useFoundation } from '@pmwcs/base'
import { MDCNotchedOutlineFoundation } from '@material/notched-outline'

export const useNotchedOutlineFoundation = (props) => {
  const { foundation, ...elements } = useFoundation({
    props,
    elements: {
      rootEl: true,
      notchedEl: true
    },
    foundation: ({ rootEl, notchedEl }) => {
      return new MDCNotchedOutlineFoundation({
        addClass: (className) => rootEl.addClass(className),
        removeClass: (className) => rootEl.removeClass(className),
        setNotchWidthProperty: (width) =>
          notchedEl.setStyle('width', width + 'px'),
        removeNotchWidthProperty: () => notchedEl.setStyle('width', '')
      })
    }
  })

  const { rootEl } = elements
  const labelRef = useRef()

  useEffect(() => {
    props.notch ? foundation.notch(props.notch) : foundation.closeNotch()
  }, [props.notch, foundation])

  useEffect(() => {
    labelRef.current =
      rootEl.ref?.querySelector('.mdc-floating-label') || undefined
    const label = labelRef.current

    if (label) {
      label.style.transitionDuration = '0s'
      rootEl.addClass(MDCNotchedOutlineFoundation.cssClasses.OUTLINE_UPGRADED)
      requestAnimationFrame(() => {
        label && (label.style.transitionDuration = '')
      })
    } else {
      rootEl.addClass(MDCNotchedOutlineFoundation.cssClasses.NO_LABEL)
    }
  }, [rootEl])

  return { foundation, ...elements }
}
