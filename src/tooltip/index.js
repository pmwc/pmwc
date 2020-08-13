import { h, Fragment } from 'preact';

import { Tag, classNames } from '@pmwc/base';
import { useProviderContext } from '@pmwc/provider';

/** A Tooltip component for displaying informative popover information. */
export const Tooltip = function Tooltip({
  children,
  content,
  className,
  open,
  tag = 'span',
  ...rest
}) {
  const providerContext = useProviderContext();

  // merge together provider options
  const {
    showArrow = false,
    enterDelay = 0,
    leaveDelay = 0,
    align = 'top',
    activateOn = ['hover', 'focus']
  } = {
    ...providerContext.tooltip,
    ...rest
  };

  return (
    <Tooltip
      {...(open !== undefined ? { visible: open } : {})}
      trigger={Array.isArray(activateOn) ? activateOn : [activateOn]}
      prefixCls="pmwc-tooltip"
      placement={align}
      transitionName="pmwc-tooltip-zoom"
      mouseEnterDelay={enterDelay / 1000}
      mouseLeaveDelay={leaveDelay / 1000}
      overlay={content}
      overlayClassName={classNames(className, {
        'pmwc-tooltip--show-arrow': showArrow
      })}
      destroyTooltipOnHide
    >
      {children}
    </Tooltip>
  );
};
