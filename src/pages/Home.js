import React,{useState,useEffect,useRef} from 'react'
import { Box,Typography,TextField,Button,FormLabel,IconButton,RadioGroup,Radio,FormControlLabel,FormControl} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import backGround from '../assets/giphy4.gif'
// import {VoiceList} from '../components/VoiceList'



const iconButtonStyle={
  color:'#fff',
  ":disabled":{
    color:'#666'
  }
}


const scrollBar = {
  '&::-webkit-scrollbar': {
    width: '0.5em'
  },
  '&::-webkit-scrollbar-track': {
    '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.00)'
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: 'primary.mainDark',
    borderRadius: 8
    
  },
  '&::-webkit-scrollbar-thumb:hover': {
      backgroundColor: 'rgba(0,0,0,.4)',
      
    }
  }

  let textFieldStyle={
    '& .MuiOutlinedInput-root.Mui-focused':{
      '& fieldset': {
        borderColor: 'primary.light',
      },
    },
    '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#555',
    },
    '&:hover fieldset': {
      borderColor: 'primary.light',
    },
    '&:focused fieldset': {
      borderColor: 'primary.light',
    },
    "& label.Mui-focused": {
      color: 'primary.light'
    },
  },
  input:{color: '#fff'}
}



const Home = ({meditationPage}) => {
  const [ourText, setOurText] = useState('Welcome to your guided meditation')
  const msg = new SpeechSynthesisUtterance()
  const voiceList=window.speechSynthesis.getVoices()
  const [voice,setVoice]= useState()
  const [mins,setMins]= useState(1)
  const [interval,setInterval]=useState(1)
  

  const[mantras,setMantras]=useState(localStorage.getItem('mantras')?JSON.parse(localStorage.getItem('mantras')):[""]);
  const[mantraNum,setMantraNum]=useState(1);
  const mantraRef=useRef()

  const speechHandler = (msg,v) => {
    let win = window.speechSynthesis
    
    msg.text = ourText
    msg.voice=voiceList[v]
    msg.rate=v<3?0.65:0.91
    // console.log(SpeechSynthesisVoice(VoiceList[v]))
    win.speak(msg)
    
  }

  const handleVoiceSelect = (event) => {
    setVoice(event.target.value);
    // speechHandler(msg,event.target.value)
  };

  useEffect(() => {
    localStorage.setItem('mantras',JSON.stringify(mantras))
    console.log(mantras)
  },[mantras])

  useEffect(() => {
    console.log(voice)
    voice&&speechHandler(msg,voice)
    
  },[voice])

  const handleMantras = (event,i) => {
    // setMantras(event.target.value);
    setMantras([...mantras.slice(0,i),event.target.value,...mantras.slice(i+1,mantras.length)])
  };
  const handleMantrasDel = (event,i) => {
    // setMantras(event.target.value);
    setMantras([...mantras.slice(0,i),...mantras.slice(i+1,mantras.length)])
  };

  const handleMantrasEnter = (event) => {
    // setMantras(event.target.value);
    if(event.key==='Enter'){
    mantras[mantras.length-1]!=""&&setMantras([...mantras,""])
  }
  };
  

  return (
    <Box p={8} px={16} sx={{color:'primary.light',backgroundColor:'black',backgroundImage:`url(${backGround})`,backgroundRepeat:'no-repeat',backgroundPosition:'center', backgroundSize:'70%'}}>
        <Typography variant='h2' align="center">Your Own Guided Meditation</Typography>
        <Box>
            <Box overflow='auto' p={4} px={8} my={4} backgroundColor='rgba(250,250,250,0.04)' sx={scrollBar} borderRadius={2} border={1}  height={'40vh'} gap={4} alignItems='center' display="flex" flexDirection='column'>
            <Typography variant='h3'>Mantras/quotes</Typography>
            {mantras.map((m,i)=>(
                <Box display='flex' width='100%'>
                    <TextField  autoFocus  value={m} key={i} sx={{...textFieldStyle,width:'100%'}} onChange={(e)=>handleMantras(e,i)} onKeyDown={handleMantrasEnter}></TextField> 
                    <IconButton sx={iconButtonStyle} disabled={mantras.length==1} onClick={(e)=>handleMantrasDel(e,i)}><RemoveIcon/></IconButton>
                </Box>
                
            ))}
            
            <IconButton sx={iconButtonStyle} disabled={mantras[mantras.length-1]==""} onClick={()=>{setMantras([...mantras,""])}}><AddIcon/></IconButton>
            </Box>
            <Box py={2} >
              <Typography>Mantra Interval:</Typography>
              
              <Box display="flex" my={1} alignItems='center' gap={1}>
              <Typography>Every </Typography>

              <Box border={1} borderRadius={2}  backgroundColor='rgba(250,250,250,0.04)' display='flex' p={1} gap={2} alignItems='center'>
              
                        {/* <TextField value={mins} onChange={(e)=>{setMins(e.target.value)}}/>
                        <Typography>mins</Typography> */}
                        <IconButton sx={iconButtonStyle} disabled={interval<1} onClick={()=>{setInterval(interval-1)}}>
                        <RemoveIcon />
                        </IconButton>
                        <Typography align='center'>{interval>0?interval:"30"}</Typography>
                        
                        <IconButton sx={iconButtonStyle}  onClick={()=>{setInterval(interval+1)}}>
                        <AddIcon />
                        </IconButton>
                        </Box>
                        <Typography>{interval>0?'minutes':'seconds'}</Typography>
                
              </Box>
              </Box>
        </Box>
        

                <Box py={2}>
                    <Typography>Length of meditation:</Typography>
                    <Box display="flex" alignItems="center" my={1} gap={1}>
                      <Box border={1} backgroundColor='rgba(250,250,250,0.04)' borderRadius={2} p={1} gap={2} display="flex" alignItems="center">
                        <IconButton sx={iconButtonStyle} disabled={mins<=1} onClick={()=>{setMins(mins-1)}}> <RemoveIcon  /></IconButton>
                        {/* <TextField value={mins} onChange={(e)=>{setMins(e.target.value)}}/>
                        <Typography>mins</Typography> */}
                        <Typography>{mins}</Typography>
                        <IconButton sx={iconButtonStyle} onClick={()=>{setMins(mins+1)}}>
                        <AddIcon />
                        </IconButton>
                        </Box>
                        <Typography>minutes</Typography>
                    </Box>
                </Box>

        <Box  border={1} backgroundColor='rgba(250,250,250,0.04)' borderRadius={2} my={2} p={2} display='flex'>
            
            <FormControl>
            <FormLabel ><Typography  color='primary.light'>Voice:</Typography></FormLabel>

            <Box display='flex' px={4} >
            <RadioGroup  row value={voice} onChange={handleVoiceSelect}>
            
            
            <FormControlLabel value="0" control={<Radio sx={{color: 'primary.main'}}/>} label="David" />
            <FormControlLabel value="1" control={<Radio sx={{color: 'primary.main'}}/>} label="Mark" />
            <FormControlLabel value="2" control={<Radio sx={{color: 'primary.main'}}/>} label="Zira" />
            <FormControlLabel value="5" control={<Radio sx={{color: 'primary.main'}}/>} label="Diana" />
            <FormControlLabel value="6" control={<Radio sx={{color: 'primary.main'}}/>} label="George" />
            
            
            </RadioGroup>
            </Box>
            
            </FormControl>
            
        </Box>

<Box display="flex" justifyContent='center' m={4}>
  <Button variant='contained' onClick={()=>{meditationPage(mantras,voice,mins*60,interval)}}>Start Meditation</Button></Box>

      
    </Box>
  )
}

export default Home