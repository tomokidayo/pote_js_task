let startTime;
let stopTime;
let elepasedTime = 0;

//時間のフォーマットをhh:mm:ss:msにする関数
function timeToString(time) {
    let hh = Math.floor(time / (1000 * 60 * 60));
    let mm = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
    let ss = Math.floor((time % (1000 * 60)) / 1000);
    let ms = Math.floor((time % 1000) / 10);
    // 2桁になるように0埋め
    hh = hh.toString().padStart(2, "0");
    mm = mm.toString().padStart(2, "0");
    ss = ss.toString().padStart(2, "0");
    ms = ms.toString().padStart(2, "0");

    return `${hh}:${mm}:${ss}:${ms}`;
}

//start関数
function start() {
    // スタートボタンを押下した時の現時刻を取得する。
    startTime = Date.now();
}

//時間の計測中に表示を更新する関数
setInterval(function () {
    if (startTime) {
        let currentTime = Date.now();
        let time = elepasedTime + (currentTime - startTime);
        document.getElementById("display").innerText = timeToString(time);
    }
}, 10);

//stop関数
function stop() {
    // ストップボタンを押下した時の現時刻を取得する。
    stopTime = Date.now();
    // 経過時間を計算する。（ストップボタンを押下した時間 - スタートボタンを押下した時間）
    elepasedTime += stopTime - startTime;
    startTime = 0;
    document.getElementById("display").innerText = timeToString(elepasedTime);
}

function reset() {
    startTime = 0;
    stopTime = 0;
    elepasedTime = 0;
    document.getElementById("display").innerText = timeToString(elepasedTime);
}