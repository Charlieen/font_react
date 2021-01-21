import React from 'react';

/** In react  children is attribute of props ,
 * special children prop 
 * children name can not be  overwriting, 
 *   
 */
function FancyBorder(props){
    return (
        <div>
        <h4>{props.children1}</h4>
        <h4>This is belong the FancyBorder Can make sure part,before was called</h4>
        {/*this part is belong : don't know their children ahead of time,until it was call by another component */}
        {props.children}
        </div>
    );
}
/**
 * keep from the FancyBorder's perspective, it need to receive all content
 * which was not decided by FancyBorder,
 * 
 * From WelcomeDialog, it just  care about what does FancyBorder charge to 
 * meet WelcomeDialog demand,
 * 
 */
function WelcomeDialog(){
    return(
        <FancyBorder children1={'hello'}>
        {/* <FancyBorder children={'hello'}>  */}
            <h1>Welcome</h1>
            <p>Thank you for visiting our spacecraft</p>
        </FancyBorder>
    );
}

function Dialog(props){
    return (
        <FancyBorder color="blue">
            <h1 className="Dialog-title">
            {props.title}
            </h1>
            <p className="Dialog-message">
            {props.message}
            </p>
        </FancyBorder>
    );
}
/**
 * Sometimes we think about components as being "special cases" of other components.
 * For example,we might say that a WelcomeDialog is a special case of Dialog
 * In React,this is also achieved by composition,where a more "specific" component
 * renders a more "generic" one and configures it with props:
 */
function WelcomeDialog2(){
    return (
        <div>
         <Dialog
            title="Welcome"
            message="Thank you for visiting our Welcome Website"
         />
        </div>
    )
}

/**
 * sometimes we might need multiple "holes" in a component
 */

 function SplitPane(props){
     return (
        <div className="SplitPane">
        <p>In SplitPane top</p>
            <div className="SplitPane-left">
                {props.left}
            </div>
            <div className="SplitPane-right">
                {props.right}
            </div>
            <p>In SplitPane bottom</p>
        </div>
     );
 }
 function Contacts(){
     return <p>Contacts</p>;
 }
 function Chat(){
     return <p>Chat</p>;
 }

 /**
  * React elements like <Contacts/> and <Chat /> are just objects,
  * so you can pass them as props like any other data.
  */
 function TotalView(){
     return(
        <SplitPane
            left={<Contacts/>}
            right={<Chat/>}
        />
     );
 }

const App= ()=><div>
<h1>Composition Vs Inheritance</h1>
<hr/>
<WelcomeDialog/>
<hr/>
<TotalView/>
</div>

export default App;