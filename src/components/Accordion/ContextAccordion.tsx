import { PropsTask } from "../../interface";
import { useEffect, useState } from "react";
import StopWatch from "../StopWatch/StopWatch";
import { useAppDispatch } from "../../hooks";
import { stateAnswer } from "../../story/sliceTeat";

interface Props {
  task: PropsTask;
  id: string;
  activeElement: string;
  time: {
    s: number;
    m: number;
    h: number;
  };
  getInfo: (id: string) => void;
}

export const ContextAccordion = ({
  task,
  id,
  activeElement,
  time,
  getInfo,
}: Props) => {
  const { context, answers } = task;

  const dispatch = useAppDispatch();

  const [stateButton, setStateButton] = useState(false);

  useEffect(() => {
    setStateButton(!answers.some((answer) => answer.done === true));
  }, [answers]);

  const changeStateAnswer = (
    id: string,
    id_from_answer: string,
    done: boolean,
    correct: boolean
  ) => {
    dispatch(stateAnswer({ id, id_from_answer, done, correct }));
  };

  return (
    <div className={id === activeElement ? "context_accordion" : "none"}>
      <p className="contex_task">{context}</p>
      {answers.map((answer, index) => (
        <div key={index} className="answer_task">
          <input
            type="radio"
            checked={answer.done}
            onChange={() =>
              changeStateAnswer(
                id,
                answer.answer_id,
                answer.done,
                answer.correct
              )
            }
          />
          <p>{answer.text}</p>
        </div>
      ))}
      <button
        className="send"
        disabled={stateButton}
        onClick={() => getInfo(id)}
      >
        send
      </button>

      <StopWatch time={time} />
    </div>
  );
};
