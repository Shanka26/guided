import { Box,Autocomplete,TextField,Button, Typography} from '@mui/material'
import React,{useState,useEffect} from 'react'
import useSound from 'use-sound';
import rainSound from '../assets/sounds/rain.mp3'
import fireSound from '../assets/sounds/fireplace.mp3'
import waveSound from '../assets/sounds/waves.mp3'
import gongSound from '../assets/sounds/gong.mp3'
import Sound from 'react-sound';


const soundList=['No sound','Rain','Fire','Waves']

const Meditation = ({mantras,voice,time,homePage,interval}) => {
    
  const msg = new SpeechSynthesisUtterance()
  const inter=interval>0?interval*60:30
  let [startTime,setStartTime] = useState(0)
  let [timer,setTimer] = useState(time)
  let [timeLeft,setTimeLeft]=useState(time)
  let [volume,setVolume]=useState(0.5)

  let[sound,setSound]=useState()
  let[finished,setFinished]=useState(false)
  let[paused,setPaused]=useState(false)
  let[spoken,setSpoken]=useState(false)

  let [playMusic]=useSound(sound,{volume:volume})
  let [playRain]=useSound(rainSound,{volume:volume})
  let [playFire]=useSound(fireSound,{volume:volume})
  let [playWaves]=useSound(waveSound,{volume:volume})
  let [playGong]=useSound(gongSound,{volume:volume})

  const speechHandler = (msg) => {
    let rndInt =  Math.floor(Math.random() * mantras.length) 
    msg.text = mantras[rndInt]
    let win =window.speechSynthesis
    let voices=win.getVoices()
    msg.voice=voices[voice]
    win.speak(msg)
    // console.log(win.getVoices())
  }

  const handleSound=(v)=>{
    
    switch(v){
        case 'Rain':
            setSound(rainSound)
            // playRain()
            
            break;
        case 'Waves':
            setSound(waveSound)
            // playWaves()
            break;
        case 'Fire':
            setSound(fireSound)
            // playFire()
            break;
        default:
            setSound(null)
            break;
    }
    console.log(sound)
  }



  useEffect(() => {
    startTime==0 && setStartTime(Date.now())
    // console.log('start Time')
    // playMusic()
    // playRain()
  },[])
  useEffect(() => {
    spoken&&speechHandler(msg)
    
    // console.log('spoken:'+spoken+":"+timeLeft)
  },[spoken])

//   useEffect(() => {playMusic()},[sound])
  useEffect(() => {
        
    // clearInterval(interval)
    
    // console.log(timeRef.current +1)
    // timeRef.current=timeRef.current+1
    if(startTime!=0){
        
        interval= setInterval(() => {

       
        clearInterval(interval)
        if(!finished&&!paused){
            clearInterval(interval)
    
            if (timeLeft>0){
              spoken&&setSpoken(false)
                
                // console.log(baseTime-Math.floor((Date.now() - startTime) / 1000))
                
                !paused&&setTimeLeft(timer-Math.floor((Date.now() - startTime) / 1000)>=0?timer-Math.floor((Date.now() - startTime) / 1000):0)
                if(timeLeft%inter==0&&!spoken){
                  setSpoken(true)
                }
                console.log(inter)
                // console.log(timer+"|"+Date.now()+"-"+startTime)
                // setTimeLeft(timeLeft-1) 
                // clearInterval(interval)

            }
            if(timeLeft==0){
                
                setFinished(true)
                playGong()
                homePage()
                // setSound(null)
            }
    }
    return(()=>{clearInterval(interval)});
    },1000)}

},)

let timeFormat=(time)=>{
  let min,sec=0
  if(time>60){
      min= Math.trunc(time/60)
  }
  else{
      min=0
  }
  sec =time%60

  
  sec=sec>=10?sec:'0'+sec
  return(min+":"+sec)
  
}

  return (
    <Box>
        <Box><Typography variant="h4" align='center'>{timeFormat(timeLeft)}</Typography></Box>

        <Box mx={24} p={4}>
            <Autocomplete  onChange={(event, newValue) => {handleSound(newValue);}} options={soundList} renderInput={(params) => <TextField {...params} label="Background Sounds" />}></Autocomplete>
        </Box>

        <Sound
      url={sound}
      playStatus={Sound.status.PLAYING}
    //   playFromPosition={300 /* in milliseconds */}
    //   onLoading={this.handleSongLoading}
    //   onPlaying={this.handleSongPlaying}
    //   onFinishedPlaying={this.handleSongFinishedPlaying}
    />
    <Box display="flex" justifyContent="center" gap={4}>
      <Button variant='contained' onClick={homePage}>Stop</Button>
      <Button variant='contained' 
      onClick={()=>{paused&&setStartTime(Date.now())
        !paused&&setTimer(timeLeft)
        setPaused(!paused)
      
    }}
      >{paused?"Continue":"Pause"}</Button>
    </Box>
    </Box>
  )
}

export default Meditation