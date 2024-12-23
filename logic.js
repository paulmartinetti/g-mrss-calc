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
function btnClick(e) {
    //console.log(e.target.parent.name); // button name
    const btn = e.target.parent;
    // extract iname and inum from instance name
    const iname = btn.name.slice(0, -1);
    const inum = btn.name.slice(-1);

    // 

}

// averager
function getAvg(myA) {
    let c = 0;
    myA.forEach (val => {
        c += val;
    });
    const av = c/(myA.length-1);
    if (av > 2.50) return 3;
    if (av > 1.50) return 2;
    if (av > 0) return 1;
    return 0;
}

// Setup buttons in each section
btnA.forEach(s => {
    // Get the section movie clip dynamically
    const section = s.sn;

    if (!section) {
        console.error(`Section '${s.sn}' not found.`);
        return;
    }

    // Number of buttons in the section
    const num = s.btns;

    // Add click listeners to each button
    for (let i = 1; i <= num; i++) {
        // Get button dynamically
        const button = this.[section+i];

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
});
