import React from 'react';
import { mount, shallow } from 'enzyme';
import Employees from './Employees';
import AppSpinner from '../shared/Spinner/Spinner';
import StatusMessageDialog from '../shared/StatusMessage/StatusMessage';
import EmployeeDetail from '../EditEmployeeDetails/EmployeeDetail';
import axios from 'axios';
import renderer, { act } from 'react-dom/test-utils';

fdescribe(Employees, () => {
    let wrapper: any;
    const useStateSpy = jest.spyOn(React, 'useState');
    const useEffectSpy = jest.spyOn(React, 'useEffect');
    const mockEmployee = 
    {
        data: [{
            id: 'e001',
            fullName: 'Harry Potter',
            username: 'hpotter',
            salary: 12345
        },
        {
            id: 'e001',
            fullName: 'James Potter',
            username: 'jpotter',
            salary: 23456
        },
        {
            id: 'e001',
            fullName: 'Lily Potter',
            username: 'lpotter',
            salary: 56788
        }
    ]};
    const mockErrorResponse = {
        status: 500,
        message: 'Internal Server Error'
    };

    it('renders self and children ', () => {
        wrapper = shallow(<Employees/>);
        expect(wrapper).toBeTruthy();
        expect(wrapper.find(AppSpinner).length).toBe(1);
        expect(wrapper.find(StatusMessageDialog).length).toBe(1);
        expect(wrapper.find(EmployeeDetail).length).toBe(1);
    });

    it('fetches employees from API and lists them', async() => {
        const axiosGetSpy = jest.spyOn(axios, 'get').mockResolvedValueOnce(mockEmployee);
        wrapper = mount(<Employees/>);

        expect(wrapper.find('tbody').children()).toHaveLength(0);
        await act(async() => {
            await new Promise((resolve) => setTimeout(resolve, 0));
            wrapper.update();
        });
        expect(useEffectSpy).toHaveBeenCalled();
        expect(axiosGetSpy).toHaveBeenCalled();
        expect(useStateSpy).toHaveBeenCalled();
        expect(wrapper.find('tbody').children()).toHaveLength(3);
    });

    it('shows error message when API errors out', async() => {
        const axiosGetSpy = jest.spyOn(axios, 'get').mockRejectedValueOnce(mockErrorResponse);
        wrapper = mount(<Employees />);

        expect(wrapper.find('tbody').children()).toHaveLength(0);
        await act(async() => {
            await new Promise((reject) =>  setTimeout(reject, 0));
            wrapper.update();
        });
        expect(useEffectSpy).toHaveBeenCalled();
        expect(axiosGetSpy).toHaveBeenCalled();
        expect(useStateSpy).toHaveBeenCalled();
        expect(wrapper.find('tbody').children()).not.toHaveLength(3);
        expect(wrapper.find(AppSpinner).first().props().showSpinner).toBe(false);
        expect(wrapper.find(StatusMessageDialog).last().props().openDialog).toBe(true);
        expect(wrapper.find(StatusMessageDialog).last().props().status.title).toBe('Error');
        expect(wrapper.find(StatusMessageDialog).last().props().status.message).toBe('Sorry, Could not retrieve employee details. Please try again later.');
    });
});