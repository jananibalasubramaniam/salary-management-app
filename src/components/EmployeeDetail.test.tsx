import React from 'react';
import { mount , shallow }  from 'enzyme';
import EmployeeDetail from './EmployeeDetail';
import AppSpinner from './shared/Spinner';
import StatusMessageDialog from './shared/StatusMessage';
import { TextField } from '@material-ui/core';
import { act } from 'react-dom/test-utils';
import axios, { AxiosStatic } from 'axios';

jest.mock('axios');
interface AxiosMock extends AxiosStatic {
    mockResolvedValue: Function
    mockRejectedValue: Function
};

describe('EmployeeDetail', () => {
    const setState = jest.fn();
    const useStateMock: any = (initState: any) => [initState, setState];
    const useStateSpy = jest.spyOn(React, 'useState');
    const useEffectSpy = jest.spyOn(React, 'useEffect');

    const mockedAxios = axios as jest.Mocked<AxiosMock>;
    const data = {
        config: {
            url: 'update-employee'
        }
    };
    let wrapper: any;
    const props = {
        openDetail: true,
        employee: {
            id: 'e0001',
            username: 'ggryffindor',
            fullName: 'Godric Gryffindor',
            salary: 50000
        },
        closeView: jest.fn(() => {}),
        employeeUpdated: jest.fn(() => {})
    }

    beforeEach(() => {
        wrapper = shallow(<EmployeeDetail {...props}/>);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('renders itself and children ', () => {
        expect(wrapper).toBeTruthy();
        expect(wrapper.find(AppSpinner).length).toBe(1);
        expect(wrapper.find(StatusMessageDialog).length).toBe(1);
    });
    
    it('validates initial value on all inputs', () => {
        const mountedWrapper = mount(<EmployeeDetail {...props} />);
        const fullNameInputField = mountedWrapper.find(TextField).at(0);
        const userNameInputField = mountedWrapper.find(TextField).at(1);
        const salaryInputField = mountedWrapper.find(TextField).at(2);

        //check intial values on fullName input field 
        expect(fullNameInputField.props().value).toBe('Godric Gryffindor');
        expect(fullNameInputField.props().error).toBe(false);
        expect(fullNameInputField.props().helperText).toBe('');

        //check initial values on userName input field
        expect(userNameInputField.props().value).toBe('ggryffindor');
        expect(userNameInputField.props().error).toBe(false);
        expect(userNameInputField.props().helperText).toBe('');

        //check initial value on salary input field
        expect(salaryInputField.props().value).toBe(50000);
        expect(salaryInputField.props().error).toBe(false);
        expect(salaryInputField.props().type).toBe('number');
        expect(salaryInputField.props().helperText).toBe('');
    });

    it('sets state and updates input field when fullName is changed', () => {
        const event = { target: { value: 'Helga Hufflepuff' }};
        let fullNameElement = wrapper.find('#employeedetail-fullName');

        fullNameElement.props().onChange(event);
        expect(useStateSpy).toHaveBeenCalled();
        wrapper.update();
        fullNameElement = wrapper.find('#employeedetail-fullName');
        expect(fullNameElement.props().value).toBe('Helga Hufflepuff' );
    });
    
    it('sets error when fullName format is incorrect', () => {
        const event = { target: { value: '12321@@##' }};
        let fullNameElement = wrapper.find('#employeedetail-fullName');

        fullNameElement.props().onChange(event);
        expect(useStateSpy).toHaveBeenCalled();
        wrapper.update();
        fullNameElement = wrapper.find('#employeedetail-fullName');
        expect(fullNameElement.props().error).toBe(true);
        expect(fullNameElement.props().helperText).toBe('expects alpha(7-30 chars long)');
    });

    it('sets state and updates input field when userName is changed', () => {
        const event = { target: { value: 'hhufflepuff' }};
        let userNameElement = wrapper.find('#employeedetail-userName');

        userNameElement.props().onChange(event);
        expect(useStateSpy).toHaveBeenCalled();
        wrapper.update();
        userNameElement = wrapper.find('#employeedetail-userName');
        expect(userNameElement.props().value).toBe('hhufflepuff' );
    });

    it('sets error state when username format is incorrect', () => {
        const event = { target: { value: 'h hu 12$%' }};
        let userNameElement = wrapper.find('#employeedetail-userName');

        userNameElement.props().onChange(event);
        expect(useStateSpy).toHaveBeenCalled();
        wrapper.update();
        userNameElement = wrapper.find('#employeedetail-userName');
        expect(userNameElement.props().error).toBe(true);
        expect(userNameElement.props().helperText).toBe('expects alphanumerals(5-15 chars long)');
    });

    it('sets salary state when salary input is updated', () => {
        const event = { target: { value: '750000' }};
        let salaryElement = wrapper.find('#employeedetail-salary');

        salaryElement.props().onChange(event);
        expect(useStateSpy).toHaveBeenCalled();
        wrapper.update();
        salaryElement = wrapper.find('#employeedetail-salary');
        expect(salaryElement.props().value).toBe(750000);
    });

    it('cleans up and calls parent\'s function when close button is clicked', () => {
        let closeButton = wrapper.find('#closedetail-button');
        let fullNameElement, userNameElement, salaryElement;

        closeButton.props().onClick();
        wrapper.update();
        fullNameElement = wrapper.find('#employeedetail-fullName');
        userNameElement = wrapper.find('#employeedetail-userName');
        salaryElement = wrapper.find('#employeedetail-salary');
        expect(props.closeView).toHaveBeenCalledTimes(1);
        expect(fullNameElement.props().value).toBe('');
        expect(userNameElement.props().value).toBe('');
        expect(salaryElement.props().value).toBe(1);
    });

    xit('calls the API to update employee details when update button is clicked', () => {
        const mountedWrapper = mount(<EmployeeDetail {...props} />);
        let updateButton = wrapper.find('#submitupdate-button');
        const axiosSpy = jest.spyOn(axios, 'put').mockResolvedValue({data: {data: {}}});
        // const submitForm = jest.fn();

        expect(updateButton.length).toEqual(1);
        updateButton.props().onClick();
        wrapper.update();
        expect(useEffectSpy).toHaveBeenCalled();
        expect(wrapper.instance().submitForm).toHaveBeenCalled();
        // expect(axiosSpy).toHaveBeenCalledTimes(1);
        expect(axios.put).toHaveBeenCalledWith('https://nphc-hr.free.beeceptor.com/employees/e0001');
    });

    xit('shows error status when API errors out', () => {
        let updateButton = wrapper.find('#submitupdate-button');
        const setShowStatusMessage = jest.fn();
        const setShowSpinner = jest.fn();
        const setStatusMessage = jest.fn();
        const failedStatusMsg = {
            status: 500,
            title: 'Error',
            message: 'Sorry! There was an error updating employee detail. Please try again later'
        };
        const axiosSpy = jest.spyOn(axios, 'put').mockRejectedValue(failedStatusMsg);
        console.log('closebutton props ======> ', updateButton.props());
        updateButton.props().onClick();
        wrapper.update();
        expect(useEffectSpy).toHaveBeenCalled();
        expect(axiosSpy).toHaveBeenCalledTimes(1);
        expect(setShowSpinner).toHaveBeenCalledTimes(1);
        expect(setShowStatusMessage).toHaveBeenCalledWith(true);
        expect(setStatusMessage).toHaveBeenCalledWith(failedStatusMsg);
    });
});