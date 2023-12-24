import { Accordion } from "./componenets/Accordion/Accordion"
import { useAppDispatch, useAppSelector } from "./hooks"

import {PropsAccordion} from "./interface"
import { useState, useEffect } from "react"

import { stateTimeAnswer } from "./story/sliseTeat"

import { Resalt } from "./componenets/Resalt/Resalt"

// localStorage.clear()

interface TimeProps {
  ms: number,
  s: number,
  m: number,
  h: number,
}

const App = () => {

  const dispatch = useAppDispatch()

  const [resalt, setResalt] = useState(false)

  const [stateResalt, setStateResalt] = useState(true)

  useEffect(() => {
    setStateResalt(dataExercises.some(data => data.create === false))
  })

    const [activeElement, setActiveElement] = useState<string>(() => {
      if (localStorage.getItem('activeElement')) {
        return (JSON.parse(localStorage.getItem('activeElement') || ''))
      } else {
        return ''
      }
    })

    const [interv, setInterv] = useState<any>()

    const [time, setTime] = useState<TimeProps>(() => {
      if (localStorage.getItem('time')) {
        return (JSON.parse(localStorage.getItem('time') || ''))
      } else {
        return {ms:0, s:0, m:0, h:0}
      }
    })
  
    const [stateTime, setStateTime] = useState(() => {
      if (localStorage.getItem('stateTime')) {
        return (JSON.parse(localStorage.getItem('stateTime') || ''))
      } else {
        return false
      }
    })

    useEffect (() => {
      localStorage.setItem('activeElement', JSON.stringify(activeElement))
      localStorage.setItem('stateTime', JSON.stringify(stateTime)) 
    localStorage.setItem('time', JSON.stringify(time))
    }, [time, stateTime ,activeElement])

    let updatedMs = time.ms, updatedS = time.s, updatedM = time.m, updatedH = time.h

    const run = () => {
      if (updatedM === 60) {
        updatedH++;
        updatedM = 0
      }
      if (updatedS === 60) {
        updatedM++;
        updatedS = 0
      }
      if (updatedMs === 100) {
        updatedS++;
        updatedMs = 0
      }
      updatedMs++
      return setTime ({ms:updatedMs, s:updatedS, m:updatedM, h:updatedH})
    }
  
    const startTime = () => {
      run();
      setInterv (setInterval(run, 1))
    } 
  
    const stopTime = () => {
      clearInterval(interv)
      return setTime ({ms:0, s:0, m:0, h:0})
    }
  
     const chengeActiveElement = (id:string) => {
      if (activeElement === '') {
        setStateTime(true)
        startTime()
        return setActiveElement(id)
      }
     }
  
     const getInfo = (id:string) => {
     
      if (id === activeElement) {
        stopTime()
        dispatch(stateTimeAnswer({id, time}))
        return  setActiveElement('')
      }}
  
    window.addEventListener('load', () => {
      stateTime ? startTime() : stopTime();
    });

    const dataExercises = useAppSelector((state) => state.exercises.exercises)

  return (
<div>
  {resalt
  ?  <div>
  <button onClick={() => setResalt(false)}>x</button>
  {dataExercises.map((exercise: PropsAccordion, index:number) => <Resalt key={index} exercise={exercise}/>)}
  </div> 
  : <div>
  {dataExercises.map((exercise: PropsAccordion, index:number) => <Accordion key={index} 
  exercise={exercise} 
  activeElement = {activeElement} 
  chengeActiveElement= {chengeActiveElement}
  getInfo = {getInfo}
  time = {time}
  />)}
  <button disabled={stateResalt} onClick={() => setResalt(true)}>get resalt</button>
   </div>
  }
</div>
    
   
  )
}

export default App

