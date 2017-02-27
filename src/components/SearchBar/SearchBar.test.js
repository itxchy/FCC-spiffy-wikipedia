import React from 'react'
import { shallow, mount } from 'enzyme'
import { shallowToJson } from 'enzyme-to-json'
import SearchBar from './SearchBar'

test('SearchBar snapshot test', () => {
  const submitHandler = jest.fn()
  const component = shallow(<SearchBar onSearchSubmit={submitHandler} />)
  const tree = shallowToJson(component)
  expect(tree).toMatchSnapshot()
})

test('SeachBar should change state.searchText on every keystroke', () => {
  const submitHandler = jest.fn()
  const component = mount(<SearchBar onSearchSubmit={submitHandler} />)
  component.find('.search-input').simulate('change', { target: { value: 'search term'} })
  expect(component.state('searchText')).toEqual('search term')
})

test('SearchBar should call onSearchSubmit from props on populated form submit', () => {
  const submitHandler = jest.fn()
  const component = mount(<SearchBar onSearchSubmit={submitHandler} />)
  component.setState({ searchText: 'Prince' })
  component.find('#search-submit').simulate('click')
  expect(submitHandler).toHaveBeenCalledWith('Prince')
})

test('SearchBar should not call onSearchSubmit from props if input is empty', () => {
  const submitHandler = jest.fn()
  const component = mount(<SearchBar onSearchSubmit={submitHandler} />)
  component.find('#search-submit').simulate('click')
  expect(submitHandler).not.toHaveBeenCalled()
})
