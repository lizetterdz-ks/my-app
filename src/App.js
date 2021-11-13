import React, {useState, useEffect} from 'react'; 
import Container from '@mui/material/Container'
import Films from './components/Films'
import NavAppBar from './components/FilmsHeading'
import './App.css';

const themes = {
  dark: {
    color: '#FFFF',
    accent: '#BF0A30',
    background: '#464F76'
  },
  light: {
    color: '#0000',
    accent: '#FF0000',
    background: '#464F76'
  }
}

export const ThemeContext = React.createContext(themes.dark);

function App () {
  const [films, setFilms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFilms () {
      let res = await fetch('https://swapi.dev/api/films/')
      let data = await res.json();
      setFilms(data.results);
      setLoading(false);
    }
    fetchFilms();
  }, [])

  return (
    <ThemeContext.Provider value={themes.dark}>
      <div className="App">
        <img src='http://pngimg.com/uploads/star_wars_logo/star_wars_logo_PNG28.png' alt='Star Wars' style={{ width: '30vw'}} />
        <NavAppBar />
        { 
          loading ?
            <>
              <h1 style={{color:'#ffff'}}>Loading...</h1>
            </>
          :
          <Container sx={{padding: 2}}>
            <Films data={films}/>
          </Container>
        }
      </div> 
    </ThemeContext.Provider>
  );
}

export default App;