import { Audio } from "./Audio.js";
import { PlayButton } from "./PlayButton.js";
import { ProgressControl } from "./ProgressControl.js";
import { VolumeControl } from "./VolumeControl.js";
import React from "react";

export class Player extends React.Component {
    render() {
        return (
            <div className="Player">
                <Audio />
                <PlayButton />
                <ProgressControl />
                <VolumeControl />
            </div>
        );
    }
}