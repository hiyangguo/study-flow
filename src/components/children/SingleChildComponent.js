// @flow
import * as React from 'react';

type Props = {
  children: React.Element<any>,
};

export default (props: Props) => (
  <div>
    {props.children}
  </div>
);
