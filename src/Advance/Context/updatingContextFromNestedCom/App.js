import {ThemeContext,themes} from './theme-context';
import ThemeToggleButton from './theme-toggle-button';
import React from 'react';

class App extends React.Component{
    constructor(props){
        super(props);
        this.toggleTheme = ()=>{
            console.log('was called');
            this.setState(state=>({
                theme:
                state.theme === themes.dark
                ? themes.light
                : themes.dark,
            }))
        }
        this.state={
            theme:themes.light,
            toggleTheme:this.toggleTheme
        }
    }
    render(){
        return (
            <ThemeContext.Provider value={this.state}>
                <Context/>
            </ThemeContext.Provider>
        )
    }
}

function Context(){
    return (<div>
        <ThemeToggleButton/>
        </div>)
}

export default App;