import React, {useState, useEffect} from 'react'; 
import Container from '@mui/material/Container'
import Films from './components/FilmsCards'
import NavAppBar from './components/FilmsHeading'
import './App.css';
import Switch from '@mui/material/Switch';
import { styled } from '@mui/material/styles';
import AddFilm from './components/AddFilm'
import { newData } from './components/AddFilm';
import { Button } from '@mui/material';

const themes = {
  dark: {
    color: '#FFFF',
    accent: '#1C169A',
    background: '#464F76',
    warning: '#BF0A30',
  },
  light: {
    color: '#000000',
    accent: '#3731A6',
    background: '#CFBFFC',
    warning: '#DD4766',
  }
}
export const ThemeContext = React.createContext(themes.dark);

const MaterialUISwitch = styled(Switch)(({ theme }, themeMode) => ({
  width: 62,
  height: 34,
  padding: 7,
  '& .MuiSwitch-switchBase': {
    margin: 1,
    padding: 0,
    transform: 'translateX(6px)',
    '&.Mui-checked': {
      color: '#fff',
      transform: 'translateX(22px)',
      '& .MuiSwitch-thumb:before': {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          '#fff',
        )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
      },
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: '#aab4be',
      },
    },
  },
  '& .MuiSwitch-thumb': {
    backgroundColor:'#001e3c',
    width: 32,
    height: 32,
    '&:before': {
      content: "''",
      position: 'absolute',
      width: '100%',
      height: '100%',
      left: 0,
      top: 0,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
        '#fff',
      )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
    },
  },
  '& .MuiSwitch-track': {
    opacity: 1,
    backgroundColor: '#aab4be',
    borderRadius: 20 / 2,
  },
}));

function App () {
  const [films, setFilms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [themeMode, setThemeMode] = useState(themes.dark);
  const [logo, setLogo] = useState('http://pngimg.com/uploads/star_wars_logo/star_wars_logo_PNG28.png');
  const [added, setAdded] = useState(false);
  const [newFilms, setNewFilms] = useState([]);

  useEffect(() => {
    async function fetchFilms () {
      let res = await fetch('https://swapi.dev/api/films/')
      let data = await res.json();
      setFilms(data.results);
      setLoading(false);
    }
    fetchFilms();
  }, [])

  const handleChange = (event) => {
    if (themeMode===themes.dark) {
      setThemeMode(themes.light);
      setLogo('https://www.pngkit.com/png/full/0-6491_star-wars-logo-png-star-wars-antiestres-8.png')
    } else {
      setThemeMode(themes.dark);
      setLogo('http://pngimg.com/uploads/star_wars_logo/star_wars_logo_PNG28.png')
    }
  };

  const handleAdd = () => {
    if (newData.length !== 0){
      setNewFilms([...newFilms, newData]);
      setAdded(true);
    }
  }

  return (
    <ThemeContext.Provider value={themeMode}>
      <div className="App">
        <div className='header-grid'>
          <img src={logo} alt='Star Wars' style={{ width: '30vw'}} />
          <div className='darkmodeswitch-container'>
            <MaterialUISwitch sx={{ m: 1 }} defaultChecked onChange={handleChange} />
            <AddFilm />
          </div>
        </div>
        <NavAppBar />
        { 
          loading ?
            <>
              <h1 style={{color:'#ffff'}}>Loading...</h1>
            </>
          :
          <Container sx={{padding: 2}}>  
            <Films data={films} />
            <Button variant='contained' onClick={handleAdd} sx={{margin: 2}}>Load Added Films</Button>
            {
              added ? 
              <>
                <Films data={newFilms} />
              </>
            :
              <></>
            }
          </Container>
        }
      </div> 
    </ThemeContext.Provider>
  );
}

export default App;