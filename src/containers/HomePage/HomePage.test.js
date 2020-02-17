/**
 * Test the HomePage
 */

import React from 'react';
import ReactDOM from 'react-dom';
import {create} from 'react-test-renderer';
import {render, fireEvent} from '@testing-library/react'

import HomePage from './index';
import { AppProvider } from 'containers/App/context'

function renderContextPage(store, response, fetch) {
  if(!store){
    store = {}
  }
  const res = (!response) ? [{
    owner: { login: 'facebook' },
    html_url: 'https://github.com/facebook/create-react-app',
    name: 'create-react-app',
    open_issues_count: 20,
    full_name: 'facebook/create-react-app'
    }] : response;
  if(!fetch){
    fetch = jest.fn()
  }
  const actions = {
    setData: (key, data) => {
      if(key && store[key] && typeof data === "object" && data !== null){
        store[key] = Object.assign(store[key], data) 
      } else if(key){
        store[key] = data
      }
    },
    requestData: async (requestURL, options) => {
      try {
        const result = await fetch.mockReturnValue(Promise.resolve(res))()
        return { error: null, data: result }
      } catch (err) {
        return { error: err, data: null }
      }
    }
  }
  
  return render(
    <AppProvider value={{ data: store, actions: actions }}>
      <HomePage />
    </AppProvider>
  );
}

describe('<HomePage />', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<HomePage />, div);
  });

  it('should render the repos list', () => {
    
    let store = { home:{ repos: [{
      owner: { login: 'facebook' },
      html_url: 'https://github.com/facebook/create-react-app',
      name: 'create-react-app',
      open_issues_count: 20,
      full_name: 'facebook/create-react-app'
      }] } }

    const testRenderer = create(
      <AppProvider value={{ data: store, actions: {} }}><HomePage /></AppProvider>);
    expect(testRenderer.root.findAllByType("li").length).toBe(1)
  });

  it('should not call fetch if username is an empty string', () => {

    const submitSpy = jest.fn();
    let store = { home:{ username: "" } }
    const { container } = renderContextPage(store, null, submitSpy)
    const form =  container.querySelector('form')
    fireEvent.submit(form)
    expect(submitSpy).not.toHaveBeenCalled();
  });

  it('should render fetch the repos on submit form', () => {
    
    const submitSpy = jest.fn();
    let store = { home:{ username: "react" } }
    const { container } = renderContextPage(store, null, submitSpy)
    const form =  container.querySelector('form')
    fireEvent.submit(form)
    expect(submitSpy).toHaveBeenCalled();
  });

  it('test username onChange event', () => {
    
    let store = { home:{ username: "" } }
    const { container } = renderContextPage(store)
    const usernameInput = container.querySelector('#username')
    const username = 'username'
    fireEvent.change(usernameInput, {target: {value: username}})
    expect(store.home.username).toEqual(username)
  });
  
});
