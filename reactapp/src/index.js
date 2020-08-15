import React from 'react';
import ReactDOM from 'react-dom';

/* const getButtonText = () => {
  return 'Click Me!';
}; */

const App = () => {
  const buttonText = ['hi', 'there'];
  return (
    <div>
      <label className="label" htmlFor="name">
        Enter Name:
      </label>
      <input id="name" type="name" />
      <button style={{ backgroundColor: 'blue', color: 'white' }}>
        {buttonText}
      </button>
    </div>
  );
};

ReactDOM.render(<App />, document.querySelector('#root'));
