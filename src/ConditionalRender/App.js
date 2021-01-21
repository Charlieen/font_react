import  React from 'react'

function UserGreeting(props){
    return <h1>Welcome Back!</h1>
}
function GuestGreeting(props){
    return <h1>Please Sign In</h1>
}
function Greeting(props){
    const isLoggedIn= props.isLoggedIn;
    if(isLoggedIn){
        return <UserGreeting/>
    }else{
        return <GuestGreeting/>
    }
}
function LoginButton(props){
    return (
        <button onClick={props.onClick}>
        Login
        </button>
    );
}
function LogoutButton(props){
    return (
        <button onClick={props.onClick}>
        LogoutButton
        </button>
    );
}

class LoginControl extends React.Component{
    constructor(props){
        super(props);
        this.state={isLoggedIn:false}
        this.handleLoginClick= this.handleLoginClick.bind(this);
        this.handleLogoutClick= this.handleLogoutClick.bind(this);
    }
    handleLoginClick(){
        this.setState({isLoggedIn:true})
    }
    handleLogoutClick(){
        this.setState({isLoggedIn:false});
    }
    render(){
        const isLoggedIn = this.state.isLoggedIn;
        let button;
        if(isLoggedIn){
            button=<LogoutButton onClick={this.handleLogoutClick}/>
        }else{
            button=<LoginButton onClick={this.handleLoginClick}/>
        }
        return (
            <div>
            <Greeting isLoggedIn={this.state.isLoggedIn}/>
            {button}
            </div>

        );
    }
}
/** In javascript
 * true && expression always evaluates to expression,and false && expression
 * always evaluates to false
 */
function MailBox(props){
    const unreadMessages = props.unreadMessages;
    return (<div>
        <h1>Hello!</h1>
        {
            unreadMessages.length >0 &&
            <h2>
            You have {unreadMessages.length} unread messages;
            </h2>
        }
        </div>);
}
function Falsy(){
    const count =0;
    return (<div>
        {count && <h1>Messages:{count}</h1>}
        </div>);
}
function InLineIfElse(props){
    const isLoggedIn = props.isLoggedIn;
    const result1 =<div>
    the user is <b>{isLoggedIn? 'currently':'not'}</b> logged in.
    </div>

    const result2=<div>
    {isLoggedIn
        ? <LogoutButton onClick={()=>{}}/>
        : <LoginButton  onClick={()=>{}}/>
    }
    </div>
    return (
        <div>{result1}<br/>
        {result2}
        </div>
    )
}

function WarningBanner(props){
    if(!props.warn){
        return null;
    }
    return(<div>
        Warning!
    </div>
    );
}
/**
 * Returning null from component's render method does not affect the firing 
 * of the component's lifecycle methods, for instance componentDidUpdate will
 * still be called.
 */
class WarningBannerDemo extends React.Component{

    componentDidUpdate(){
        console.log('I am in WarningBannerDemo');
    }

    render(){
        if(!this.props.warn){
            return null;
        }
        return (<div>
            Warning!
        </div>
        );
    }
}

class Page extends React.Component{
    constructor(props){
        super(props);
        this.state={isWarn:false}
        this.handleClick= this.handleClick.bind(this);
    }
    handleClick(){
        this.setState(state=>({isWarn:!state.isWarn}));
    }
    render(){
        return (
            <div>
            <button onClick={this.handleClick}>Warn</button>
            <WarningBanner warn={this.state.isWarn}/>
            <br/>
            <WarningBannerDemo warn={this.state.isWarn}/>
            </div>
        );
    }
}

const  App = () => {
    let messages=['React','Redux'];
    messages=[];
    return (
        <div>
        {/* <Greeting isLoggedIn={false}/>
         <LoginControl />
     */}
     <MailBox unreadMessages={messages}/>
     <Falsy/>
     <InLineIfElse isLoggedIn={true}/>
     <br/>
     <Page/>
        </div>
    )
}

export default App;
