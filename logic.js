this.stop();

// Define the sections and buttons
this.btnA = [
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

}

// Setup buttons in each section
this.btnA.forEach(s => {
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