import React from 'react'
import { shallow } from 'enzyme'
import { shallowToJson } from 'enzyme-to-json'
import Result from './Result'

test('Result snapshot test', () => {
  const component = shallow(<Result link='https://test.test' headline='test' description='testing' />)
  const tree = shallowToJson(component)
  expect(tree).toMatchSnapshot()
})
