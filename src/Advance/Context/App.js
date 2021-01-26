import React from 'react';
import {ThemeContext,themes}from './examples/theme-context';
import ThemedButton from './examples/themed-button';

//An intermediate component that uses the ThemedButton
function Toolbar(props){
    
   return <ThemedButton onClick={props.changeTheme}>
    Change Theme
    </ThemedButton>
}

class App extends React.Component{
    constructor(props){
        super(props);
        this.state={theme:themes.light}
        this.toggleTheme=()=>{
            this.setState(state=>({
                theme:
                state.theme === themes.dark
                ? themes.light
                : themes.dark,
            }))
        }
    }
/**
 *the ThemedButton button inside the ThemeProvider uses the theme from 
 the state while the ont outside uses the default dark theme (on change) 
 */
    render(){
        return (
            <div>
            <ThemeContext.Provider value={this.state.theme}>
                <Toolbar changeTheme={this.toggleTheme}/>
            </ThemeContext.Provider>
            <div>
            <ThemedButton>Another One</ThemedButton>
            </div>
            </div>
        );
    }
}

export default App;