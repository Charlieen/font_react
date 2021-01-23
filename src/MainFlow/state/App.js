import React from 'react';

/**
 * perfect example to show 
 * React component and HTML DOM relations:
 * 
 * 1: The only place where we can assign this.state is in the constructor.
 * 2: at other place ,we only can use this.setState({}) method ,because setState()
 * method is managed by react ,so react have chance to know when should reRender Component;
 */

  /*
 * 4:State Updates are Merged
 When you call setState(),React merges the objects you provide into 
 the current state,
 The merging is shallow, so this.setState({comments}) leaves this.state.posts
 intact, but completely replaces this.state.comments

 */ 
class Demo extends React.Component{
    constructor(props){
        super(props);
        this.state={posts:[],comments:[]};
    }
    componentDidMount(){
        /*
        fetchPost().then(response=>{
            this.setState({
                post:response.posts
            });
        });
        fetchComments().then(response=>{
            this.setState({
                comments:response.comments
            });
        });
        */
    }
}
/**
 * Neither parent nor child components can know if a certain component is
 * stateful or stateless,and they shouldn't care whether it is defined as 
 * a function or a class.
 * That is why state is often called local or encapsulated.It is not accessible to
 * any component other than the one that owns and sets it.
 */
function FormattedDate(props){
    return <h2>It is {props.date.toLocaleTimeString()}.</h2>
}

class Clock extends React.Component{
    constructor(props){
        super(props);
        this.state= {
            date:props.date,
        }
    }
    /**
     * In React Component Class,
     * Thank to use setState(),react have chance to know the state of this Component change,
     * and then react will recall the render method  again to learn what should show on the screen
     * 
     * Even thought, React Handle the setState(),so for improve effectiveness, 
     * React can batch multiple setState() calls into a single update for better performance
     * So this.props and this.state may be updated asynchronously,
     * 3: setState()method can receive object and function ,
     * for synchronous situation, we can use setState({})
     * but for asynchronously  ability we should use setState((preProps,preState)=>{})
     */
    initChange(){
        console.log('This is my first call,', new Date());
        this.timeId = setInterval(() => {
            this.setState({date:new Date()})
        }, 2000);

        // for demo purpose
        // this.timeId2 =  setInterval(() => {
        //     this.setState((prop,state)=>{
        //         return {counter: state.counter + props.increment}
        //     })
        // }, 2000);
    }
 
/**
 * this method runs after the component output has been rendered to the DOM,
 * after this, when this component's inner state  change, the React will catch 
 * this change and do next step (compare,diff virtual dom tree, and then Partial update)
 */
    componentDidMount(){
        console.log('component first render,date is. ',this.state.date);
        console.log('Component Did Mount');
        this.initChange();
    }
    /**
     * If the Component is event remove from the DOM, React call the componentWillUnmount 
     * lifecycle method to clean the memory to prevent memory leak.
     */
    componentWillUnmount(){
        clearInterval(this.timeId);
    }
    render(){
        //this.initChange();
        console.log('i will be call so much times:',new Date());
        return (
            <div>
            <h1>Hello World!</h1>
            {/*<h2>It is {this.state.date.toLocaleTimeString()},now</h2>  */}
            {/* 
                A component may choose to pass its state down as props to its child
                components:
                The FormattedDate component would receive the date in its props and
                wouldn't know whether it came from his parent's state,from his parent's 
                props,or was typed by hand 

                This is commonly called a 'top-down' or 'unidirectional' data flow.
                Any state is always owned by some special component,and any data or UI
                derived from that state can only affect components "below" them in the tree

                If you imagine a component tree are as a waterfall of props,each component's
                state is like an additional water source that joins it at an arbitrary point
                but also flows down
            */}
            <FormattedDate date={this.state.date}/>
            </div>
        );
    }
}

class App extends React.Component{

    render(){
        return (<div>
            <Clock date={new Date('2021-01-18')}/>
            <Clock date={new Date('2021-01-17')}/>
            <Clock date={new Date('2021-01-16')}/>
            </div>);
    }
}

export default App;