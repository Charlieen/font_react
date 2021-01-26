import React,{Fragment,HTMLDivElement,HTMLElement,Element,Node,EventTarget,} from 'react';

/**Note that all aria-* HTML attribute are fully supported in JSX.
 * Whereas most DOM properties and attributes in React are camelCased,
 * these attributes should be hyphen-cased as they are in plain HTML
 */
function AriaInput(props){
    return (<input
        type="text"
        aria-label={props.labelText}
        aria-required="true"
        // onChange={props.onChangeHandler}
        // value={props.inputValue}
        name="name"
        />);
}
/** Semantic HTML
 * Sometimes we break HTML semantics when we add <div> elements to
 * our JSX to make React code work, especially when working with lists
 * (<ol>,<ul> and <dl> )and the HTML <table>.In these case we should
 * rather use React Fragments to group together multiple elements
 * in params, {item} == props.item
 */
function ListItem({item}){
    return (
        <Fragment>
            <dt>{item.term}</dt>
            <dd>{item.description}</dd>
        </Fragment>
    );
}
function Glossary(){
    const items=[{id:1,term:'java',description:'java is good'},
    {id:2,term:'react',description:'react is so awesome'}]
    return (
        <dl>
        {
            items.map(i=>(<ListItem item={i} key={i.id}/>))
        }
        </dl>
    );
}
/**
 * In html label for attribute need to change to htmlFor in React
 *  Corresponds to  input Id attribute 
 */
function ForLabel(){
    return (<Fragment>
        <label htmlFor="namedInput">Name:</label>
        <input id="namedInput" name="name" type="text"/>
        </Fragment>)
}
/** To set focus in React,we can use Refs to DOM elements
 *  While this is a very important accessibility feature,it is also technique that should be used
 *  judiciously,Use it to repair the keyboard focus flow when it is disturbed,not to try and 
 *  anticipate how users to want to use applications
 */
class CustomTextInput extends React.Component{
    constructor(props){
        super(props);
        //Create a ref to store the textInput DOM element
        this.textInput= React.createRef();
        this.focus= this.focus.bind(this);
        
    }
    componentDidMount(){
        this.focus();
    }
  
    focus(){
        console.log(this.textInput);
        this.textInput.current.focus();
    }
    /** JSX element use ref attribute to link DOM and React Objects Models
     * Each JSX element is a object, so can be have the reference to access it,
     * JSX between THE DOM and react inner object model
     */
    render(){
        //User the`ref` callback to store a reference to the text input DOM
        //element in an instance field (this.textInput)
        // build a connection between class function and JSX 
        return (
            <div>
            <input
            type="text"
            ref={this.textInput}
            />
            <button onClick={this.focus}>Test</button>
            </div>
            
        );
    }
 
}

function ChildrenCustomTextInput(props){
    return (
        <div>
        <input ref={props.inputRef}/>
        </div>
    )
}
class Parent extends React.Component{
    constructor(props){
        super(props);
        this.inputElement = React.createRef();
    }
    componentDidMount(){
        this.focus();
    }
    /**
     * We can see since the inputElement is created bt react ,so the .current  will controlled by 
     * the react and give the reasonable response . react can at global point of all components to 
     * do anything.
     * 
     * for example when in component tree ,there are many refs to point different DOM, and this refs 
     * all call ref.current.focus(), when the react  real execution, it will follow from top to bottom 
     * order ,and choice the closest the bottom one , as the real was executed DOM object.
     */
    focus(){
        this.inputElement.current.focus();
    }
    render(){
        return(<ChildrenCustomTextInput inputRef={this.inputElement}/>)
    }
}

class OutClickExample extends React.Component{
    constructor(props){
        super(props);
        this.state={isOpen:false};
        this.areaRef= React.createRef();
        
        this.handleClickButton = this.handleClickButton.bind(this);
        this.onClickOutsidesHandle = this.onClickOutsidesHandle.bind(this);
    }
    handleClickButton(e){
        this.setState(state=>{
            return {isOpen:!state.isOpen}
        })
    }
    onClickOutsidesHandle(e){
        if(this.state.isOpen && !this.areaRef.current.contains(e.target)){
            this.setState({isOpen:false});
        }
    }
    componentDidMount(){
        window.addEventListener('click',this.onClickOutsidesHandle);
        console.log(typeof this.areaRef.current);
       console.log( this.getMethods(this.areaRef.current));
    }
   
    getMethods = (obj) => {
            let properties = new Set()
            let prototypeList = [];
            let currentObj = obj

            do {
              Object.getOwnPropertyNames(currentObj).map(item => properties.add(item));
              prototypeList.push(currentObj);
            } while ((currentObj = Object.getPrototypeOf(currentObj)))
            console.log(prototypeList);
            return [...properties.keys()].filter(item => typeof obj[item] === 'function')
            .filter(x=>x.startsWith('c'));
          }

      
    
    componentWillUnmount(){
        window.removeEventListener('click',this.onClickOutsidesHandle);
    }
    render(){
        const options=<ul>
        <li>Option1</li>
        <li>Option2</li>
        <li>Option3</li>
        </ul>;

        return (
            <div ref={this.areaRef} style={{width:'300px',height:'500px'}}>
            <button onClick={this.handleClickButton}>Select an option</button>
            {this.state.isOpen && options}
            <br/>
            <button>Load the option</button>
            <br/>
            <button>Remove the option</button>
            </div>
        )
    }
}

class BlurExample extends React.Component{
    constructor(props){
        super(props);
        this.state={isOpen:false};
        this.timeOutId=null;

        this.handleClickButton = this.handleClickButton.bind(this);
        this.onBlurHandle = this.onBlurHandle.bind(this);
        this.onFocusHandle = this.onFocusHandle.bind(this);
    }
    handleClickButton(e){
        this.setState(state=>{
            return {isOpen:!state.isOpen}
        })
    }
    onBlurHandle(){
        console.log('on blur ...');
        this.timeOutId = setTimeout(() => {
         this.setState({isOpen:false})   
        }, );
    }

    onFocusHandle(){
        console.log('on focus ...');
        clearTimeout(this.timeOutId);
    }
   
   
    render(){
        const options=<ul>
        <li>Option1</li>
        <li>Option2</li>
        <li>Option3</li>
        </ul>;

        return (
            <div 
             style={{width:'300px',height:'500px',backgroundColor:'green'}}
             onBlur={this.onBlurHandle}
             onFocus={this.onFocusHandle}
             >
            <button 
            onClick={this.handleClickButton}
            aria-haspopup="true"
            aria-expanded={this.state.isOpen}
            >Select an option</button>
            {this.state.isOpen && options}
            <br/>
            <button>Load the option</button>
            <br/>
            <button>Remove the option</button>
            </div>
        )
    }
}
const App=()=><div>
<h1>Web accessibility </h1>
<AriaInput labelText="This is Aria label"/>
<Glossary/>
<hr/>
<CustomTextInput/>
<hr/>
<Parent/>
<hr/>
<OutClickExample/>
<hr/>
<BlurExample/>
</div>

export default App;