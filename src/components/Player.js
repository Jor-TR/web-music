import { Audio } from "./Audio.js";
import { PlayButton } from "./PlayButton.js";
import { ProgressControl } from "./ProgressControl.js";
import { VolumeControl } from "./VolumeControl.js";
import React from "react";
import PropTypes from "prop-types";

export class Player extends React.Component {
    static propTypes = {

    }

    static defaultProps = {

    }

    static contextTypes={
        store:PropTypes.object,
    }

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