import * as funcs from "../functions.js";
import { actions } from "../actions.js";
import { appConfig } from "../configurations.js";
import React from "react";
import PropTypes from "prop-types";

export class Audio extends React.Component {
    constructor(props) {
        super(props);
        this.oncanplay = this.oncanplay.bind(this);
        this.controller = null;
        this.onplay=this.onplay.bind(this);
        this.onpause=this.onpause.bind(this);
        this.onseeked=this.onseeked.bind(this);
        this.onended=this.onended.bind(this);
    }

    static contextTypes={
        store:PropTypes.object,
    }

    // 不必更新Audio组件，因为它肉眼不可见
    shouldComponentUpdate(){
        this.updateAudio();
        return false;
    }

    // 根据Redux状态改变音频元素
    updateAudio() {
        const _audio=this.refs._audio,
            store=this.context.store,
            audioState = store.getState().playerState.audioState;
        if (_audio.currentSrc !== audioState.src) {
            _audio.src = audioState.src;
        }
        if (_audio.paused === true && audioState.isPlaying === true) {
            _audio.play();
        }
        if (_audio.paused === false && audioState.isPlaying === false) {
            _audio.pause();
        }
        if (audioState.forcedCurrentTime !== null) {
            _audio.currentTime = audioState.forcedCurrentTime;
        }
        _audio.volume=audioState.volume;
    }

    // 如果成功接收到媒体文件，则允许播放，并立即请求播放
    oncanplay() {
        const store = this.context.store;
        store.dispatch(actions.allowToPlay());
        store.dispatch(actions.play());
    }

    // 如果开始播放了，就在播放过程中持续改变控件状态
    onplay() {
        console.log("player played!");
        const _audio=this.refs._audio,
            store=this.context.store;
        this.controller = funcs.setSafeInterval(() => {
            store.dispatch(actions.keepPlaying(_audio.currentTime,0, _audio.duration));
        }, appConfig.playerRepaintInterval);
    }

    // 如果播放中暂停了，就要停止对控件状态的刷新
    onpause() {
        console.log("player paused or aborted!\n");
        funcs.clearSafeInterval(this.controller);
    }

    // 如果播放完了自动发出暂停请求
    onended() {
        const { store } = this.context;
        store.dispatch(actions.pause());
    }

    // 如果完成了进度跳转，则告知Redux，取消跳转状态
    onseeked() {
        const { store } = this.context;
        store.dispatch(actions.changeCurrentTime(null));
    }

    render() {
        const { store } = this.context,
            audioState = store.getState().playerState.audioState,
            { volume } = audioState;

        return (
            <audio src="" volume={volume} className="Audio" preload="metadata" ref="_audio"
                onCanPlay={this.oncanplay} onPlay={this.onplay} onPause={this.onpause} 
                onAbort={this.onpause} onEnded={this.onended} onSeeked={this.onseeked} />
        );
    }
}
