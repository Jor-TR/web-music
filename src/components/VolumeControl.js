import * as funcs from "../functions.js";
import { actions } from "../actions.js";
import React from "react";
import PropTypes from "prop-types";

export class VolumeControl extends React.Component {
    constructor(props) {
        super(props);
        this.onmousedown = this.onmousedown.bind(this);
    }

    static contextTypes={
        store:PropTypes.object,
    }

    // 如果在有效范围内点击音量条，将对Redux发起改变音量的请求
    onmousedown(event) {
        const _volumeBaseBar = this.refs._volumeBaseBar,
            store = this.context.store;
        const barPageTop = funcs.getPageTop(_volumeBaseBar),
            mousePageTop = event.pageY,
            relativeTop = mousePageTop - barPageTop,
            barLength = _volumeBaseBar.offsetHeight;
        if (relativeTop >= 0 && relativeTop <= barLength) {
            const newVolume = 1 - relativeTop / barLength;
            store.dispatch(actions.changeVolume(newVolume));
        }
    }

    render() {
        const { volume } = this.context.store.getState().playerState.controlsState;
        return (
            <div className="Volume">
                <div className="VolumeControl">
                    <div className="VolumeBaseBar" ref="_volumeBaseBar" onMouseDown={this.onmousedown}>
                        <div className="VolumeProgressBar" style={{height:(1 - volume) * 100+"%"}}></div>
                        <div className="VolumeSlider" style={{top:((1 - volume) * 100 - 1)+"%"}}></div>
                    </div>
                </div>
                <i>volume</i>
            </div>
        );
    }
}