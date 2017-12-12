// @flow
import React, {Component} from 'react';

type Props = {
  text: string
};

class DefaultPropsComponent extends Component < Props > {
  static defaultProps = {
    text: '默认文字'
  }

  render() {
    const {text} = this.props;
    return (
      <div>
        <p>{`文字:${text}`}</p>
      </div>
    );
  }
}

export default DefaultPropsComponent;