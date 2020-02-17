import React from 'react';
import {render} from '@testing-library/react'
import {create} from 'react-test-renderer';

import ListItem from 'components/ListItem';
import List from './index';

describe('<List />', () => {
  it('should render the component if no items are passed', () => {

    const { container } = render(<List component={ListItem} />);
    expect(container).toBeDefined()
  });

  it('should pass all items props to rendered component', () => {
    const items = [{ id: 1, name: 'Hello' }, { id: 2, name: 'World' }];
    const component = ({ item }) => <ListItem item={item.name} />;

    const testRenderer = create(<List items={items} component={component} />);

    expect(testRenderer.root.findAllByType(component).length).toBe(2)
    expect(testRenderer.root.props.items[0]).toBe(items[0])
    expect(testRenderer.root.props.items[1]).toBe(items[1])
    
  });
});
