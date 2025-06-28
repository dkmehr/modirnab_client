import { useEffect, useState } from "react";

const Timer = ({ time, countingTime, reload }) => {
  const [state, setState] = useState({
    time,
    seconds: time - Math.floor((time - 1) / 60) * 60 - 1,
    minuts: Math.floor((time - 1) / 60),
  });

  useEffect(() => {
    setTimeout(() => {
      if (state.time === 0) {
        countingTime(1);
        return;
      }
      setState({
        time: state.time - 1,
        minuts: Math.floor((state.time - 1) / 60),
        seconds: state.time - Math.floor((state.time - 1) / 60) * 60 - 1,
      });
    }, 1000);
  }, [state.time]);

  useEffect(() => {
    if (reload) {
      setState({
        time,
        seconds: time - Math.floor((time - 1) / 60) * 60 - 1,
        minuts: Math.floor((time - 1) / 60),
      });
    }
  }, [reload]);
  return (
    <section className="timer-counter persian-number">
      {`0${state.minuts} : ${
        state.seconds <= 10 ? `0${state.seconds}` : state.seconds
      }`}
    </section>
  );
};

export default Timer;
