const state = {
    count: 1
};

 
function counterRenderer() {  
    document.body.innerHTML = "";    /* React */
    const btn = counterComponent();
    document.body.appendChild(btn);
}


function incrementCounter() {
    state.count = state.count + 1;
    console.log(state.count);
    counterRenderer();
}


function counterComponent() {
    const btn = document.createElement('button');
    btn.innerHTML = `Counter ${state.count}`;
    btn.setAttribute('onclick', 'incrementCounter()');
    return btn;
}


counterRenderer();

