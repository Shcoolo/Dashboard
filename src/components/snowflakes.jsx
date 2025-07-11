import React from 'react';

const Snowflake = ({ size, left, delay, opacity }) => {
  const style = {
    left: `${left}%`,
    width: `${size}px`,
    height: `${size}px`,
    opacity: opacity,
    animationDelay: `${delay}s`,
    animationDuration: `${Math.random() * 3 + 5}s`
  };

  return <div className="snowflake" style={style}></div>;
};

export default Snowflake;