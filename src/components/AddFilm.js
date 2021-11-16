import React, {useState, useEffect} from 'react'; 
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { ThemeContext } from '../App';
import { styled, alpha} from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import MenuItem from '@mui/material/MenuItem';
import { format } from 'date-fns';
import {filmsImages} from '../films-images';

export let newData = [];
export var isRefreshDisabled = true;

const filmsImagesPrevSize = Object.getOwnPropertyNames(filmsImages).length;

export default function AddFilm() {
    const appTheme = React.useContext(ThemeContext);
    const [loading, setLoading] = useState(true);
    const [erroMessage, setErrorMessage] = useState('');
    const [open, setOpen] = React.useState(false);
    const [date, setDate] = React.useState(null);
    const [planets, setPlanets] = useState([]);
    const [planet, setPlanet] = React.useState('Tatooine');
    const [newFilm, setNewFilm] = React.useState({episode_id: 7, planets: planet})

    useEffect(() => {
        async function fetchPlanets () {
          let res = await fetch('https://swapi.dev/api/planets/')
          let data = await res.json();
          setPlanets(data.results);
          setLoading(false);
        }
        fetchPlanets();
      }, [])

    const modalStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: {
            xs: 300, 
            sm: 350, 
            md: 375, 
            lg: 400, 
            xl: 425, 
        },
        height: {
            xs: 200, 
            sm: 400, 
            md: 500, 
            lg: 500, 
            xl: 525, 
        },
        color: appTheme.color,
        bgcolor: appTheme.background,
        border: '2px solid',
        bordercolor: appTheme.color,
        borderRadius: 2,
        boxShadow: 24,
        overflow: 'auto',
        p: 4,
    };

    const AddFilmButton = styled(Button)(() => ({
        color: appTheme.color,
        border: '1px solid', 
        bordercolor: appTheme.color,
        backgroundColor: appTheme.background,
        '&:hover': {
            border: '1px solid', 
            bordercolor: appTheme.color,
            backgroundColor: appTheme.accent,
        },
    }));

    const SubmitButton = styled(Button)(() => ({
        color: appTheme.background,
        fontWeight: 'bold',
        backgroundColor: appTheme.color,
        '&:hover': {
            backgroundColor: alpha(appTheme.accent, 0.8),
            color: appTheme.color,
        },
    }));

    const textFieldStyle = {
        '& label': {
            color: appTheme.color,
        },
        '& label.Mui-focused': {
            color: appTheme.accent,
          },
          '& .MuiInput-underline:after': {
            borderBottomColor: appTheme.accent,
          },
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: appTheme.color,
            },
            '&:hover fieldset': {
                borderColor: appTheme.accent,
            },
            '&.Mui-focused fieldset': {
                borderColor: appTheme.accent,
            },
        },
        '& input': {
            color: appTheme.color,
        },
        '& input:invalid + fieldset': {
            borderColor: appTheme.warning,
            borderWidth: 1.5,
        },
        '& .MuiInputBase-input': {
            color: appTheme.color,
        },
    };

    const handleOpen = () => {
        setOpen(true);
    }
    const handleClose = () => setOpen(false);

    const handleSubmit = () => {
        if(newFilm !== (undefined) && Object.getOwnPropertyNames(newFilm).length === 6 && filmsImagesPrevSize !== Object.getOwnPropertyNames(filmsImages).length ) {
            newData = newFilm;
            setNewFilm('');
            setOpen(false);
            isRefreshDisabled = false;
            return true
        }
        setNewFilm({episode_id: '7', planets: 'Tatooine'});
        return false
    }

    return(
        <div>
            <AddFilmButton 
            size="small" 
            variant="outlined"
            onClick={()=> {
                handleOpen()
                setErrorMessage('')
                }}>
                Add Film
            </AddFilmButton>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-form-title"
                aria-describedby="modal-form-description"
            >
                <Box sx={modalStyle}>
                    {
                        loading ?
                        <>
                            <Typography id="modal-form-title" variant="h6" component="h1">
                                Loading...
                            </Typography>
                        </>
                        :
                        <>
                            <Typography id="modal-form-title" variant="h6" component="h1">
                                Add a new film
                            </Typography>
                            <Typography id="modal-form-title" variant="small" component="small">
                                Please fill in order and after submitting scroll down and press 'Load Added Films' 
                            </Typography>
                            <Box
                            component="form"
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                            }}
                            id='film-form'
                            noValidate
                            autoComplete="off"
                            >
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <TextField label="Episode" id="episode-id"  margin='normal' required defaultValue='7' inputProps={{ inputMode: 'numeric', pattern: '[7-9]*' }} sx={textFieldStyle}
                                onChange= {(newValue) => { 
                                    setNewFilm({...newFilm, episode_id: newValue.target.value})
                                }}/>
                                <TextField label="Title" id="title"  margin='normal' required defaultValue='Title' sx={textFieldStyle} 
                                onChange= {(newValue) => {
                                    if (newValue.target.value !== ''){
                                        setNewFilm({...newFilm, title: newValue.target.value})
                                    }
                                }} />
                                <TextField label="Producer" id="producer"  margin='normal' required defaultValue='Name' sx={textFieldStyle} onChange= {(newValue) => {
                                    if (newValue.target.value !== ''){
                                        setNewFilm({...newFilm, producer: newValue.target.value})
                                    }
                                }}/>
                                <TextField label="Director" id="director"  margin='normal' required defaultValue='Name' sx={textFieldStyle} onChange= {(newValue) => {
                                    if (newValue.target.value !== ''){
                                        setNewFilm({...newFilm, director: newValue.target.value})
                                    }
                                }} />       
                                <DatePicker
                                    label="Release Date"
                                    value={date}
                                    onChange={(newValue) => {
                                    setDate(newValue)
                                    if (newValue !== ''){
                                        setNewFilm({...newFilm, release_date: format(new Date(newValue), 'yyyy-MM-dd')})
                                    }
                                    }}
                                    renderInput={(params) => 
                                    <TextField {...params} margin='normal' required sx={textFieldStyle} />
                                }
                                />
                                <TextField label="Image Link" id="url"  margin='normal' required defaultValue='https://film/poster/' sx={textFieldStyle} 
                                onChange= {(newValue) => {
                                    if (newValue.target.value !== ''){
                                        const imgId = newFilm.episode_id.toString()
                                        filmsImages[imgId] = newValue.target.value
                                    }
                                }}/>
                                <TextField
                                id="outlined-select-currency"
                                margin='normal'
                                select
                                label="Select"
                                value={planet}
                                onChange={(newValue) => {
                                    setPlanet(newValue.target.value)
                                    if (newValue.target.value !== ''){
                                        setNewFilm({...newFilm, planets: newValue.target.value})
                                    }
                                }}
                                sx={textFieldStyle}
                                >
                                {planets.map((option) => (
                                    <MenuItem key={option.name} value={option.name} style={{color: appTheme.accent}}>
                                    {option.name}
                                    </MenuItem>
                                ))}
                                </TextField>

                                <SubmitButton 
                                size="small" 
                                variant="contained"
                                onClick={() => {
                                    const submitted = handleSubmit()
                                    if (!submitted) {
                                        setErrorMessage('Please check your entries or reopen this pop up')
                                    } 
                                }} >
                                    Submit
                                </SubmitButton>
                                <Typography id="modal-form-title" variant="small" component="small">
                                    {erroMessage} 
                                </Typography>
                                </LocalizationProvider>
                            </Box>
                        </>
                    }
                </Box>
            </Modal>
        </div>
    )
}
