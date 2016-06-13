import React, { PropTypes } from 'react';

const maskStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.35)',
  cursor: 'pointer',
  transition: 'opacity 0.3s ease',
};

const buttonStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  width: 60,
  height: 60,
  margin: -30,
  borderRadius: 30,
  backgroundColor: '#fff',
};

const commonBarStyle = {
  position: 'absolute',
  width: 0,
  height: 0,
  borderStyle: 'solid',
  transition: 'all 0.4s cubic-bezier(0, 0, 0.1, 1)',
};

const startButton = {
  leftBar: {
    left: 21,
    top: 15,
    borderWidth: '15px 0 0 25px',
    borderColor: 'transparent transparent transparent #999',
  },
  rightBar: {
    left: 21,
    top: 30,
    borderWidth: '15px 25px 0 0',
    borderColor: '#999 transparent transparent transparent',
  },
};

const pauseButton = {
  leftBar: {
    left: 20,
    top: 15,
    height: 30,
  },
  rightBar: {
    left: 36,
    top: 15,
    height: 30,
  },
};

export default class Mask extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: props.defaultVisible,
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const visible = this.state.visible;
    this.setState({
      visible: !visible
    });

    // If mask is visible now, the video is going to play. Otherwise...
    const shouldPlay = visible;
    this.props.onClick(shouldPlay);
  }

  getLeftBarStyle() {
    const style = this.state.visible ? startButton.leftBar : pauseButton.leftBar
    return { ...commonBarStyle, ...style };
  }

  getRightBarStyle() {
    const style = this.state.visible ? startButton.rightBar : pauseButton.rightBar;
    return { ...commonBarStyle, ...style };
  }

  render() {
    const style = {
      ...maskStyle,
      opacity: this.state.visible ? 1 : 0,
    };

    return (
      <section style={style} onClick={this.handleClick}>
        <div style={buttonStyle}>
          <div style={this.getLeftBarStyle()} ref="leftBar" />
          <div style={this.getRightBarStyle()} ref="rightBar" />
        </div>
      </section>
    );
  }
}

Mask.propTypes = {
  defaultVisible: PropTypes.bool,
  onClick: PropTypes.func,
};
