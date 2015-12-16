import events from 'add-event-listener';
import React, {PropTypes} from 'react';

import Center from '../Center';

import styles from './Modal.less';

/**
 * Модальное окно.
 */
class Modal extends React.Component {
  static propTypes = {
    /**
     * Не показывать крестик для закрытия окна.
     */
    noClose: PropTypes.bool,

    width: PropTypes.number,

    /**
     * Вызывается, когда пользователь запросил закрытие окна (нажал на фон, на
     * Escape или на крестик).
     */
    onClose: PropTypes.func,
  };

  constructor(props, context) {
    super(props, context);
  }

  render() {
    var close = null;
    if (!this.props.noClose) {
      close = (
        <a href="javascript:" className={styles.close}
          onClick={this.handleClose}
        >
          &times;
        </a>
      );
    }

    const style = {};
    if (this.props.width) {
      style.width = this.props.width;
    }

    return (
      <Center className={styles.root}>
        <div className={styles.bg} onClick={this.handleClose} />
        <div className={styles.window} style={style}>
          {close}
          {this.props.children}
        </div>
      </Center>
    );
  }

  componentDidMount() {
    events.addEventListener(document, 'keydown', this.handleNativeKey);
  }

  componentWillUnmount() {
    events.removeEventListener(document, 'keydown', this.handleNativeKey);
  }

  handleClose = event => {
    if (this.props.onClose) {
      this.props.onClose();
    }
  };

  handleNativeKey = event => {
    if (event.keyCode === 27 && this.props.onClose) {
      event.stopPropagation();
      this.props.onClose();
    }
  };
}

class Header extends React.Component {
  render() {
    return <div className={styles.header}>{this.props.children}</div>;
  }
}

class Body extends React.Component {
  render() {
    return <div className={styles.body}>{this.props.children}</div>;
  }
}

class Footer extends React.Component {
  render() {
    return <div className={styles.footer}>{this.props.children}</div>;
  }
}

Modal.Header = Header;
Modal.Body = Body;
Modal.Footer = Footer;

module.exports = Modal;
