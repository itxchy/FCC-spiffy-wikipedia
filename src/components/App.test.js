import React from 'react'
import { shallow, mount } from 'enzyme'
import { shallowToJson } from 'enzyme-to-json'
import App from './App'
import { wikiData } from './__mocks__/App.lib.js'

test('App snapshot test', () => {
  const component = shallow(<App />)
  const tree = shallowToJson(component)
  expect(tree).toMatchSnapshot()
})
