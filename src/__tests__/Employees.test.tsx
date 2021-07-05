import React from 'react';
import { mount, shallow } from 'enzyme';
import Employees from '../components/Employees';
import AppSpinner from '../components/shared/Spinner';
import StatusMessageDialog from '../components/shared/StatusMessage';
import EmployeeDetail from '../components/EmployeeDetail';
import axios from 'axios';
import renderer, { act } from 'react-dom/test-utils';
import DeleteEmployee from '../components/DeleteEmployee';

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

    afterAll(() => {
        jest.restoreAllMocks();
        jest.resetAllMocks();
    });

    it('renders self and children ', () => {
        wrapper = shallow(<Employees/>);
        expect(wrapper).toBeTruthy();
        expect(wrapper.find(AppSpinner).length).toBe(1);
        expect(wrapper.find(StatusMessageDialog).length).toBe(1);
        expect(wrapper.find(EmployeeDetail).length).toBe(1);
        expect(wrapper.find(DeleteEmployee).length).toBe(1);
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
        expect(wrapper.find('tbody').children()).toHaveLength(0);
        expect(wrapper.find(AppSpinner).first().props().showSpinner).toBe(false);
        expect(wrapper.find(StatusMessageDialog).last().props().openDialog).toBe(true);
        expect(wrapper.find(StatusMessageDialog).last().props().status.title).toBe('Error');
        expect(wrapper.find(StatusMessageDialog).last().props().status.message).toBe('Sorry, Could not retrieve employee details. Please try again later.');
    });

    it('retrieves data from localStorage if available', () => {

    });

    it('check if data sorts when sort icon is clicked', () => {

    });

    it('opens employee details when edit icon is clicked', () => {

    });

    it('opens delete dialog when delete icon is clicked', () => {

    });

    it('searches employee list when a salary range is given', () => {

    });
});