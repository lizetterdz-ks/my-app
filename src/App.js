import React, {useState, useEffect} from 'react'; 
import Container from '@mui/material/Container'
import Films from './components/Films'
import NavAppBar from './components/FilmsHeading'
import './App.css';
// import { createTheme } from '@mui/material/styles';
// import { green, purple } from '@mui/material/colors';

// const theme = createTheme({
//   palette: {
//     primary: {
//       main: purple[500],
//     },
//     secondary: {
//       main: green[500],
//     },
//   },
// });

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

  console.log("films", films);

  return (
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
  );
}

export default App;
