import React from 'react';

function IsBoiling(props){
    if(props.temperature>=100){
        return <h2>The water would boil.</h2>
    }else{
        return <h2>The water would not boil.</h2>
    }
}
/** In this Demo , there are two parts(one input and boiling result) can change depend on one part (between two inputs) 
 * In React ,there is a rule is That 'There should be a single "source of truth" for any data that
 * changes in a React application' ,
 * Usually, the state is first added to the component that needs it for rendering,Then,if other components
 * also need it,you can lift it up to their closest common ancestor.
 * Instead of trying to sync the state between different components,you should rely on the 
 * top-down data flow.
 */
class InputTemperature extends React.Component{
    constructor(props){
        super(props);
        /**
         * If something can derived from either state or props,it probably shouldn't be in the state,
         * The value of the other input can always be calculated from them in the render() method.
         * 
         * State should hold the really need to record value come from user interface with final user(people)
         * 
         * This let us clear or apply rounding to the other field without losing any precision int the
         * user input
         * 
         * 
         */
        //this.state={temperature:0,scale:'c',views:{cel:0,fal:32}}
        this.state={temperature:0,scale:'c'}
  
        this.handleChange= this.handleChange.bind(this);
    }
    handleChange(e){
        
        const scale=e.target.name;
        const value = e.target.value;

       // this.setState({scale:scale,temperature:value,views:this.transBetweenCelAndFah(scale,value)});
       this.setState({scale:scale,temperature:value});
        
    
    }

    transBetweenCelAndFah(scale,value){
        let viewOfTemperature={cel:0,fah:32};
        if(scale ==='c'){ 
           viewOfTemperature.cel = value;
           viewOfTemperature.fah = Math.floor( Number(value)*(9/5)+ 32 );
             
        }else if(scale==='f'){
            viewOfTemperature.fah = value;
            viewOfTemperature.cel = Math.floor((Number(value)-32)* (5/9)); 
        }
        return viewOfTemperature;
    }

    render(){
        /** Here is for render, according the state  to render, so anything which can be derived from 
         * either props or state ,should be computed at here,
         * 
         */
        const views =this.transBetweenCelAndFah(this.state.scale,this.state.temperature);
        return(
            <div>
            {/*
             <InputSourceCelsius scale={'c'} cel={this.state.views.cel} onChange={this.handleChange}/>
            <InputSourceFahrenheit scale={'f'} fah={this.state.views.fah} onChange={this.handleChange}/>
               <IsBoiling temperature={this.state.views.cel}/>
            */}
            <InputSourceCelsius scale={'c'} cel={views.cel} onChange={this.handleChange}/>
            <InputSourceFahrenheit scale={'f'} fah={views.fah} onChange={this.handleChange}/>
            <hr/>
            <IsBoiling temperature={views.cel}/>
            </div>       
        );
    }

}

function InputSourceCelsius(props){
    return (<div>
        <label>
        Enter temperature in Celsius:
        <input type="text" value={props.cel} name={props.scale} onChange={props.onChange}/>
        </label>
        </div>);
}
function InputSourceFahrenheit(props){
    return (<div>
        <label>
        Enter temperature in Fahrenheit:
        <input type="text" value={props.fah} name={props.scale} onChange={props.onChange}/>
        </label>
        </div>);
}

const App=()=>{return (
    <div>
    <h1>Lifting-state-up</h1>
    <hr/>
    <InputTemperature/>
    </div>
   
)}

export default App;