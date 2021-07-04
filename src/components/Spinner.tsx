import React, { FC, useEffect, useState } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Backdrop from '@material-ui/core/Backdrop';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    spinnercolor: {
        color: '#fff'
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff'
    },
  })
);

const AppSpinner: FC<{
    showSpinner: boolean
}> = ({
    showSpinner
}) => {
    const classes = useStyles();
    const [open, setOpen] = useState<boolean>(showSpinner);

    const handleClose = () => {
        setOpen(false);
        console.log('set spinner to false handleclose');
    }
    
    useEffect(() => {
        setOpen(showSpinner);
        console.log('setSpinner to true in useEffect')
    }, [showSpinner]);

    return (
        <div>
            <Backdrop className={classes.backdrop} open={open} onClick={handleClose}>
                <CircularProgress className={classes.spinnercolor}/>
            </Backdrop>
        </div>
    );
}

export default AppSpinner;