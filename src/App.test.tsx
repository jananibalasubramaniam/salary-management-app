import React from 'react';
import { shallow } from 'enzyme';
import App from './App';
import NavMenu from './components/NavMenu/NavMenu';
import Employees from './components/EmployeeList/Employees';

describe('App', () => {
  it('renders', () => {
    const wrapper = shallow(<App />);
    expect(wrapper).toBeTruthy();
  });

  it('renders child components ', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find(NavMenu).length).toEqual(1);
    expect(wrapper.find(Employees).length).toEqual(1);
  });
})