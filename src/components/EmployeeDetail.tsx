import React, { FC, useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core';
import { Employee } from '../shared/interfaces/employee.interface';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        margin: '0 auto'
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
    uppercase: {
        textTransform: 'uppercase'
    },
    imagecontainer: {
        maxHeight: '300px',
        width: '300px',
        margin: '3px',
        padding: '3px',
        float: 'left'
    },
    root: {
        display: 'flex',
        flexDirection: 'column',

        '& .MuiTextField-root': {
          margin: theme.spacing(1),
          width: 200
        },

        '& .MuiInputLabel-root': {
            color: 'black',
        },
        '& .MuiInput-underline': {
            '&::after': {
                borderBottom: '2px solid rgba(0, 0, 0, 0.42) !important'
            }
        }
    },
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

const EmployeeDetail : FC<{
    openDetail: boolean;
    closeView: Function;
    employee: Employee;
    employeeUpdated: Function;
}> = ({
    openDetail,
    closeView,
    employee,
    employeeUpdated
}) => {
    const classes = useStyles();
    const [open, setOpen] = useState<boolean>(openDetail);
    const [ fullNameError, setFullNameError] = useState<boolean>(false);
    const [ fullName, setFullName ] =  useState<string>('');
    const [ fullNameHelperText, setFullNameHelperText ] = useState<string>('');
    const [ userName, setUserName ] = useState<string>('');
    const [ userNameError, setUserNameError ] = useState<boolean>(false);
    const [ userNameHelperText, setUserNameHelperText ] = useState<string>('');
    const [ salary, setSalary ] = useState<number | string>('');
    const [ salaryError, setSalaryError ] = useState<boolean>(false);
    const [ salaryHelperText, setSalaryHelperText ] = useState<string>('');
    const [ employeeDetails, setEmployeeDetails ] = useState<Employee>({} as Employee);

    useEffect(() => {
        setOpen(openDetail);
        setFullName(employee.fullName);
        setUserName(employee.username);
        setSalary(employee.salary);
    }, [openDetail]);

    useEffect(() => {
        if(employeeDetails.id && employeeDetails.fullName && employeeDetails.username && employeeDetails.salary) {
            axios.put(`https://nphc-hr.free.beeceptor.com/employees/${employee.id}`, employeeDetails)
            .then(res => {
               console.log('UPDATE successful!', res?.data);
               employeeUpdated(); //inform parent to update
               closeDetail();
            })
            .catch(err => console.log(err.response.data)); //setError to display error view
        }
    }, [employeeDetails]);

    const closeDetail = () => {
        setFullName('');
        setUserName('');
        setSalary(1);
        closeView();
        setOpen(false);
    };

    const handleFullNameChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        var nameRegex = new RegExp(/^[a-zA-Z ]{7,30}$/);
        const { value } = event.target;
        const res = nameRegex.test(value);
        setFullName(value);

        if(res) {
            setFullNameError(false);
            setFullNameHelperText('');
        } else {
            setFullNameError(true);
            setFullNameHelperText('expects alpha(7-30 chars long)');
        }
    }

    const handleUserNameChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        var userNameRegex = new RegExp(/^[a-zA-Z0-9]{5,15}$/);
        const { value } = event.target;
        const res = userNameRegex.test(value);
        setUserName(value);

        if(res) {
            setUserNameError(false);
            setUserNameHelperText('');
        } else {
            setUserNameError(true);
            setUserNameHelperText('expects alphanumerals(5-15 chars long)');
        }
    }

    const handleSalaryChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { value } = event.target;
        if(value.length) {
            const parsedNum = parseFloat(value);
            setSalary(parsedNum);
            setSalaryError(false);
            setSalaryHelperText('');
        } else {
            setSalary('');
            setSalaryError(true);
            setSalaryHelperText('expects non-empty decimals');
        }
    }

    const submitForm = () => {
        setEmployeeDetails({
            id: employee.id,
            fullName,
            username: userName,
            salary : salary as number
        });
    }

    return (
        <div>
            <Modal
                className={classes.modal}
                open={open}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <div className={classes.paper}>
                        <form className={classes.root} noValidate autoComplete='off'>
                        <TextField
                          error={fullNameError}
                          required
                          label='Full Name'
                          value={fullName}
                          onChange={(event) => handleFullNameChange(event)}
                          onBlur={(event) => handleFullNameChange(event)}
                          helperText={fullNameHelperText}
                        />
                        <TextField
                          error={userNameError}
                          required
                          label='User Name'
                          value={userName}
                          onChange={(event) => handleUserNameChange(event)}
                          onBlur={(event) => handleUserNameChange(event)}
                          helperText={userNameHelperText}
                        />
                        <TextField 
                            error={salaryError}
                            required
                            label='Salary (S$)' 
                            type='number'
                            InputProps={{inputProps : {
                                step: 0.01,
                                min: 1,
                                max: 1000000
                            }}}
                            value={salary} 
                            onChange={(event) => handleSalaryChange(event)}
                            onBlur={(event) => handleSalaryChange(event)}
                            helperText={salaryHelperText}
                        />
                        <Button variant='contained' className={classes.buttonStyle} disableElevation onClick={submitForm}>
                            SUBMIT
                        </Button>
                        <Button variant='contained' className={classes.buttonStyle} disableElevation onClick={closeDetail}>
                            CLOSE
                        </Button>
                        </form>
                    </div>
                </Fade>
            </Modal>
        </div>
    )
};

export default EmployeeDetail;