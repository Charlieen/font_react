import React from 'react';

/**
 * Rendering Multiple component
 * The best way to pick a key is to use a string that uniquely identifies
 * a list item among its siblings, Most often you should use IDs from your 
 * data as keys
 * We don't recommend using indexs for keys if the order of items may change
 * This can negatively impact performance and may cause issues with component
 * state.
 */
function ListItem(props){
    return <li>{props.value}</li>
}
/**
 * JSX allow embedding any expression in curly braces so we could inline the map()
 * result,sometimes this results in clearer code,but sometime,it might be good time
 * to extract a component
 */
function UlDemo(){
    const number=[1,2,3,4,5];
    const listItems = number.map(n=><li key={n}>{n}</li>);
    const listItemsWithComponent = number.map(n=><ListItem key={n.toString()} value={n}/>)

    return(
        <ul>{listItems}
        <br/>
        {listItemsWithComponent}
        <hr/>
        <ul>
        {number.map(n=><ListItem key={n.toString()} value={n}/>)}
        </ul>
        
        </ul>
    )
}
/**
 * Keys serve as a hint to React but they don't get passed to your component,
 * if you need to same value in your component,pass it explicity as a prop with 
 * a different name.
 */
function Post(props){
    console.log(props.id);
    return null;
}
function Blog(props){
    const sideBar= props.posts.map(p=><li key={p.id}>{p.title}</li>);
    const content = props.posts.map(p=>{
        return (<div key={p.id}>
            <h3>{p.title}</h3>
            <p>{p.content}</p>
            </div>);
    });
    const posts = props.posts.map(p=><Post
        key={p.id}
        id={p.id}
        title={p.title}
        />)
    return (
        <div>
        {sideBar}
        <hr/>
        {content}
        </div>
    )
}


const App=()=>{
    const posts=[{id:1,title:'react',content:'react is very popular'},
    {id:2,title:'angular',content:'angular is so powerful'}];
    return (<div>
        <h1>List </h1>
        <UlDemo/>
        <Blog posts={posts}/>
        </div>);
}

export default App;