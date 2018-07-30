// 循环器，指定时间间隔往复调用某个函数
export const setSafeInterval=function(handler,interval){

    // 用于终止循环
    let timer={
        id:null
    };

    // 改进的循环事件处理程序
    const safeHandler=function(){
        handler();
        timer.id=setTimeout(safeHandler,interval);
    };
    
    // 开始第一次循环 
    setTimeout(safeHandler,interval);

    // 返回控制器，使得外部代码可以终止该循环
    return timer;
};

// 循环解除器
export const clearSafeInterval=function(timer){
    clearTimeout(timer.id);
    console.log(`clearSafeInterval ${timer.id}`);
};

// 设计一个只监听一次的事件绑定函数
export function addOnceEventListener(elem, event, handler, useCapture) {
    const newHandler = () => {
        handler();
        elem.removeEventListener(event, newHandler, useCapture);
    }
    elem.addEventListener(event, newHandler, useCapture);
}

// 把媒体时间(秒)换成"00:00"形式的字符串
export const stringifyTime = (time) => {
    time = Math.floor(time);
    let min = Math.floor(time / 60),
        sec = time % 60;
    min = (min < 10) ? "0" + min : min;
    sec = (sec < 10) ? "0" + sec : sec;
    return `${min}:${sec}`;
};

// 柯里化函数
export const currify = (func, ...innerArgs) => {
    if (typeof func !== "function") {
        throw new Error("currify: Wrong Param Type")
    }
    return (...args) => {
        let fullArgs = innerArgs.concat(args);
        return func.apply(null, fullArgs);
    };
};

// 计算元素相对于整个页面的横坐标
export const getPageLeft=(elem)=>{
    if(elem===null){
        return 0;
    }else{
        return elem.offsetLeft+getPageLeft(elem.offsetParent);
    }
}

// 计算元素相对于整个页面的纵坐标
export const getPageTop=(elem)=>{
    if(elem===null){
        return 0;
    }else{
        return elem.offsetTop+getPageTop(elem.offsetParent);
    }
}

