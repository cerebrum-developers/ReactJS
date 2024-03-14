// import { createTimeModel, useTimeModel } from "react-compound-timer";
// import { TimeModelValueView } from "./TimeModelValueView";

// const timer = createTimeModel({
//   initialTime: 10000,
//   direction: "backward",
// });

// export const MyTimer = () => {
//   const { value } = useTimeModel(timer);

//   return <TimeModelValueView title="Timer" description="Simple timer that counts backwards from 10 seconds to 0 seconds" value={value} />;
// };



// import React, { useState, useEffect } from 'react';
// import { useCompoundTimer } from 'react-compound-timer';

// const MyTimer = ({ initialTime, handleOnTimerStop }) => {
//   const [timerState, timerControls] = useCompoundTimer({
//     initialTime,
//     direction: 'backward',
//   });

//   useEffect(() => {
//     if (timerState.time === 0) {
//       handleOnTimerStop();
//     }
//   }, [timerState.time, handleOnTimerStop]);

//   return (
//     <div>
//       {timerState.time}
//       <button onClick={timerControls.start}>Start</button>
//       <button onClick={timerControls.pause}>Pause</button>
//       <button onClick={timerControls.reset}>Reset</button>
//     </div>
//   );
// }

// export default MyTimer;