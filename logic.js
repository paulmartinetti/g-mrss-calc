this.stop();
//this.totalT.text = "Hello, world!";
//window.totalT = this.totalT;

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
function btnClick(e) {
    //console.log(e.target.parent.name); // button name
    const mc = e.target.parent;
    // extract iname and inum from instance name
    const iname = mc.name.slice(0, -1);
    const inum = mc.name.slice(-1);

    // find section of the body
    for (let i = 0; i < btnA.length; i++) {
        let s = btnA[i];
        if (s.sn == iname) {
            // get current value of btn "old num" using index which matches btn instance name number
            const onum = s.vA[inum];
            // increment value
            const nnum = upBtn(onum);
            // update data
            s.vA[inum] = nnum;
            // update gui
            mc.gotoAndStop(nnum);
            // 
            break;
        }
    }
    // update averages and total -- to write
    updateGui();
}
function updateGui() {
    let ave = 0;
    let tot = 0;
    let txt = "";

    btnA.forEach(s => {
        // get average of each section
        ave += getAvg(s.vA);
        // add to total
        tot += ave;
        // create total string
        txt += s.sn + ": " + ave + "\n";
    });
    // total
    txt += "Total: " + tot;
    console.log(txt);
    this.totalT.text = txt;
}

function upBtn(num) {
    num++;
    if (num > 3) num = 0;
    return num;
}
// averager
function getAvg(myA) {
    let c = 0;
    myA.forEach(val => {
        c += val;
    });
    const av = c / (myA.length - 1);
    if (av > 2.50) return 3;
    if (av > 1.50) return 2;
    if (av > 0) return 1;
    return 0;
}
// Setup buttons in each section
const setUp = () => {
    for (let i = 0; i++; i < btnA.length) {
        let s = btnA[i];
        // Get the section movie clip dynamically
        const section = s.sn;

        // Number of buttons in the section
        const num = s.btns;

        // Add click listeners to each button
        for (let i = 1; i <= num; i++) {
            // Get button dynamically
            const button = this.main[section + i];

            // Ensure the button exists
            if (button) {
                // Add click listener
                button.addEventListener("click", btnClick);

                // Add placeholder to value array
                s.vA.push(0);
            } else {
                console.warn(`Button '${s.sn}' not found in section.`);
            }
        }
    }
}