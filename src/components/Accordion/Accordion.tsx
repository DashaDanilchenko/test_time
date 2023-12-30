import { ContextAccordion } from "./ContextAccordion";
import { HeaderAccordion } from "./HeaderAccordion";
import { PropsAccordion } from "../../interface";

interface TimeProps {
  s: number;
  m: number;
  h: number;
}

interface Props {
  exercise: PropsAccordion;
  activeElement: string;
  changeActiveElement: (id: string) => void;
  getInfo: (id: string) => void;
  time: TimeProps;
}

export const Accordion = ({
  exercise,
  activeElement,
  changeActiveElement,
  getInfo,
  time,
}: Props) => {
  const { title, task, id, create } = exercise;

  return (
    <div>
      <HeaderAccordion
        title={title}
        id={id}
        changeActiveElement={changeActiveElement}
        create={create}
      />
      <ContextAccordion
        task={task}
        id={id}
        activeElement={activeElement}
        time={time}
        getInfo={getInfo}
      />
    </div>
  );
};
