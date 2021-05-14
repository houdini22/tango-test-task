import React from 'react'
import { createPortal } from 'react-dom'
import classNames from 'classnames/bind'
import PropTypes from 'prop-types'
import { AppContext } from '../../../../index'
import { Link } from 'react-router-dom'
import _ from 'lodash'
import { FaAngleRight as ArrowRightIcon } from 'react-icons/fa'
import styles from '../../../../assets/scss/components/_dropdown.scss'

const cx = classNames.bind(styles)

export class DropdownContainer extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      isOpen: false,
      triggerElement: document.createElement('div'),
      triggerElementRegistered: false,
      itemsElement: document.createElement('div'),
      itemsElementRegistered: false,
    }
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside.bind(this))
  }

  componentWillUnmount() {
    document.removeEventListener(
      'mousedown',
      this.handleClickOutside.bind(this),
    )
  }

  handleClickOutside(event) {
    const { disableOutsideClick } = this.props

    if (!disableOutsideClick) {
      if (this.ref && !this.ref.contains(event.target)) {
        this.close()
      }
    }
  }

  open() {
    this.setState({ isOpen: true })
  }

  close() {
    this.setState({ isOpen: false })
  }

  registerTriggerElement(triggerElement) {
    const { triggerElementRegistered } = this.state
    if (!triggerElementRegistered) {
      this.setState({ triggerElement, triggerElementRegistered: true })
    }
  }

  registerItemsElement(itemsElement) {
    const { itemsElementRegistered } = this.state
    if (!itemsElementRegistered) {
      this.setState({ itemsElement, itemsElementRegistered: true })
    }
  }

  render() {
    const {
      children,
      size,
      triggerColor,
      color,
      triggerSize,
      trigger,
      placement,
      transparent,
    } = this.props
    const { isOpen, triggerElement, itemsElement } = this.state

    return (
      <AppContext.Consumer>
        {({ pageHeaderSize } = {}) => (
          <AppContext.Provider
            value={{
              dropdownOpen: this.open.bind(this),
              dropdownClose: this.close.bind(this),
              triggerElement,
              itemsElement,
              color,
              dropdownSize: size,
              dropdownTriggerSize: pageHeaderSize || triggerSize,
              dropdownTriggerColor: triggerColor,
              dropdownIsOpen: isOpen,
              dropdownTrigger: trigger,
              transparent,
            }}
          >
            <div
              className={cx('component-dropdown', {
                [`component-dropdown--size-${size}`]: size,
                [`component-dropdown--color-${color}`]: color,
                [`component-dropdown--placement-${placement}`]: true,
                'component-dropdown--transparent': transparent,
              })}
              ref={(e) => (this.ref = e)}
            >
              <div
                className={cx('component-dropdown__trigger')}
                ref={(e) => this.registerTriggerElement(e)}
              />
              <div
                className={cx('component-dropdown__dropdown-menu', {
                  'component-dropdown__dropdown-menu--is-open': isOpen,
                })}
                ref={(e) => this.registerItemsElement(e)}
              />
              {children}
            </div>
          </AppContext.Provider>
        )}
      </AppContext.Consumer>
    )
  }
}

DropdownContainer.propTypes = {
  size: PropTypes.string,
  color: PropTypes.string,
  triggerSize: PropTypes.string,
  triggerColor: PropTypes.string,
  disableOutsideClick: PropTypes.string,
  trigger: PropTypes.oneOf(['click', 'hover']),
  placement: PropTypes.string,
}

DropdownContainer.defaultProps = {
  size: 'md',
  color: 'default',
  trigger: 'click',
  disabledOutsideClick: false,
  placement: 'left',
}

export class DropdownTrigger extends React.Component {
  constructor(props) {
    super(props)

    this.handleOutsideHover = this.handleOutsideHover.bind(this)
  }

  componentDidMount() {
    document.addEventListener('mouseover', this.handleOutsideHover)
  }

  componentWillUnmount() {
    document.removeEventListener('mouseover', this.handleOutsideHover)
  }

  handleOutsideHover(e) {
    if (this.__reactstandin__isMounted) {
      if (this.dropdownTrigger === 'hover') {
        if (e.target) {
          if (
            !this.itemsElement.contains(e.target) &&
            !this.triggerElement.contains(e.target)
          ) {
            this.dropdownClose()
          }
        }
      }
    }
  }

  render() {
    const { component: Component, children, transparent } = this.props

    return (
      <AppContext.Consumer>
        {({
          triggerElement,
          itemsElement,
          dropdownSize,
          dropdownTriggerSize,
          dropdownTriggerColor,
          dropdownIsOpen,
          dropdownOpen,
          dropdownClose,
          dropdownTrigger,
        }) => {
          this.dropdownTrigger = dropdownTrigger
          this.itemsElement = itemsElement
          this.triggerElement = triggerElement
          this.dropdownClose = dropdownClose

          return createPortal(
            <Component
              arrow
              size={dropdownTriggerSize}
              color={dropdownTriggerColor}
              onClick={(e) => {
                e.preventDefault()

                if (dropdownTrigger === 'click') {
                  if (dropdownIsOpen) {
                    dropdownClose()
                  } else {
                    dropdownOpen()
                  }
                }
              }}
              onMouseEnter={(e) => {
                if (dropdownTrigger === 'hover') {
                  dropdownOpen()
                }
              }}
              transparent={transparent}
              disableContext
            >
              {children}
            </Component>,
            triggerElement,
          )
        }}
      </AppContext.Consumer>
    )
  }
}

DropdownTrigger.propTypes = {}

export class DropdownMenu extends React.Component {
  render() {
    const { children } = this.props

    return (
      <AppContext.Consumer>
        {({ itemsElement, setHasSubmenu }) => {
          if (_.isFunction(setHasSubmenu)) {
            setHasSubmenu()
          }

          const component = (
            <ul className={cx('component-dropdown__dropdown-menu__items')}>
              {children}
            </ul>
          )

          return createPortal(component, itemsElement)
        }}
      </AppContext.Consumer>
    )
  }
}

DropdownMenu.propTypes = {}

export class DropdownItem extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      itemsElementRegistered: false,
      itemsElement: document.createElement('div'),
      hasSubmenu: undefined,
    }
  }

  registerItemsElement(e) {
    const { itemsElementRegistered } = this.state
    if (!itemsElementRegistered) {
      this.setState({ itemsElementRegistered: true, itemsElement: e })
    }
  }

  setHasSubmenu() {
    const { hasSubmenu } = this.state
    if (_.isUndefined(hasSubmenu)) {
      this.setState({ hasSubmenu: true })
    }
  }

  render() {
    const { children, type, highlighted, href } = this.props
    const { itemsElement, hasSubmenu } = this.state

    const getComponent = () => {
      if (!_.isEmpty(href)) {
        return (
          <Link to={href}>
            <span>{children}</span>
          </Link>
        )
      }

      return (
        <a>
          <span>{children}</span>
        </a>
      )
    }

    return (
      <AppContext.Provider
        value={{
          itemsElement,
          setHasSubmenu: this.setHasSubmenu.bind(this),
        }}
      >
        <li
          className={cx('component-dropdown__dropdown-menu__items__item', {
            [`component-dropdown__dropdown-menu__items__item--type-${type}`]: type,
            [`component-dropdown__dropdown-menu__items__item--highlighted`]: highlighted,
          })}
        >
          <div
            className={cx(
              'component-dropdown__dropdown-menu__items__item__submenu',
            )}
            ref={(e) => this.registerItemsElement(e)}
          />
          {getComponent()}
          {hasSubmenu && (
            <ArrowRightIcon
              className={cx(
                'component-dropdown__dropdown-menu__items__item__sub-menu-icon',
              )}
            />
          )}
        </li>
      </AppContext.Provider>
    )
  }
}

DropdownItem.propTypes = {
  href: PropTypes.string,
  highlighted: PropTypes.bool,
  type: PropTypes.string,
}

export default { DropdownContainer }
