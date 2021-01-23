import React from 'react';

/**
 * Conceptually, components are like JavaScript functions.
 *  They accept arbitrary inputs (called “props”) 
 * and return React elements describing what should appear
 *  on the screen.
 * 
 * with lowercase letters as DOM tags
 */
function Welcome(props){
    return <h1>Hello,{props.name},I am a Welcome Component</h1>
}

const elementOfRealElement =<h1>Components</h1>;
const elementOfComponent =<Welcome name="Daniel"/>

function Comment(props){
    if(props){
        return (
            <div className="comment">
                <img className="Avatar" style={{width:'100px',height:'100px'}}
                src={props.author.avatarUrl}
                alt={props.author.name}
                />
            <div className="UserInfo-name">
                {props.author.name}
            </div>
            <div className="Comment-text">
                {props.author.text}
            </div>
            <div className="comment-date"></div>
            {props.author.date}
            </div>
        )
    }else{
        return <div>No Info</div>
    }   
}
const Avatar=(props)=>{
    return (
        <img className="Avatar" style={{width:'100px',height:'100px'}}
                src={props.author.avatarUrl}
                alt={props.author.name}
                />
    );
}
const Text=(props)=>{
    return (
        <div className="Comment-text">
                {props.author.text}
        </div>
    );
}
const CommentDate=(props)=>{
    return (
        <div className="comment-date">
        {props.author.date}
        </div>
    );
}

/*
* it is better to make sure each component just response one aim, 
    one component one task;
*/
function CommentFunctionStyle(props){
    return (
        <div>
        <Avatar {...props}/>
        <Text {...props}/>
        <CommentDate {...props}/>
        </div>
    )
}
/**
 * React is pretty flexible but it has a single strict rule:
 * All React components must act like pure functions with response
 * to their props
 * 
 */
class App extends React.Component{

    constructor(props){
        super(props);
        this.author={
            name:"charlie",
            text:"hello world, i am zhigang ding , i have new day",
            date:'2021-01-18',
            avatarUrl:"https://images.unsplash.com/photo-1511216335778-7cb8f49fa7a3?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1567&q=80"
        }
    }
    /**
     * This is pure function,
     * do not attempt to change their inputs
     * and always return the same result for the same inputs
     */
    sum(a,b){
        return a+b;
    }
    /**
     * this is impure 
     * it changes its own input:
     */
    withdraw(account,amount){
        account.total -= amount;
    }
    render(){
        return (
            <div>
            {elementOfRealElement}
            <Welcome name="Charlie Ding"/>
            {elementOfComponent}
            <br/>
            <Comment author={this.author}/>
            <br/>
            <CommentFunctionStyle author={this.author}/>
            </div>
           
            )
    }
}
export default App;