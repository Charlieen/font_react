import React from 'react';

/**
 *  prepare data like this.
 */
    const PRODUCTS = [
        {category: 'Sporting Goods', price: '$49.99', stocked: true, name: 'Football'},
        {category: 'Sporting Goods', price: '$9.99', stocked: true, name: 'Baseball'},
        {category: 'Sporting Goods', price: '$29.99', stocked: false, name: 'Basketball'},
        {category: 'Electronics', price: '$99.99', stocked: true, name: 'iPod Touch'},
        {category: 'Electronics', price: '$399.99', stocked: false, name: 'iPhone 5'},
        {category: 'Electronics', price: '$199.99', stocked: true, name: 'Nexus 7'}
      ];

/** Step1:Break The UI into A Component Hierarchy
 * single responsibility principle : a component should ideally only 
 * do one thing,
 *  FilterableProductTable
 *      SearchBar
 *      ProductTable
 *          ProductCategoryRow
 *          ProductRow
 */
/** Step2:Build A Static Version in React
 *  The easiest way is to build a version that takes your data model and
 * renders the UI but has no interactivity.
 * It's best to decouple these processes because building a static version requires
 * a lot of typing and no thinking,
 * To build a static version of your app that renders your data model,you'll want to build
 * components that reuse other components and pass data using props, props are a way of passing
 * data from parent to child. don't use state at all to build this static version,State is reserved
 * only for interactivity, that is, data that changes over time
 */
/** Step3:Identify The Minimal(but complete)Representation Of UI State
 * To make your UI interactive,you need to be able to trigger changes to your underlying data model
 * React achieves this with State
 * To build your app correctly, you first need to think of the minimal set of mutable state
 * that your app needs. The key here is DRY:Don't Repeat Yourself.
 * Figure out the absolute minimal representation of the state your application needs and
 * computer everything else you need on-demand.
 * Use these three rules to check which one should be put at state
 * 1:Is it passed in from a parent via props?   If so, it probably isn't state
 * 2:Does it remain unchanged over time?        If so, it probably isn't state
 * 3:Can you compute it based on any other state or props in your components?
 *                                              If so, it probably isn't state.
 */
/** Step4:Identify Where Your State Should Live
 * We need to identify which component mutates,or owns,this state,
 * Remember:React is all about one-way data flow down the component hierarchy
 * For each piece of state in your application
 * 
 * 1:Identify every component that renders something based on that state
 * 2:Find a common owner component(a single component above all the components that
 * need the state in the hierarchy)
 * 3:Either the common owner or another component higher up in the hierarchy should 
 * own the state
 * 4:If you can't find a component where it make sense to own the state,create a new
 * component solely for holding the state and add it somewhere in the hierarchy above
 * the common owner component
 * 
 * 
 */
class FilterableProductTable extends React.Component{

    constructor(props){
        super(props);
        this.state={
            searchItem:'',
            stockCare:false,
        }
    }


    render(){
        return (
            <div className="filterableProductTable">
                <SearchBar/>
                <ProductTable products={PRODUCTS}/>
            </div>
        )
    }
}
class SearchBar extends React.Component{

    render(){
        return (
            <div className="searchBar">
                <input type="text" name="searchItem" />
                <br/>
                <input type="checkbox"/><span>Only show products in stocks</span>
            </div>
        );
    }
}
/**
 *     {category: 'Sporting Goods', price: '$49.99', stocked: true, name: 'Football'},
        {category: 'Sporting Goods', price: '$9.99', stocked: true, name: 'Baseball'},
        {category: 'Sporting Goods', price: '$29.99', stocked: false, name: 'Basketball'},
        {category: 'Electronics', price: '$99.99', stocked: true, name: 'iPod Touch'},
        {category: 'Electronics', price: '$399.99', stocked: false, name: 'iPhone 5'},
        {category: 'Electronics', price: '$199.99', stocked: true, name: 'Nexus 7'}

 */
function ProductTable(props){
    const preData={};
    props.products.some(x=>{
        if(Object.keys(preData).includes(x.category)){
            preData[x.category].push(x);
        }else{
            preData[x.category]=[x];
        }
    });
    console.log(preData);
    

    return (
        <table className="productTable">
            <tr>
                <th>Name</th>
                <th>Price</th>
            </tr>
            { Object.keys(preData).map(c=>{
                return <div>
                <ProductCategoryRow category={c}/>
                 { preData[c].map(p => <ProductRow item={p}/> ) }
                 </div>;
            }) 
        }
           
        </table>
    )
}

function ProductCategoryRow(props){
    return(
        <tr>
            <td colSpan={2}>{props.category}</td>  
        </tr>
    );
}

function ProductRow(props){
    let productNameStyle ={};
    const notInStock={
        color:'red'
    }
    if(!props.item.stocked){
        productNameStyle= notInStock;
    }
    return(
        <tr className="productInfo">
        <td style={productNameStyle} >{props.item.name}</td>
        <td>{props.item.price}</td>
        </tr>
    );
}


const App=()=><div>
    <h1>Thinking In React</h1>
    <FilterableProductTable/>
</div>

export default App;