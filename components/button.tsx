// Example

import React from 'react';

const SimpleButton: React.FC = () => {
  const handleClick = () => {
    alert('Button clicked!');
  };

  return (
    <button onClick={handleClick}>Click Me</button>
  );
};

export default SimpleButton;
