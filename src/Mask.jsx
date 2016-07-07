import React, { PropTypes } from 'react';
import TweenOne from 'rc-tween-one';
import SvgMorphPlugin from 'rc-tween-one/lib/plugin/SvgMorphPlugin';
TweenOne.plugins.push(SvgMorphPlugin);
const maskStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.35)',
  cursor: 'pointer',
};

const buttonStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  margin: -30,
  borderRadius: 30,
  backgroundColor: '#fff',
};


export default class Mask extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: props.defaultVisible,
      animation: [],
    };
    this.childrenToRender = this.getIconChildren();
    this.handleClick = this.handleClick.bind(this);
  }

  getAnimation(visible) {
    return visible ?
      [
        [
          { style: { rotate: 90 }, duration: 0 },
          {
            d: 'M20 15L20 45L45 30Z', style: { rotate: 0 },
            delay: 150, duration: 300, ease: 'easeOutQuint',
          },
        ],
        [
          { style: { rotate: 90 }, duration: 0 },
          {
            d: 'M20 15L20 45L45 30Z', style: { rotate: 0 },
            delay: 150, duration: 300, ease: 'easeOutQuint',
          },
        ],
      ] :
      [
        [
          { style: { rotate: 0 }, duration: 0 },
          {
            d: 'M15 18L15 27L45 27L45 18Z', style: { rotate: 90 },
            duration: 300, ease: 'easeOutQuint',
          },
        ],
        [
          { style: { rotate: 0 }, duration: 0 },
          {
            d: 'M15 33L15 42L45 42L45 33Z', style: { rotate: 90 },
            duration: 300, ease: 'easeOutQuint',
          },
        ],
      ];
  }

  getIconChildren() {
    return this.state.visible ?
      ['M20 15L20 45L45 30Z', 'M20 15L20 45L45 30Z'] :
      ['M15 18L15 27L45 27L45 18Z', 'M15 33L15 42L45 42L45 33Z'];
  }

  handleClick() {
    const visible = this.state.visible;
    const animation = this.getAnimation(!visible);
    this.setState({
      visible: !visible,
      animation,
    });

    // If mask is visible now, the video is going to play. Otherwise...
    const shouldPlay = visible;
    this.props.onClick(shouldPlay);
  }

  render() {
    const style = {
      ...maskStyle,
      opacity: this.state.visible ? 1 : 0,
      transition: this.state.visible ?
        'opacity 0.3s cubic-bezier(0.215, 0.61, 0.355, 1)' :
        'opacity 0.3s cubic-bezier(0.215, 0.61, 0.355, 1) 0.2s',
    };
    return (
      <section style={style} onClick={this.handleClick}>
        <svg
          version="1.2"
          viewBox="0 0 60 60"
          width="60"
          height="60"
          style={buttonStyle}
        >
          <TweenOne d={this.childrenToRender[0]} fill="#999"
            style={{ transformOrigin: '30px 30px' }}
            animation={this.state.animation[0]}
            component="path"
            attr="attr"
          />
          <TweenOne d={this.childrenToRender[1]} fill="#999"
            style={{ transformOrigin: '30px 30px' }}
            animation={this.state.animation[1]}
            component="path"
            attr="attr"
          />
        </svg>
      </section>
    );
  }
}

Mask.propTypes = {
  defaultVisible: PropTypes.bool,
  onClick: PropTypes.func,
};
