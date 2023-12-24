import {  PropsTask} from "../../interface"
import { useEffect, useState } from "react"
import StopWatch from "../StopWatch/StopWatch"
import { useAppDispatch } from "../../hooks"
import { stateAnswer } from "../../story/sliseTeat"



interface Props {
  task: PropsTask,
  id: string,
  activeElement: string,
  time: {
      ms: number,
      s: number,
      m: number,
      h: number,
    },
    getInfo: (id: string) => void, 

}


export const ContextAccordion = ({task, id,
   activeElement, time, getInfo,
  
  }: Props) => {
  const {context, answers} = task

  const dispatch = useAppDispatch()

  const [stateButton, setStateButton] = useState(false)

  useEffect(() => {
    setStateButton(!answers.some(answer => answer.done === true))
  }, [answers])

  const changeStateAnswer = (id:string, id_from_answer:string, done:boolean, correct: boolean) =>{
    dispatch(stateAnswer({id, id_from_answer, done, correct})) 
  }

  return (
    <div
     className={id === activeElement ? "" : "none"}
     >
      <p>{context}</p>
     {answers.map(( answer, index) => 
     <div key={index}>
      <p>{answer.text}</p>
      <div >
      <input type="radio" checked={answer.done} onChange={() => changeStateAnswer(id, answer.answer_id, answer.done, answer.correct)}/>
      </div>
     </div>
     )}
     <button disabled={stateButton}  onClick={() => getInfo(id)}>get</button>
     
     <StopWatch time={time}/>
    </div>
  )
}