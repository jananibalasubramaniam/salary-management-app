import React from 'react';
import { mount , shallow }  from 'enzyme';
import AppSpinner from './shared/Spinner';
import StatusMessageDialog from './shared/StatusMessage';
import DeleteEmployee from './DeleteEmployee';

describe('DeleteEmployee', () => {
    let wrapper: any;
    const props = {
        openDialog: true,
        closeDialog: jest.fn(),
        employee: {
            id: 'e0001',
            username: 'ggryffindor',
            fullName: 'Godric Gryffindor',
            salary: 50000
        },
        employeeDeleted: jest.fn()
    };

    beforeEach(() => {
        wrapper = shallow(<DeleteEmployee {...props}/>);
    });

    it('renders itself and children ', () => {
        expect(wrapper).toBeTruthy();
        expect(wrapper.find(AppSpinner).length).toBe(1);
        expect(wrapper.find(StatusMessageDialog).length).toBe(1);
    });
});