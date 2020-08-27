import { useRef, useEffect, useCallback, useState } from 'preact/hooks'

import { useFoundation } from '@pmwcs/base'
import { MDCTabBarFoundation } from '@material/tab-bar'

export const useTabBarFoundation = (
  props
) => {
  const [activeTabIndex, setActiveTabIndex] = useState(
    props.activeTabIndex || 0
  )
  const tabScrollerApi = useRef()
  const setTabScrollerApi = (api) =>
    (tabScrollerApi.current = api)

  const tabListRef = useRef([])

  const { foundation, ...elements } = useFoundation({
    props,
    elements: { rootEl: true },
    foundation: ({ rootEl, emit, getProps }) => {
      return new MDCTabBarFoundation({
        scrollTo: (scrollX) => {
          tabScrollerApi.current && tabScrollerApi.current.scrollTo(scrollX)
        },
        incrementScroll: (scrollXIncrement) => {
          tabScrollerApi.current?.incrementScroll(scrollXIncrement)
        },
        getScrollPosition: () =>
          tabScrollerApi.current?.getScrollPosition() || 0,
        getScrollContentWidth: () =>
          tabScrollerApi.current?.getScrollContentWidth() || 0,
        getOffsetWidth: () => (rootEl.ref ? rootEl.ref.offsetWidth : 0),
        isRTL: () =>
          !!rootEl.ref &&
          window.getComputedStyle(rootEl.ref).getPropertyValue('direction') ===
            'rtl',
        setActiveTab: (index) => {
          if (props.activeTabIndex === index ||
          props.activeTabIndex === undefined) {
            setActiveTabIndex(index)
          } else {
            // ignore clicks when using controlled tabs, but we still need to notify
            // to trigger the callback
            // @ts-ignore ignoring unsafe protected access
            foundation.adapter.notifyTabActivated(index)
          }
        },
        activateTabAtIndex: (index, clientRect) => {
          tabListRef.current[index] &&
            tabListRef.current[index].activate(clientRect)
        },
        deactivateTabAtIndex: (index) =>
          tabListRef.current[index] && tabListRef.current[index].deactivate(),
        focusTabAtIndex: (index) => tabListRef.current[index].focus(),
        getTabIndicatorClientRectAtIndex: (index) =>
          tabListRef.current[index] &&
          tabListRef.current[index].computeIndicatorClientRect(),
        getTabDimensionsAtIndex: (index) =>
          tabListRef.current[index] &&
          tabListRef.current[index].computeDimensions(),
        getPreviousActiveTabIndex: () => {
          for (let i = 0; i < tabListRef.current.length; i++) {
            if (tabListRef.current[i].getActive()) {
              return i
            }
          }
          return -1
        },
        getFocusedTabIndex: () => {
          const tabElements = [].slice.call(
            rootEl.ref?.querySelectorAll(
              MDCTabBarFoundation.strings.TAB_SELECTOR
            )
          )
          const activeElement = document.activeElement
          return tabElements ? tabElements.indexOf(activeElement) : -1
        },
        getIndexOfTabById: (id) => {
          for (let i = 0; i < tabListRef.current.length; i++) {
            if (tabListRef.current[i].id === id) {
              return i
            }
          }
          return -1
        },
        getTabListLength: () => tabListRef.current.length,
        notifyTabActivated: (index) =>
          emit('onActivate', { index }, true)
      })
    }
  })

  const { rootEl } = elements

  const registerTab = (tab) => {
    tabListRef.current.push(tab)
    tabListRef.current.sort((a, b) => a.getIndex() - b.getIndex())
  }

  const unregisterTab = (tab) => {
    tabListRef.current.splice(tabListRef.current.indexOf(tab), 1)
    tabListRef.current.sort((a, b) => a.getIndex() - b.getIndex())
  }

  const handleTabInteraction = useCallback(
    (evt) => {
      foundation.handleTabInteraction(evt)
    },
    [foundation]
  )

  const handleKeyDown = (evt) => {
    props.onKeyDown?.(evt)
    foundation.handleKeyDown(evt)
  }

  rootEl.setProp('onKeyDown', handleKeyDown, true)

  // sync active tab index
  useEffect(() => {
    props.activeTabIndex !== undefined &&
      setActiveTabIndex(props.activeTabIndex)
  }, [props.activeTabIndex])

  // activate tabs
  useEffect(() => {
    const index = activeTabIndex

    // @ts-ignore ignoring unsafe protected access
    const adapter = foundation.adapter
    const previousActiveIndex = adapter.getPreviousActiveTabIndex()

    // @ts-ignore private method access
    if (!foundation.indexIsInRange_(index) || index === previousActiveIndex) {
      return
    }

    adapter.notifyTabActivated(index)

    window.requestAnimationFrame(() => {
      adapter.activateTabAtIndex(
        index,
        adapter.getTabIndicatorClientRectAtIndex(previousActiveIndex)
      )
      foundation.scrollIntoView(index)
    })

    return () => {
      window.requestAnimationFrame(() => {
        adapter.deactivateTabAtIndex(index)
      })
    }
  }, [activeTabIndex, foundation])

  // on mount
  useEffect(() => {
    // This corrects an issue where passing in 0 or no activeTabIndex
    // causes the first tab of the set to not be active

    // to make this even more annoying, Tabs focus by default
    // restore the focus and scroll position after we activate the tab
    const activeElement = window.document.activeElement
    const [scrollX, scrollY] = [window.scrollX, window.scrollY]

    // restore focus and scroll
    window.requestAnimationFrame(() => {
      activeElement && activeElement.focus()
      window.scrollTo(scrollX, scrollY)
    })
  }, [])

  return {
    ...elements,
    setTabScrollerApi,
    handleTabInteraction,
    registerTab,
    unregisterTab
  }
}
