import React from 'react';
import {render} from '@testing-library/react'

import IssueIcon from './index';

describe('<IssueIcon />', () => {
  it('should render a SVG', () => {

    const { container } = render(<IssueIcon />);
    expect(container.querySelector('svg').childElementCount).toEqual(1)
  });
});
