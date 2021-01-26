import React from 'react';
/** Context lets us pass a value deep into the component tree without explicitly threading it
 * through every component.Create a context for the current theme 
 * 
 * Context can do not depend on the props chain (need explicitly at total props chain)
 */
/** API 1: React.createContext(defaultValue) 
 * Creates a Context object.When React renders a component that subscribes to this
 * Content object it will read the current context value from the closest matching
 * Provider above it in the tree
 * 
 * The defaultValue argument is only used when a component does not have a matching Provider above
 * it in the tree.
 * 
 */
const ThemedContext = React.createContext("light");

/** API 5 Context.displayName
 * Context object accepts a displayName string property.React DevTools uses this string 
 * to determine what to display for the context
 * <ThemedContext.Provider> // "MyDisplayName.Provider" in DevTools
 */
ThemedContext.displayName="MyDisplayName";

/** Use a Provider to pass the current theme to the tree below, any component can read it,
 * no matter how deep it is,
 * value="dark"
 */
/** API 2: Context.Provider
 * Every Context object comes with a Provider React component that allows  consuming components
 * to subscribe to context changes.
 *  
 * The Provider component accepts a value prop to be passed to consuming components that are descendants
 * of this Provider.One Provider can be connected to many consumers,Providers can be nested to override
 * values deeper within the tree.
 * 
 * 
 */
class App extends React.Component{
    
    render(){
        const MatchProvider = <ThemedContext.Provider theme="dark">
        <Toolbar/> 
        </ThemedContext.Provider>;
        /**
         * This is a example to show use defaultValue of Context
         */
        const noMatchProvider = <Toolbar/>;
        return noMatchProvider;
    }
}

/**
 * A component in the middle doesn't have to pass the theme down explicitly anymore
 * 
 * All component that are descendants of a Provider will re-render whenever the Provider's value 
 * prop changes,The propagation from Provider to its descendant consumes(including .contextType and useContext)
 * is not subject to the shouldComponentUpdate method, so the consumer is updated even when an 
 * ancestor component skips an update,
 * 
 * Changes are determined by comparing the new and old values using the same algorithm as Object.is
 */
function Toolbar(){
    return (
        <div>
        <ThemedButton/>
        </div>
    );
}
/* API 3: Class.contextType  
* The contextType property on a class can be assigned a Context object created by React.createContext()
This lets you consume the nearest current value of that Context type using this.context.
You can reference this in any the lifecycle methods including the render function
*/

/** API 4: Context.Consumer
 * A React component that subscribes to context changes,This let you subscribe to a context within
 * a function component
 * 
 * Requires a function as a child,The function receive the current context value and returns a React
 * node, The value argument passed to the function will be equal to the value prop of the closest 
 * Provider for this context above in the tree.
 */
class ThemedButton extends React.Component{
    // ThemedButton.contextType = ThemedContext  or useContext()
    // using the experimental public class fields syntax , add static class field to initialize contextType
    static contextType = ThemedContext;

    componentDidMount(){
        let value = this.context;
    }
    componentDidUpdate(){
        let value = this.context;
    }
    
    componentWillUnmount(){
        let value = this.context;
    }

    render(){
        console.log(this.context);
        return <div>
        <Button theme={this.context}/>
        <hr/>
        <ThemedContext.Consumer>
        { theme => <h2>This is consumer from Context: {theme}</h2>}
        </ThemedContext.Consumer>
        </div>
       
    }
    // ThemedButton.contextType = ThemedContext 
}

/**
 *Updating
An update can be caused by changes to props or state. These methods are called in the following order when a component is being re-rendered:

static getDerivedStateFromProps()
shouldComponentUpdate()
render()
getSnapshotBeforeUpdate()
componentDidUpdate() 
 *
 */
function Button(props){
    return <div>
    <button>{props.theme}</button>
    </div>
   
}

export default App;