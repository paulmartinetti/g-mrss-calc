this.stop();

// Define the sections and buttons
const btnA = [
    { "sn": "rightfingers", "btns": 4, "vA": [0] },
    { "sn": "leftfingers", "btns": 4, "vA": [0] },
    { "sn": "righthand", "btns": 4, "vA": [0] },
    { "sn": "lefthand", "btns": 4, "vA": [0] },
    { "sn": "rightforearm", "btns": 4, "vA": [0] },
    { "sn": "leftforearm", "btns": 4, "vA": [0] },
    { "sn": "rightarm", "btns": 4, "vA": [0] },
    { "sn": "leftarm", "btns": 4, "vA": [0] },
    { "sn": "face", "btns": 4, "vA": [0] },
    { "sn": "chest", "btns": 4, "vA": [0] },
    { "sn": "abdomen", "btns": 4, "vA": [0] },
    { "sn": "rightthigh", "btns": 4, "vA": [0] },
    { "sn": "leftthigh", "btns": 4, "vA": [0] },
    { "sn": "rightleg", "btns": 4, "vA": [0] },
    { "sn": "leftleg", "btns": 4, "vA": [0] },
    { "sn": "rightfoot", "btns": 4, "vA": [0] },
    { "sn": "leftfoot", "btns": 4, "vA": [0] }
];

// Click event handler
const btnClick = (e) => {
    const mc = e.target.parent;
    const iname = mc.name.slice(0, -1);
    const inum = mc.name.slice(-1);
    let s;

    for (let i = 0; i < 17; i++) {
        s = btnA[i];
        if (s.sn === iname) {
            const onum = s.vA[inum];
            const nnum = upBtn(onum);
            s.vA[inum] = nnum;
            mc.gotoAndStop(nnum);
            break;
        }
    }
    updateGui();
};

const updateGui = () => {
    let ave = 0;
    let tot = 0;
    let txt = "";

    for (let i = 0; i < 17; i++) {
        const s = btnA[i];
        ave += getAvg(s.vA);
        tot += ave;
        txt += `${s.sn}: ${ave}\n`;
    }

    txt += "Total: " + tot;
    console.log(txt);

    // Update the text box
    this.totalT.text = txt;
};

const upBtn = (num) => {
    num++;
    if (num > 3) num = 0;
    return num;
};

const getAvg = (myA) => {
    let c = 0;
    for (let i = 0; i < myA.length; i++) {
        c += myA[i];
    }
    const av = c / (myA.length || 1);
    if (av > 2.5) return 3;
    if (av > 1.5) return 2;
    if (av > 0) return 1;
    return 0;
};

// Setup buttons in each section
function setUp() {
    for (let i = 0; i < 17; i++) {
        const s = btnA[i];
        const section = s.sn;
        const num = s.btns;

        for (let j = 1; j <= num; j++) {
            const button = this.main[`${section}${j}`];

            if (button) {
                button.addEventListener("click", btnClick);
                s.vA.push(0);
            } else {
                console.warn(`Button '${section}${j}' not found.`);
            }
        }
    }
}

// Call setup
setUp.call(this);