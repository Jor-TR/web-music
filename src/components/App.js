import { QueryForm } from "./QueryForm.js";
import { MusicView } from "./MusicView.js";
import { Player } from "./Player.js";
import React from "react";
import PropTypes from "prop-types";

export class App extends React.Component {

    static contextTypes={
        store:PropTypes.object,
    }

    render() {
        return (
            <div className="App">
                <QueryForm />
                <MusicView />
                <Player />
            </div>
        );
    }
}
