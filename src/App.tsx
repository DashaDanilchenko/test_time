import { Accordion } from "./components/Accordion/Accordion";
import { useAppDispatch, useAppSelector } from "./hooks";
import { PropsAccordion } from "./interface";
import { useState, useEffect } from "react";
import { stateTimeAnswer } from "./story/sliceTeat";
import { Result } from "./components/Result/Result";
import { IoCloseSharp, IoRefreshSharp } from "react-icons/io5";

interface TimeProps {
  s: number;
  m: number;
  h: number;
}

const App = () => {
  const dispatch = useAppDispatch();

  const [result, setResult] = useState(false);

  const [stateResult, setStateResult] = useState(true);

  const dataExercises = useAppSelector((state) => state.exercises.exercises);

  useEffect(() => {
    setStateResult(dataExercises.some((data) => data.create === false));
  }, [dataExercises]);

  const [activeElement, setActiveElement] = useState<string>(() => {
    if (localStorage.getItem("activeElement")) {
      return JSON.parse(localStorage.getItem("activeElement") || "");
    } else {
      return "";
    }
  });

  const [interv, setInterv] = useState<any>();

  const [time, setTime] = useState<TimeProps>(() => {
    if (localStorage.getItem("time")) {
      return JSON.parse(localStorage.getItem("time") || "");
    } else {
      return { s: 0, m: 0, h: 0 };
    }
  });

  const [stateTime, setStateTime] = useState(() => {
    if (localStorage.getItem("stateTime")) {
      return JSON.parse(localStorage.getItem("stateTime") || "");
    } else {
      return false;
    }
  });

  useEffect(() => {
    localStorage.setItem("activeElement", JSON.stringify(activeElement));
    localStorage.setItem("stateTime", JSON.stringify(stateTime));
    localStorage.setItem("time", JSON.stringify(time));
  }, [time, stateTime, activeElement]);

  let updatedS = time.s,
    updatedM = time.m,
    updatedH = time.h;

  const run = () => {
    if (updatedM === 60) {
      updatedH++;
      updatedM = 0;
    }
    if (updatedS === 60) {
      updatedM++;
      updatedS = 0;
    }
    updatedS++;
    return setTime({ s: updatedS, m: updatedM, h: updatedH });
  };

  const startTime = () => {
    run();
    setInterv(setInterval(run, 1000));
  };

  const stopTime = () => {
    clearInterval(interv);
    return setTime({ s: 0, m: 0, h: 0 });
  };

  const changeActiveElement = (id: string) => {
    if (activeElement === "") {
      setStateTime(true);
      startTime();
      return setActiveElement(id);
    }
  };

  const getInfo = (id: string) => {
    if (id === activeElement) {
      stopTime();
      dispatch(stateTimeAnswer({ id, time }));
      return setActiveElement("");
    }
  };

  window.addEventListener("load", () => {
    stateTime ? startTime() : stopTime();
  });

  const TryAgain = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <div>
      {result ? (
        <div className="result">
          <div className="close">
            <p>Your result</p>
            <button onClick={() => setResult(false)}>
              <IoCloseSharp />
            </button>
          </div>

          {dataExercises.map((exercise: PropsAccordion, index: number) => (
            <Result key={index} exercise={exercise} />
          ))}
        </div>
      ) : (
        <div>
          <div className="accordion">
            {dataExercises.map((exercise: PropsAccordion, index: number) => (
              <Accordion
                key={index}
                exercise={exercise}
                activeElement={activeElement}
                changeActiveElement={changeActiveElement}
                getInfo={getInfo}
                time={time}
              />
            ))}
          </div>
          <div className="wrapper">
            <button
              className="red"
              disabled={stateResult}
              onClick={() => setResult(true)}
            >
              get result
            </button>
            <button
              className="green"
              disabled={stateResult}
              onClick={() => TryAgain()}
            >
              try again
              <IoRefreshSharp className="re_fresh" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
