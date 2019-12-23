import React from 'react';

const RenderSomeSpans = arrayOfText => {
  return (
    <div>
      <span
        className='color-example-1'
        style={{ width: '20px', display: 'inline-block', height: '20px' }}
      >
        {arrayOfText && arrayOfText[0]}
      </span>
      <span
        className='color-example-2'
        style={{ width: '20px', display: 'inline-block', height: '20px' }}
      >
        {arrayOfText && arrayOfText[1]}
      </span>
      <span
        className='color-example-3'
        style={{ width: '20px', display: 'inline-block', height: '20px' }}
      >
        {arrayOfText && arrayOfText[2]}
      </span>
      <span
        className='color-example-4'
        style={{ width: '20px', display: 'inline-block', height: '20px' }}
      >
        {arrayOfText && arrayOfText[3]}
      </span>
    </div>
  );
};
const ExampleColors = () => {
  return <div>{RenderSomeSpans()}</div>;
};

export default ExampleColors;
