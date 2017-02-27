import React from 'react'
import { shallow, mount } from 'enzyme'
import { shallowToJson } from 'enzyme-to-json'
import App from './App'

test('App snapshot test', () => {
  const component = shallow(<App />)
  const tree = shallowToJson(component)
  expect(tree).toMatchSnapshot()
})
