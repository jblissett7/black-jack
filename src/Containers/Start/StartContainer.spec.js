import React from 'react';
import { createShallow, createMount } from '@material-ui/core/test-utils';
import StartContainer from './StartContainer';

describe('StartContainer', () => {
  let wrapper, shallow;
  beforeEach(() => {
    shallow = createShallow();
    wrapper = shallow(<StartContainer />);
  });

  it('Should render a <div />', () => {
    expect(wrapper.find('div').length).toEqual(1);
  });

  it('Should render 6 Grid Components', () => {
    expect(wrapper.find('WithStyles(Grid)').length).toEqual(6);
  });

  it('Should render 2 Typography Components', () => {
    expect(wrapper.find('WithStyles(Typography)').length).toEqual(2);
  });

  it('Should render a TextField Component', () => {
    expect(wrapper.find('TextField').length).toEqual(1);
  });

  it('Should render a Button Component', () => {
    expect(wrapper.find('WithStyles(Button)').length).toEqual(1);
  });
});
