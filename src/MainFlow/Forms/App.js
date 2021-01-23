import React from 'react';

function InputCom(props){
    //console.log('in input,',props.value);
    return (
        <div>
        <label>{props.name}:</label>
        <input type="text" name={props.name} value={props.value} onChange={props.onChange}/>
        <hr/>
        </div>
       
    )
   ;
}
function SelectCom(props)
{
    return (
        <select name={props.name} value={props.value} onChange={props.onChange}>
        {props.opts.map(o=>{
            return (
                 <option
                  key={o.name} 
                   value={o.value}                  
                   >{o.name}</option>
            );
        })}   
        </select>
    )
}

class SelectComponent extends React.Component{
    constructor(props){
        super(props);
        this.state={value:this.props.value}
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(e){
        this.setState({value:e.target.value});
        this.props.onChange(e);
    }
    /**
     * in React,uses a value attribute on the root select tag
     * instead of in html 
     * 
     * <option selected value="">TextShow</option>
     */
    render(){
        return(
            <select name={this.props.name} value={this.state.value} onChange={this.handleChange}>
            {this.props.opts.map(o=>{
                return (
                     <option
                      key={o.name} 
                       value={o.value}                  
                       >{o.name}</option>
                );
            })}   
            </select>
        );
    }
}
class FileInput extends React.Component{
    constructor(props){
        super(props);
        this.fileInput= React.createRef();
        this.handleSubmit= this.handleSubmit.bind(this);
    }
    handleSubmit(e){
        e.preventDefault();
        console.log(this.fileInput.current);
       // console.log(this.fileInput.current.file[0]);
        alert(`
        Selected file -
        ${this.fileInput.current.files[0].name}
        `);
    }

    render(){
        return (
            <form onSubmit={this.handleSubmit}>
            <label>
            Upload file:
            <input type="file" ref={this.fileInput}/>
            </label>
            <br/>
            <button type="submit">Upload</button>
            </form>
        );
    }

}
/** In React  a textarea uses a value attribute instead 
 * in html 
 * <textarea>this is text area</textarea>
 * 
 */
function TextAreaCom(props){
    return(<div>
        <label>{props.name}:
        <textarea name={props.name} value={props.value} onChange={props.onChange}/>
        </label>
        </div>)
}

class Form extends React.Component{
    constructor(props){
        super(props);
        this.state={
            firstName:'',
            lastName:'',
            info:'',
            gender:1
        };
        this.handleChange= this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    /**
     * Starting with ECMAScript2015,the object initialize syntax also 
     * supports computed property names.
     */
    showComputedProperty(){
        let i=0;
        let a ={
            ['foo'+ ++i]:i,
            ['foo'+ ++i]:i,
            ['foo'+ ++i]:i
        };
        console.log(a.foo1);
        console.log(a.foo2);
        console.log(a.foo3);
        const items =["A","B","C"];
        const obj= {
            [items]:"Hello",
        }
        console.log(obj); // A,B,C:"Hello"
        console.log(obj["A,B,C"])// Hello

        let param='size';
        let config={
            [param]:12,
            ['mobile'+param.charAt(0).toUpperCase()+param.slice(1)]:4
        };
        console.log(config);//{size:4,mobileSize:4}

        let obj1 ={foo:'bar',x:42};
        let obj2={foo:'baz',y:13};

        let cloneObj={...obj1}; // another brand new Object {foo:'bar',x:12}
        let mergeObj ={...obj1,...obj2};
        //brand new Object {foo:'baz',x:12,y:13}


    }
    handleChange(e){
        const name=e.target.name;
        const value = e.target.value;
        // console.log(name,value);
        this.setState({[name]:value});
        //console.log(this.state.firstName);
    }
    handleSubmit(e){
        e.preventDefault();
        console.log(this.state);
    }

    render(){
        const info="Charlie Ding is good man"
        const gender=[{name:"F",value:0,isSelected:false},{name:"M",value:1,isSelected:true}]
        return(
        <div>
        <form onSubmit={this.handleSubmit}>
            <InputCom name={'firstName'} value={this.state.firstName} onChange={this.handleChange}/>
            <InputCom name={'lastName'} value={this.state.lastName} onChange={this.handleChange}/>
            <TextAreaCom name={'info'} value={this.state.info} onChange={this.handleChange} />
            <SelectComponent name={'gender'} opts={gender} value={this.state.gender} onChange={this.handleChange}/>
        <button type="submit">Submit</button>
        </form>
        <FileInput/>
        </div>
        );
    }
}


const App=()=>{
    return (<div>
        <h1>Forms</h1>
        <Form/>
        </div>)
}

export default App;