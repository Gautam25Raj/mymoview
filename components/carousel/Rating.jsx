import React from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const Rating = ({ rating, size, font }) => {
  return (
    <div className="bg-black/40 rounded-full p-0.5 z-50 overflow-hidden w-fit">
      <CircularProgressbar
        value={rating}
        maxValue={10}
        text={rating}
        styles={buildStyles({
          pathColor: rating < 5 ? 'red' : rating < 7 ? 'orange' : 'green',
          textColor: 'white',
          trailColor: 'transparent',
          textSize: font ? font : '24px',
          backgroundColor: 'transparent',
        })}
        className={size ? size : 'w-12 h-12'}
      />
    </div>
  );
};

export default Rating;
