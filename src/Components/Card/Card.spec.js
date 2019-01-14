import React from 'react';
import { shallow } from 'enzyme';
import Card from './Card';

describe('Card', () => {
  let wrapper;
  beforeEach(() => (wrapper = shallow(<Card />)));

  it('Should render a <div />', () => {
    expect(wrapper.find('div').length).toEqual(1);
  });
});
