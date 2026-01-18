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


//電卓処理

//必要な変数


let calcDisplay = document.getElementById("cal_display");
let firstOperand = null; //初期入力値を保存
let operator = null;     //演算子を格納
let waitingForSecondOperand = false; //二つ目の数値を入力中かどうか


//数字ボタンが押されたときの処理
function insertNumber(digit) {
    if (waitingForSecondOperand) {
        //(数字) + の状態の時に値を押した時の処理
        calcDisplay.value = digit;
        waitingForSecondOperand = false;
    } else {
        //上記でないときの処理
        calcDisplay.value = calcDisplay.value === '0' ? digit : calcDisplay.value + digit;
    }
}

//小数点ボタンが押されたときの処理
function insertDecimal(dot) {
    if (waitingForSecondOperand) {
        calcDisplay.value = '0.';
        waitingForSecondOperand = false;
        return;
    }
    if (!calcDisplay.value.includes(dot)) {
        //現在の入力値に小数点は含まれていないか
        calcDisplay.value += dot;
    }
}

//演算子ボタンが押されたときの処理
function setOperator(nextOperator) {
    const inputValue = parseFloat(calcDisplay.value);
    if (operator && waitingForSecondOperand) {
        //(数値) + の状態の時に演算子を押した時の処理
        operator = nextOperator;
        return;
    }
    if (firstOperand === null) {
        firstOperand = inputValue;
    } else if (operator) {
        //(数値) + (数値) の状態で演算子を押した時の処理
        //現時点での計算結果を表示
        const result = performCalculation[operator](firstOperand, inputValue);
        calcDisplay.value = String(result);
        firstOperand = result;
    }

    operator = nextOperator;
    waitingForSecondOperand = true;

    // 表示用
    expression = firstOperand + " " + nextOperator;
    calcDisplay.value = expression;
}

//計算を実行するオブジェクト
const performCalculation = {
    '/': (firstOperand, secondOperand) => firstOperand / secondOperand,
    '*': (firstOperand, secondOperand) => firstOperand * secondOperand,
    '+': (firstOperand, secondOperand) => firstOperand + secondOperand,
    '-': (firstOperand, secondOperand) => firstOperand - secondOperand,
    '=': (firstOperand, secondOperand) => secondOperand
};

//イコールボタンが押されたときの処理
function calculate() {
    const inputValue = parseFloat(calcDisplay.value);
    if (operator && !waitingForSecondOperand) {
        const result = performCalculation[operator](firstOperand, inputValue);
        calcDisplay.value = String(result);
        firstOperand = result;
        operator = null;
        waitingForSecondOperand = true;
    }
}

//クリアボタンが押されたときの処理
function clearDisplay() {
    calcDisplay.value = '0';
    firstOperand = null;
    operator = null;
    waitingForSecondOperand = false;
}
