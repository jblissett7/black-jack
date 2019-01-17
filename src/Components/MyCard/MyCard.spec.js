import React from 'react';
import { shallow } from 'enzyme';
import MyCard from './MyCard';

describe('MyCard', () => {
  let wrapper;
  beforeEach(() => (wrapper = shallow(<MyCard />)));

  it('Should render a <div />', () => {
    expect(wrapper.find('div').length).toEqual(1);
  });
});
