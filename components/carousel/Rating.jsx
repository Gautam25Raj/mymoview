import React from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const Rating = ({ rating }) => {
  return (
    <div className="bg-black rounded-full p-0.5 z-50 overflow-hidden">
      <CircularProgressbar
        value={rating}
        maxValue={10}
        text={rating}
        styles={buildStyles({
          pathColor: rating < 5 ? 'red' : rating < 7 ? 'orange' : 'green',
          textColor: 'white',
          trailColor: 'transparent',
          textSize: '24px',
          backgroundColor: 'transparent',
        })}
        className="w-12 h-12"
      />
    </div>
  );
};

export default Rating;
