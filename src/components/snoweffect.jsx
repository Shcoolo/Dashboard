import React, { useState, useEffect } from 'react';
import Snowflake from '../components/snowflakes';

const SnowEffect = ({ count = 50 }) => {
  const [snowflakes, setSnowflakes] = useState([]);

  useEffect(() => {
    const createSnowflakes = () => {
      const flakes = Array.from({ length: count }, (_, i) => ({
        id: i,
        size: Math.random() * 5 + 2,
        left: Math.random() * 100,
        delay: Math.random() * 5,
        opacity: Math.random() * 0.5 + 0.3
      }));
      setSnowflakes(flakes);
    };

    createSnowflakes();
  }, [count]);

  return (
    <div className="snow-container">
      {snowflakes.map((flake) => (
        <Snowflake
          key={flake.id}
          size={flake.size}
          left={flake.left}
          delay={flake.delay}
          opacity={flake.opacity}
        />
      ))}
    </div>
  );
};

export default SnowEffect;