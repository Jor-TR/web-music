import * as funcs from "../functions.js";
import { actions } from "../actions.js";
import React from "react";
import PropTypes from "prop-types";

export class ProgressControl extends React.Component {
    constructor(props) {
        super(props);
        this.onmousedown=this.onmousedown.bind(this);
    }

    static contextTypes={
        store:PropTypes.object,
    }

    // 点击进度条事件,触发后向Redux发起进度跳转请求
    onmousedown(event){
        const _baseBar=this.refs._baseBar,
            store=this.context.store;
        const barPageLeft = funcs.getPageLeft(_baseBar), // 进度条相对于页面的横坐标
            mousePageLeft = event.pageX,
            relativeLeft = mousePageLeft - barPageLeft,
            barLength=_baseBar.offsetWidth; 
        if (relativeLeft <= barLength && relativeLeft >= 0) {
            const timePercent=relativeLeft/barLength,
                newSec = store.getState().playerState.controlsState.duration * timePercent;
            store.dispatch(actions.changeCurrentTime(newSec));
        }
    }

    render() {
        const { currentTime, currentCache, duration } = this.context.store.getState().playerState.controlsState;
        const timePercent = 100 * currentTime / duration,
            cachePercent = 100 * currentCache / duration;
        return (
            <div className="ProgressControl">
                <div className="BaseBar" ref="_baseBar" onMouseDown={this.onmousedown}>
                    <div className="ProgressBar" style={{width:timePercent+"%"}}></div>
                    <div className="CacheBar" style={{width:cachePercent+"%"}}></div>
                    <div className="Slider" style={{left:(timePercent - 1)+"%"}}>
                        <span></span>
                    </div>
                </div>
                <div className="TimeInfo">
                    <span className="CurrentTime">{funcs.stringifyTime(currentTime)}</span>/<span className="Duration">{funcs.stringifyTime(duration)}</span>
                </div>
            </div>
        );
    }
}