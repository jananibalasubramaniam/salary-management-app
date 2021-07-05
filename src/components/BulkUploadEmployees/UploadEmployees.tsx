import React, { FC, useState, useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/core';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Button from '@material-ui/core/Button';
import DragDrop from '../shared/DragDrop/DragDrop';

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
    },
    filedropcontainer: {
        width: '50vw',
        height: '50vh',
        border: '2px dashed #959595',
        borderRadius: '10px',
        margin: '15px 0 30px 0',
        padding: '20px',
        transition: 'border .3s ease-in-out'
    }
}));


const UploadEmployees :FC<{
    openUpload: boolean;
    closeView: Function;
}> = ({
    openUpload,
    closeView
}) => {
    const classes = useStyles();
    const [ open, setOpen ] = useState<boolean>(openUpload);
    const [ clearState, setClearState ] = useState<boolean>(false);
    const [ uploadEmployees, setUploadEmployees ] = useState<boolean>(false);
    
    useEffect(() => {
        setOpen(openUpload);
    });

    const closeUpload = () => {
        setClearState(true);
        closeView();
    };

    const handleUploadEmployees = () => {
        setUploadEmployees(true);
    }

    const updateUploadEmployees = () => {
        setUploadEmployees(false);
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
                            <div>
                                <DragDrop clearState={clearState} uploadFiles={uploadEmployees} uploadComplete={updateUploadEmployees}/>
                            </div>
                            <Button 
                                id='upload-employees'
                                variant='contained' 
                                className={classes.buttonStyle} 
                                disableElevation 
                                onClick={handleUploadEmployees}
                            >
                                UPLOAD
                            </Button>
                            <Button
                                id='upload-close'
                                variant='contained' 
                                className={classes.buttonStyle} 
                                disableElevation 
                                onClick={() => closeUpload()}
                            >
                                CLOSE
                            </Button>
                        </form>
                    </div>
                </Fade>
            </Modal>
        </div>
    )
}

export default UploadEmployees;