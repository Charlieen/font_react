import React from 'react';

function activateLasers(){
    alert('the lasers are activated!!!');
}
/**
 * in html 
 * <button onclick="activateLasers()">Activate Lasers</button>
 */
const button= (<button onClick={activateLasers}>
        Activate Lasers
        </button>);

 /** in html
*  <a href="#" onclick="console.log('the link was clicked'); return false">click me</a>
*/
function ActionLink(){
    function handleClick(e){
        e.preventDefault();
        console.log("The link was clicked");
    }
    return(
        <a href="#"
        onClick={handleClick}
        >Click me</a>
    );
}
class Toggle extends React.Component{
    constructor(props){
        super(props);
        this.state={isToggleFlag:false}
        this.handleClick= this.handleClick.bind(this);
    }
    handleClick(){
        this.setState(state=>{
            return {isToggleFlag:!state.isToggleFlag};
        })
    }   

    render(){
        return (
            <button onClick={this.handleClick}>
            {this.state.isToggleFlag?'ON':'OFF'}
            </button>
        )
    }
}
class LoginButton extends React.Component{
    constructor(props){
        super(props);
    }
    /** class field syntax, 
     *  This syntax ensures `this` is bound within handleClick
     * Warning: this is *experimental* syntax
     * some kind of  syntax sugar Babel add this to this 
     * kind of arrow function 
     */
    handleClick=()=>{
        console.log('this is:'+ this);
    }

    render(){
        return (
            <button onClick={this.handleClick}>Click me</button>
        )
    }
}
class LoggingButton extends React.Component{
    handleClick(){
        console.log('this is',this);
    }
    /**
     * a different callback function is created each time
     * the loggingButton renders,
     * So binding in the constructor or using the class filed
     * syntax to avoid this sort of  performance problem
     */
    render(){
        return (
            <button
            onClick={()=>{this.handleClick()}}
            >Click me 2</button>
        );
    }
}
class PassingArguments extends React.Component{
    /**
     *  e is SyntheticBaseEvent
     * https://reactjs.org/docs/events.html
     * In both case ,the e argument representing the React event will be 
     * passed as a second argument after the ID, With an arrow function,we
     * have to pass it explicity,but with bind any further arguments are 
     * automatically forwards
     */
    deleteRow=(id,e)=>{
        console.log('id is:',id);
        console.log('e is ',e);
    }

    render(){
        const id1=1;
        const id2=2;
        return (
            <div>
            <button 
            onClick={(e)=>{this.deleteRow(id1,e)}}
            >Delete Row 1</button>
            <button 
            onClick={this.deleteRow.bind(this,id2)}
            >Delete Row 2</button>

            </div>
        )
    }
}

class App extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <div>
            <h1>Hello Events</h1>
            {button}
            <ActionLink/>
            <Toggle/>
            <LoginButton/>
            <LoggingButton/>
            <br/>
            <PassingArguments/>
            </div>
            );
    }
}

export default App;