import React, { useState, useEffect } from 'react';

function AnalysisPage() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log(count, 'count');
    return () => {
      console.log('离开页面时打印');
    };
  });

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
}

export default AnalysisPage;
