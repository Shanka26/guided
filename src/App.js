
import { Box } from "@mui/material";
import { useState } from "react"
import Home from './pages/Home'
import Meditation from './pages/Meditation'
import { createTheme, ThemeProvider } from '@mui/material/styles';



const theme = createTheme({
  palette: {
    primary:{
      light:'#eee',
      main:'#741724',
      mainDark:'#330821',
      dark:'#000'
    }
  },
  typography:{
    fontFamily:'Bree Serif',
    // fontFamily:'Oleo Script Swash Caps',
  }
});

function App() {
const meditationPage=(m,v,t,i)=>{setRenderPage(<Meditation homePage={homePage} time={t} mantras={m} voice={v} interval={i}/>)}
const homePage=()=>{setRenderPage(<Home meditationPage={meditationPage}/>)}
const[renderPage,setRenderPage]= useState(<Home meditationPage={meditationPage}/>)
  

  return (
    <ThemeProvider theme={theme}>
    <Box>
      {renderPage}
    </Box>
    </ThemeProvider>
  );
}

export default App;
