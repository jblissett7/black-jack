import React from 'react';
import { shallow } from 'enzyme';
import Dealer from './Dealer';

describe('Dealer', () => {
  let wrapper;
  beforeEach(() => (wrapper = shallow(<Dealer />)));

  it('Should render a <div />', () => {
    expect(wrapper.find('div').length).toEqual(1);
  });
});
