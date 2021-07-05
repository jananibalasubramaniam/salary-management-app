import React from 'react';
import { shallow } from 'enzyme';
import Employees from './Employees';
import AppSpinner from './shared/Spinner';
import StatusMessageDialog from './shared/StatusMessage';
import EmployeeDetail from './EmployeeDetail';

describe(Employees, () => {
    let wrapper: any;
    const useStateSpy = jest.spyOn(React, 'useState');
    const useEffectSpy = jest.spyOn(React, 'useEffect');

    beforeEach(() => {
        wrapper = shallow(<Employees/>);
    });

    it('renders self and children ', () => {
        expect(wrapper).toBeTruthy();
        expect(wrapper.find(AppSpinner).length).toBe(1);
        expect(wrapper.find(StatusMessageDialog).length).toBe(1);
        expect(wrapper.find(EmployeeDetail).length).toBe(1);
    })
});