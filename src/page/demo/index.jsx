import React, { useState } from "react";

export const Demo = () => {
  const [number, setNumber] = useState(10);

  return (
    <div>
      <h1>{number}</h1>
      <button
        onClick={() => {
          setNumber(number + 1);
          console.log(number);
        }}
      >
        Add
      </button>
    </div>
  );
};
