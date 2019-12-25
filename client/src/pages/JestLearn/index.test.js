import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import JestLearn from './index'

Enzyme.configure({ adapter: new Adapter() })

describe('组件测试', () => {
  test('组件测试1', () => {
    const wrapper = shallow(<JestLearn />)
    const arr = wrapper.find('.div')
    expect(arr.length).toBe(1)
  })
})
