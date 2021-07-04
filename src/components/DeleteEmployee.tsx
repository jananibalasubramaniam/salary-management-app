import React, { useState, useEffect, FC } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import { Employee } from '../shared/interfaces/employee.interface';
import AppSpinner from './Spinner';
import { StatusMessage } from '../shared/interfaces/statusmessage.interface';
import StatusMessageDialog from './StatusMessage';

const useStyles = makeStyles(() => ({
    buttonStyle: {
        backgroundColor: '#555',
        color: '#ffffff',
        marginBottom: '10px',

        '&:hover': {
            backgroundColor: '#959595',
            color: '#000'
        }
    }
}));

const DeleteEmployee: FC<{
    openDialog: boolean;
    closeDialog: Function;
    employee: Employee;
    employeeDeleted: Function
    }> = ({
        openDialog,
        closeDialog,
        employee,
        employeeDeleted
    }) => {
    const classes = useStyles();
    const [open, setOpen] = useState<boolean>(openDialog);
    const [deleteEmployee, setDeleteEmployee] = useState<boolean>(false);
    const [empName, setEmpName] = useState<string>('');
    const [showSpinner, setShowSpinner] = useState<boolean>(false);
    const [showStatusMessage, setShowStatusMessage] = useState<boolean>(false);
    const [statusMessage, setStatusMessage] = useState<StatusMessage>({} as StatusMessage);

    const handleClose = () => {
        setDeleteEmployee(false);
        closeDialog();
    };

    const handleDelete = () => {
        setDeleteEmployee(true);
    }

    useEffect(() => {
        setOpen(openDialog);
        setEmpName(employee.fullName);
    }, [openDialog]);

    useEffect(() => {
        if(deleteEmployee) {
            setShowSpinner(true);
            axios.delete(`https://nphc-hr.free.beeceptor.com/employees/${employee.id}`)
                .then(res => {
                    setShowSpinner(false);
                    console.log(`Successfully deleted the employee record ${res.data}`);
                    employeeDeleted();
                    handleClose();
                    setStatusMessage({
                        title: 'Success',
                        message: 'Employee deleted successfully.'
                    })
                    setShowStatusMessage(true);
                })
                .catch(err => {
                    setShowSpinner(false);
                    console.error('Error deleting Employee', err.response.data);
                    setStatusMessage({
                        title: 'Error',
                        message: 'Sorry, Employee could not be deleted. Please try again later.'
                    })
                    setShowStatusMessage(true);
                });
        }
    }, [deleteEmployee]);

    return (
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
                disableBackdropClick
                disableEscapeKeyDown
            >
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Do you really want to delete <b>{empName}</b>'s record?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDelete} className={classes.buttonStyle}>
                        DELETE
                    </Button>
                    <Button onClick={handleClose} className={classes.buttonStyle} autoFocus>
                        CLOSE
                    </Button>
                </DialogActions>
            </Dialog>
            <AppSpinner showSpinner={showSpinner}/>
            <StatusMessageDialog openDialog={showStatusMessage} status={statusMessage} />
        </div>
    );
}

export default DeleteEmployee;