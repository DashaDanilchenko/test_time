import { ContextAccordion } from "./ContextAccordion"
import { HeaderAccordion } from "./HeaderAccordion"
import { PropsAccordion} from "../../interface"

interface TimeProps {
  ms: number,
  s: number,
  m: number,
  h: number,
}

interface Props {
  exercise: PropsAccordion;
  activeElement:string;
  chengeActiveElement:(id: string) => void;
  getInfo:(id:string) => void;
  time: TimeProps;
}


export const Accordion= ({exercise, 
  activeElement, 
  chengeActiveElement, 
  getInfo, 
  time,
}: Props) => {
  
  const {title, task, id, create} = exercise

  return (
    <div>
      <HeaderAccordion title={title} id={id} 
      chengeActiveElement={chengeActiveElement} 
      create={create}
      />
      <ContextAccordion task={task} id={id}  
      activeElement={activeElement}
      time={time}
      getInfo={getInfo}
      />
    </div>
  )
}