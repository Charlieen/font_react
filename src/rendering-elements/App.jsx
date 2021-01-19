import React,{ReactDOM} from "react";

/**
 * Unlike browser DOM elements, React elements are plain objects,and
 * are cheaper to create,React DOM takes care of updating the DOM to 
 * match the React elements
 * 
 * React elements are immutable,once you create an element,you can't 
 * change its children or attributes,
 * An elements is like  a single frame in a movie: it represents the
 * UI at a certain point in time
 * The only way to update the UI is to create a new element,and
 * pass it to ReactDOM.render();
 * 
 */
const element= <h1>Hello,world</h1>


class App extends React.Component{

    render(){
        
        return (
            <div>
            <h1>hello</h1>
            {element}
            </div>
           
            );
    }
};

export default App;