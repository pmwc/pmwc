import { AnyComponent } from 'preact'
import { WithRippleProps } from '@pmwc/ripple'
import { HTMLProps } from '@pmwc/base'

/**
 * The ButtonGroup component.
 */
export interface ButtonGroupProps extends WithRippleProps, HTMLProps {
  /** Make the Buttons in the ButtonGroup dense. */
  dense?: boolean;
  /** Make the Buttons in the ButtonGroup raised. */
  raised?: boolean;
  /** Make the buttons in the ButtonGroup unelevated. */
  unelevated?: boolean;
  /** Make the buttons in the ButtonGroup outlined. */
  outlined?: boolean;
  /** Choose secondary theme. */
  secondary?: boolean;
  /** Buttons specified as children. */
  children?: AnyComponent;
  /** additional class name */
  className?: string;
  /** additional styling */
  style?: { [key: string]: any };
}

/**
 * The ButtonGroup component.
 */
export const ButtonGroup: AnyComponent<ButtonGroupProps> = () => {}
