import "./style/world.css";
import "./style/player.css";
import { createStore } from "redux";
import { reducer, initialState } from "./reducer.js";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { App } from "./components/App.js";

window.onload=()=>{
    const store = createStore(reducer, initialState);
    const render = () => {
        ReactDOM.render(
            <Provider store={store}>
                <App />
            </Provider>,
            document.getElementById("react-container")
        );
    };
    store.subscribe(render);
    render();
};
