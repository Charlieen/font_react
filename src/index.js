import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './ThinkingInReact/main.css';
//import App from './jsx/App';
//import App from './rendering-elements/App.jsx';
//import App from './components/App';
//import App from './state/App';
// import App from './HandleEvent/App';
// import App from './ConditionalRender/App';
// import App from './List/App';
// import App from './Forms/App';
// import App from './LiftStateUp/App';
// import App from './CompositionVsInheritance/App';
import App from './MainFlow/ThinkingInReact/App';






import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
