import React from 'react';
import {render} from '@testing-library/react'

import { IssueIcon, ReactLogo } from './index';

describe('Icons', () => {

  it('IssueIcon should render a SVG', () => {

    const { container } = render(<IssueIcon />);
    expect(container.querySelector('svg').childElementCount).toEqual(1)
  });

  it('ReactLogo should render a SVG', () => {

    const { container } = render(<ReactLogo />);
    expect(container.querySelector('svg').childElementCount).toEqual(1)
  });
});