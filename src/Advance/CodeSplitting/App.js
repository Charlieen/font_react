import React,{Suspense} from 'react';
import {ErrorBoundary} from './ErrorBoundary';
/**
 * Before, 
 */
 import {add } from './math';

/**
 * After
 */
let f;
// import("./math").then(math =>{
//     f=math;
//     console.log(f(11,12));
// })

// import OtherComponent from './OtherComponent';

const OtherComponent = React.lazy(()=>import('./OtherComponent'));
const AnotherComponent = React.lazy(()=>import('./AnotherComponent'));

const App=()=><div>
<h1>Code splitting</h1>
<h2>10+20={add(10,20)}</h2>
<hr/>
<ErrorBoundary>
<Suspense fallback={<div>Loading...</div>}>
    <section>
        <OtherComponent/>
        <AnotherComponent/>
    </section>
</Suspense>
</ErrorBoundary>


</div>

export default App;