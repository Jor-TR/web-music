import * as funcs from "../functions.js";
import { serverConfig } from "../configurations.js"
import { actions } from "../actions.js"
import React from "react";
import PropTypes from "prop-types";

export class MusicView extends React.Component {
    constructor(props) {
        super(props);
        this.ondblclick=this.ondblclick.bind(this);
        this.onmousedown=this.onmousedown.bind(this);
        this.onmouseover=this.onmouseover.bind(this);
        this.onmouseout=this.onmouseout.bind(this);
    }

    static contextTypes={
        store:PropTypes.object
    }

    // 双击音乐目录下的条目时，请求媒体文件
    ondblclick(event) {
        const store=this.context.store;
        const trElem = event.target.parentElement;
        if (trElem.nodeName === "TR") {

            // 获取曲目信息
            const indexTd = trElem.querySelector(`.IndexTd`),
                index = window.parseInt(indexTd.textContent.trim())-1,
                id = store.getState().listState.list[index].id;

            // 从服务器获取音频文件
            const src = serverConfig.musicFilePath + "?" + serverConfig.musicFileQueryName + "=" + id
            store.dispatch(actions.changeSrc(src, index));
        }
    }

    // 单击条目时，高亮显示该行
    onmousedown(event) {
        const store=this.context.store;
        const trElem = event.target.parentElement;
        if (trElem.nodeName === "TR") {

            // 获取行下标
            const indexTd = trElem.querySelector(`.IndexTd`),
                index = window.parseInt(indexTd.textContent.trim())-1;

            // 请求高亮该行
            store.dispatch(actions.changeFocusedIndex(index));
        }
    }

    // 悬浮在条目上时，高亮显示该行
    onmouseover(event) {
        const store=this.context.store;
        const trElem = event.target.parentElement;
        if (trElem.nodeName === "TR") {

            // 获取行下标
            const indexTd = trElem.querySelector(`.IndexTd`),
                index = window.parseInt(indexTd.textContent.trim())-1;

            // 请求高亮该行
            store.dispatch(actions.changeHoveredIndex(index));
        }
    }

    // 鼠标离开时，取消悬浮高亮
    onmouseout(event) {
        const store=this.context.store;
        store.dispatch(actions.changeHoveredIndex(null));
    }

    render() {
        const { store } = this.context,
            listState = store.getState().listState,
            musicInfoArr = listState.list,
            focusedIndex = listState.focusedIndex,
            hoveredIndex = listState.hoveredIndex,
            playingIndex = listState.playingIndex,
            pausedIndex = listState.pausedIndex;
        return (
            <section className="MusicList">
                <table className="MusicTable">
                    <thead>
                        <tr>
                            <th></th>
                            <th>歌曲名</th>
                            <th>时长</th>
                            <th>歌手</th>
                            <th>专辑</th>
                        </tr>
                    </thead>
                    <tbody className="TableBody" onDoubleClick={this.ondblclick} onMouseDown={this.onmousedown}
                        onMouseOver={this.onmouseover} onMouseOut={this.onmouseout}>
                        {musicInfoArr.map((item, index) => {
                            let trClassList = [];
                            if (index === focusedIndex) {
                                trClassList.push("Focused");
                            }
                            if (index === hoveredIndex) {
                                trClassList.push("Hovered");
                            }
                            return (
                                <tr className={trClassList.join(" ")} key={index}>
                                    <td className="IndexTd">{index+1}{index === playingIndex ? " #playing" : (index === pausedIndex ? " #paused" : "")}</td>
                                    <td>{item.name}</td>
                                    <td>{funcs.stringifyTime(item.duration)}</td>
                                    <td>{item.singer}</td>
                                    <td>{item.album}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </section>
        );
    }
}
