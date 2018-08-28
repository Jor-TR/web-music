import { QueryForm } from "./QueryForm.js";
import { MusicView } from "./MusicView.js";
import { Player } from "./Player.js";
import React from "react";

export class App extends React.Component {
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
