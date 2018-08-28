import { actions } from "../actions.js";
import React from "react";
import PropTypes from "prop-types";

export class PlayButton extends React.Component {
    constructor(props) {
        super(props);
        this.onclick = this.onclick.bind(this);
    }

    static contextTypes = {
        store: PropTypes.object,
    }

    // 点击播放/暂停键时向Redux发出播放/暂停请求
    onclick() {
        const controlsState = this.context.store.getState().playerState.controlsState,
            switchIsOn = controlsState.switchIsOn,
            action = switchIsOn ? actions.pause() : actions.play();
        this.context.store.dispatch(action);
    }

    render() {
        const controlsState = this.context.store.getState().playerState.controlsState,
            switchIsOn = controlsState.switchIsOn;
        return (
            <div className="PlayerSwitch" onClick={this.onclick}>
                <i>{switchIsOn ? "pause" : "play"}</i>
            </div>
        );
    }
}