import React from 'react';
import {render} from '@testing-library/react'

import ReactLogo from './index';

describe('<ReactLogo />', () => {
  it('should render a SVG', () => {

    const { container } = render(<ReactLogo />);
    expect(container.querySelector('svg').childElementCount).toEqual(1)
  });
});
