import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import { Employee, OrderByType, Order } from '../../shared/interfaces/employee.interface';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import SearchIcon from '@material-ui/icons/Search';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import Button from '@material-ui/core/Button';
import EmployeeDetail from '../EditEmployeeDetails/EmployeeDetail';
import DeleteEmployee from '../DeleteEmployee/DeleteEmployee';
import AppSpinner from '../shared/Spinner/Spinner';
import { StatusMessage } from '../../shared/interfaces/statusMessage.interface';
import StatusMessageDialog from '../shared/StatusMessage/StatusMessage';

const columns : Array<{
        id: OrderByType,
        label: string;
        minWidth: number;
        align: string;
        numeric: boolean;
    }> = [
    {
        id: 'id',
        label: 'Id',
        minWidth: 30,
        align: 'left',
        numeric: false,
    },
    {
        id: 'fullName', 
        label: 'Name',
        minWidth: 30,
        align: 'left',
        numeric: false
    },
    {
        id: 'username',
        label: 'Login',
        minWidth: 30,
        align: 'left',
        numeric: false,
    },
    {
        id: 'salary',
        label: 'Salary',
        minWidth: 30,
        align: 'left',
        numeric: true
    }
];

const useStyles = makeStyles(() => ({
    root: {
        width: '80% !important',
        float: 'right',
        marginTop: '3%',
        '@media only screen and (max-width: 768px)': {
            width: '100% !important'
        },
        '& .MuiOutlinedInput-root': {
            '& fieldset': { 
                borderRadius: '20px',
                borderColor: '#000fff'
            },
            '&.Mui-focused fieldset': {
                borderColor: '#C52328',
                borderWidth: '2px'
            }
        },
        '& .MuiInputLabel-root': {
            color: 'black',
        },
        '& .MuiInput-underline': {
            '&::after': {
                borderBottom: '2px solid rgba(0, 0, 0, 0.42) !important'
            }
        },
        '& .MuiFormControl-root': {
            '@media only screen and (max-width: 768px)': {
                width: '150px !important',
                height: 'auto !important'
            },
            '@media only screen and (min-width: 768px)': {
                width: '200px !important',
            },
        },
        '& .MuiInputBase-inputMultiline': {
            height: 'auto !important'
        }
    },
    visuallyHidden: {
        border: 0,
        clip: 'rect(0 0 0 0)',
        height: 1,
        margin: -1,
        overflow: 'hidden',
        padding: 0,
        position: 'absolute',
        top: 20,
        width: 1
    },
    tablehead: {

    },
    alignediticon : {
        padding: '0 10px 0 0',
        minWidth: 'unset !important'
    },
    aligndeleteicon : {
        padding: 0,
        minWidth: 'unset !important'
    },
    searchboxcontainer: {
        margin: '10px',
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)'
    }
}));

const Employees  = () => {
    const classes = useStyles();
    const [employees, setEmployees] = useState<Array<Employee>>([]);
    const [rowsPerPage, setRowsPerPage] = useState<number>(5);
    const [page, setPage] = useState<number>(0);
    const [orderBy, setOrderBy] = useState<OrderByType>('id');
    const [order, setOrder] = useState<'asc' | 'desc'>('asc');
    const [maxSalary, setMaxSalary] = useState<number>(1);
    const [minSalary, setMinSalary] = useState<number>(1);
    const [searchMinVal, setSearchMinVal] = useState<number | string>(minSalary);
    const [searchMaxVal, setSearchMaxVal] = useState<number | string>(maxSalary);
    const [searchResults, setSearchResults] = useState<Array<Employee>>(employees);
    const [openDetail, setOpenDetail] = useState<boolean>(false);
    const [employeeDetail, setEmployeeDetail] = useState<Employee>({} as Employee);
    const [refreshFlag, setRefreshFlag] = useState<boolean>(false);
    const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false);
    const [showSpinner, setShowSpinner] = useState<boolean>(false);
    const [showStatusMessage, setShowStatusMessage ] = useState<boolean>(false);
    const [statusMessage, setStatusMessage ] = useState<StatusMessage>({} as StatusMessage);

    useEffect(() => {
        // https://nphc-hr.free.beeceptor.com/employees - rate limit is set
        // persist in localStorage
        const cachedResponse = localStorage.getItem('cachecEmployees');

        if(cachedResponse) {
            console.log('Reading employees from cached response');
            const parsedData = JSON.parse(cachedResponse);
            setEmployees(parsedData);
            setSearchResults(parsedData);
            setMaxMinSalaries(parsedData);
        } else {
            setShowSpinner(true);
            axios.get('http://localhost:3002/employees')
            .then(response =>  {
                console.log('Retrieved employee details from API', response.data);
                localStorage.setItem('cachedEmployees', JSON.stringify(response.data));
                setShowSpinner(false);
                setEmployees(response.data);
                setSearchResults(response.data);
                setMaxMinSalaries(response.data)
            })
            .catch(error => {
                console.error(error);
                setShowSpinner(false);
                setStatusMessage({
                    title: 'Error',
                    message: 'Sorry, Could not retrieve employee details. Please try again later.'
                });
                setShowStatusMessage(true);
            });
        }
    }, [page, refreshFlag]);

    useEffect(() => {
        const searchResults = searchEmployees();
        setSearchResults(searchResults as Employee[]);
    }, [searchMinVal, searchMaxVal]);

    const setMaxMinSalaries = (employees: Employee[]) => {
        const salaries = employees.map((emp: Employee) => emp.salary);
        const maxSal = Math.max.apply(Math, salaries);
        const minSal = Math.min.apply(Math, salaries);
        setMaxSalary(maxSal);
        setMinSalary(minSal);
        setSearchMaxVal(maxSal);
        setSearchMinVal(minSal);
    }

    const handleRequestSort = (event: React.MouseEvent<HTMLSpanElement> | null, property: OrderByType) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const createSortHandler = (event: React.MouseEvent<HTMLSpanElement, MouseEvent> | null, property: OrderByType) => {
        handleRequestSort(event, property);
    };

    const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
        setPage(newPage);
    }

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    }
          
    const openEmployeeDetail = (employee: Employee) => {
        setEmployeeDetail(employee);
        setOpenDetail(true);
    }

    const closeEmployeeDetail = () => {
        setOpenDetail(false);
    }

    const refreshEmployeeList = () => {
        //invalidate cached response
        localStorage.removeItem('cachedEmployees');
        const negateFlag = !refreshFlag;
        setRefreshFlag(negateFlag);
    }

    const deleteEmployee = (employee: Employee) => {
        setOpenDeleteDialog(true);
    }

    const closeDeleteDialog = () => {
        setOpenDeleteDialog(false);
    }

    const descendingComparator = <T, >(a: T, b: T, orderBy: keyof T) => {
        if (b[orderBy] < a[orderBy]) {
          return -1;
        }
        if (b[orderBy] > a[orderBy]) {
          return 1;
        }
        return 0;
    }

    const getComparator = <Key extends keyof any>(
      order: Order,
      orderBy: Key,
    ): (a: { [key in Key]: number | string }, b: { [key in Key]: number | string }) => number => {
      return order === 'desc'
        ? (a: any, b: any) => descendingComparator(a, b, orderBy)
        : (a: any, b: any) => -descendingComparator(a, b, orderBy);
    }

    const stableSort = <T, >(array: T[], comparator: (a: T, b: T) => number) => {
        const stabilizedThis = array?.map((el, index) => [el, index] as [T, number]);
        stabilizedThis?.sort((a, b) => {
          const order = comparator(a[0], b[0]);
          if (order !== 0) return order;
          return a[1] - b[1];
        });
        return stabilizedThis?.map((el) => el[0]);
      }
    
    const searchEmployees = (): Employee[] | void => {
        if(searchMinVal !== null && searchMaxVal !== null) {
            return employees.filter((emp:Employee) => (emp.salary <= searchMaxVal && emp.salary >= searchMinVal));
        }
    }

    const handleMinValChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        if(value.length) {
            const parsedNum = parseInt(value, 10);
            setSearchMinVal(parsedNum);
        } else {
            setSearchMinVal('');
        }
    }
    
    const handleMaxValChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        if(value.length) {
            const parsedNum = parseInt(value, 10);
            setSearchMaxVal(parsedNum);
        } else {
            setSearchMaxVal('');
        }
    }

    return (
        <div>
            <Paper className={classes.root}>
                <div className={classes.searchboxcontainer}>
                    <Grid container alignItems='flex-end'>
                        <Grid item>
                            <SearchIcon />
                        </Grid>
                        <Grid item>
                            <TextField 
                                type='number'
                                InputProps={{inputProps: {min: searchMinVal , max: searchMaxVal}}} 
                                value={searchMinVal} 
                                onChange={handleMinValChange} 
                                label='Minimum salary' 
                                placeholder='Enter amount' 
                            />
                        </Grid>
                    </Grid> 
                    <Grid item>
                        <TextField 
                            type='number' 
                            InputProps={{inputProps: {min:searchMinVal, max: searchMaxVal}}} 
                            value={searchMaxVal} 
                            onChange={handleMaxValChange} 
                            label='Maximum salary' 
                            placeholder='Enter amount' 
                        />
                    </Grid>
                </div>
                <h2 style={{paddingLeft: '15px'}}> Employees </h2>
                <TableContainer>
                    <Table stickyHeader>
                        <TableHead>
                            <TableRow>
                                {columns.map(column => (
                                    <TableCell className={classes.tablehead}
                                        key={column.id}
                                        style={{minWidth: column.minWidth}}
                                        sortDirection={orderBy === column.id ? order : false}>
                                            <TableSortLabel
                                                active={orderBy === column.id}
                                                direction={orderBy === column.id ? order : 'asc'}
                                                onClick={(event) => createSortHandler(event, column.id)}>
                                                    {column.label}
                                                {orderBy === column.id ? (
                                                  <span className={classes.visuallyHidden}>
                                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                                  </span>
                                                ) : null}
                                            </TableSortLabel>
                                    </TableCell>
                                ))}
                                    <TableCell key='action'> Action </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {stableSort(searchResults, getComparator(order, orderBy))
                            ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            ?.map((employee: any, index: number) => {
                                return (
                                    <TableRow key={index}>
                                        <TableCell>{employee.id}</TableCell>
                                        <TableCell>{employee.fullName}</TableCell>
                                        <TableCell>{employee.username}</TableCell>
                                        <TableCell>S$ {employee.salary}</TableCell>
                                        <TableCell align='left'>
                                            <Button className={classes.alignediticon} aria-label='edit' onClick={() => openEmployeeDetail(employee)}>
                                                <Edit />
                                            </Button>
                                            <Button className={classes.aligndeleteicon} aria-label='edit' onClick={() => deleteEmployee(employee)}>
                                                <DeleteOutline />
                                            </Button>
                                        </TableCell> 
                                    </TableRow>
                                )
                            })}
                        </TableBody>
                    </Table>
                    <EmployeeDetail openDetail={openDetail} closeView={closeEmployeeDetail} employee={employeeDetail} employeeUpdated={refreshEmployeeList}/>
                    <DeleteEmployee openDialog={openDeleteDialog} closeDialog={closeDeleteDialog} employee={employeeDetail}  employeeDeleted={refreshEmployeeList}/>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 15]}
                    component='div'
                    count={searchResults.length}
                    rowsPerPage={rowsPerPage} 
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />
            </Paper>
            <AppSpinner showSpinner={showSpinner}/>
            <StatusMessageDialog openDialog={showStatusMessage} status={statusMessage} />
        </div>
    );
}

export default Employees;