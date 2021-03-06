// @flow

import * as React from 'react';

import type { ITheme } from '../theme';

const styled = <T: *>(
  cssStyles: { [$Keys<T>]: string },
  jssStyles: (theme: ITheme) => T,
  render: (classes: { [$Keys<T>]: string }) => React$Node
) => () => {
  if (process.env.EXPERIMENTAL_CSS_IN_JS) {
    const JssStyled = require('./JssStyled').default;
    return <JssStyled styles={jssStyles} children={render} />;
  } else {
    return render(cssStyles);
  }
};

export default styled;
