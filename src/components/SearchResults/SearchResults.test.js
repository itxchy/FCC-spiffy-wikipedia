import React from 'react'
import { shallow, render } from 'enzyme'
import { shallowToJson } from 'enzyme-to-json'
import testData from '../../testData.json'
import SearchResults from './SearchResults'
import Result from '../Result/Result'

test('SearchResults snapshot test', () => {
  const component = shallow(<SearchResults error={null} searchResults={[]} />)
  const tree = shallowToJson(component)
  expect(tree).toMatchSnapshot()
})

test('SearchResults should render a Results component for each Result', () => {
  const component = shallow(<SearchResults error={null} searchResults={testData} />)
  expect(component.find(Result).length).toEqual(testData[1].length)
})

test('SearchResults should render "Nothing Found" if there are no results', () => {
  const component = shallow(<SearchResults error={null} searchResults={["nothing", [], [], [], []]} />)
  expect(component.text()).toEqual('Nothing Found')
})

test('SearchResults should render "An error occured." if an error is passed to props', () => {
  const component = shallow(<SearchResults error={{ error: 'bad news' }} searchResults={null} />)
  expect(component.text()).toEqual('An error occured.')
})