import logo from './logo.svg';
import './App.css';
import React from "react";

const user={
  firstName:'Charlie',
  lastName:"Ding"
}
function formatName(user){
  return user.firstName + " " + user.lastName;
}
/**
 * JSX is an Expression Too 
 * After compilation,JSX expression change into normal javascript object and
 * function 
 * become regular js function calls and evaluate to js object;
 * 
 * Since JSX is close to Javascript than to HTML,ReactDom uses 
 * camelCase property naming convention instead of HTML attribute names
 */
function getGreeting(user){
  if(user){
    return <h1>Hello,{formatName(user)}</h1>
  }else{
    return <h1>Hello,Stranger!</h1>
  }
}

const elementWithChildren=(<div>
    <h1>Hello!</h1>
    <h2>Good to see you again!</h2>
  </div>);
const response={
  potentiallyMaliciousInput:function(){
   
      console.log("Pre do very bad things,begin");
      //return "Charlie Ding is good"

      /**
       * Functions are not valid as a React child.
       *  This may happen if you return a Component instead of
       *  <Component /> from render. Or maybe you meant to call this 
       * function rather than return it.
       * 
       * By default, React DOM escapes any values embedded in
       *  JSX before rendering them. Thus it ensures that you can
       *  never inject anything that’s not explicitly written in
       *  your application. Everything is converted to a string before
       *  being rendered. This helps prevent XSS (cross-site-scripting) 
       *  attacks.


       */
      return function(){
        console.log("I want to do very bad thing now!!!");
      }
    
  }
}
//const title=response.potentiallyMaliciousInput();
// console.log(title);
const stillSafeElement = <h1>{response.potentiallyMaliciousInput()}</h1>
console.log(stillSafeElement);

/*
  JSX Represents Objects
  Babel compiles JSX down to React.createElement()calls
  These two examples are identical;
*/
const elementOriginal= (
  <h1 className="greeting">
    Hello,world;
  </h1>
);

/**
 * createElement performs a few checks to help you
 * write bug-free code and more safe code,
 */
const elementCreate = React.createElement('h1',
{className:'greeting'},'Hello world');

function App() {
  const name="Charlie Ding";
  const element=<h1>Hello,{formatName(user)}!</h1>;

  
  return (
    <div>
   {/* 
      <h1 class="tabIndex" value="JSX IS expression"></h1>
     {getGreeting(user)}
     {elementWithChildren}
       {stillSafeElement}
  */}
  {elementOriginal}
  <br/>
  {elementCreate}
  
    </div>
   
  );
}

export default App;
