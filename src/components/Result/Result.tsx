import { IoAdd, IoRemove, IoStopwatchOutline } from "react-icons/io5";
import { PropsAccordion } from "../../interface";

interface PropsResult {
  exercise: PropsAccordion;
}

export const Result = ({ exercise }: PropsResult) => {
  const { time, answerUser, task } = exercise;

  return (
    <div className="item_result">
      <p className="context_result">
        {task.context}
        {answerUser ? (
          <IoAdd className="plus" />
        ) : (
          <IoRemove className="minus" />
        )}
      </p>
      <p className="context_result">
        <IoStopwatchOutline className="watch" /> {time}
      </p>
    </div>
  );
};
