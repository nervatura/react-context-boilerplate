import React from 'react';
import ReactDOM from 'react-dom';
import { render, fireEvent, wait } from '@testing-library/react';
import {create} from 'react-test-renderer';

import App from './index';

describe('<App />', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    let store = { home:{ username: "react" } }
    ReactDOM.render(<App data={store} />, div);
  });

  it("let's check some components", () => {

    const testRenderer = create(<App />);
    expect(testRenderer.root.findAllByType("header").length).toBe(1)
    expect(testRenderer.root.findAllByType("article").length).toBe(1)
    expect(testRenderer.root.findAllByType("footer").length).toBe(1)
  });

});

describe('App functions', () => {

  test('requestData + getData with correct value', async () => {
    const value = [{
      owner: { login: 'facebook' },
      html_url: 'https://github.com/facebook/create-react-app',
      name: 'create-react-app',
      open_issues_count: 20,
      full_name: 'facebook/create-react-app'
    }];

    // Mock API
    jest.spyOn(global, 'fetch')
      .mockImplementation(() => Promise.resolve({
        status: 200,
        json: () => Promise.resolve(value)
      }));

    let store = { home:{ username: "" } }
    const { container } = render(<App data={store} />);
    
    const usernameInput = container.querySelector('#username')
    const username = 'username'
    fireEvent.change(usernameInput, {target: {value: username}})
    expect(usernameInput.value).toEqual(username)

    const form =  container.querySelector('form')
    await wait(() =>fireEvent.submit(form));
    expect(global.fetch).toHaveBeenCalledTimes(1);

    // Clear mock
    global.fetch.mockClear();
  });

  test('requestData + getData with error', async () => {

    // Mock API
    jest.spyOn(global, 'fetch')
      .mockImplementation(() => Promise.resolve({
        status: 400,
        json: () => Promise.resolve([])
      }));

    let store = { home:{ username: "" } }
    const { container } = render(<App data={store} />);
    
    const usernameInput = container.querySelector('#username')
    const username = 'error'
    fireEvent.change(usernameInput, {target: {value: username}})
    expect(usernameInput.value).toEqual(username)

    const form =  container.querySelector('form')
    await wait(() =>fireEvent.submit(form));
    expect(global.fetch).toHaveBeenCalledTimes(1);

    // Clear mock
    global.fetch.mockClear();
  });

  it('test getData without key', () => {
    const store = {}
    const testRenderer = create(<App data={store} />);
    const app = testRenderer.getInstance()
    const origState = app.state
    app.setData(null, "hello")
    expect(app.state).toBe(origState);
  });
});