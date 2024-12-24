this.stop();

const main = this.main;
const anatStart = { "s": 80, "x": 415, "y": 353.25 };

// Define the sections and buttons
const btnA = [
    { "sn": "rightfingers", "dn": "Right fingers", "btns": 4},
    { "sn": "leftfingers", "dn": "Left fingers", "btns": 4},
    { "sn": "righthand", "dn": "Right hand", "btns": 4},
    { "sn": "lefthand", "dn": "Left hand", "btns": 4},
    { "sn": "rightforearm", "dn": "Right forearm", "btns": 4},
    { "sn": "leftforearm", "dn": "Left forearm", "btns": 4},
    { "sn": "rightarm", "dn": "Right arm", "btns": 4},
    { "sn": "leftarm", "dn": "Left arm", "btns": 4},
    { "sn": "face", "dn": "Face", "btns": 4},
    { "sn": "chest", "dn": "Chest", "btns": 4},
    { "sn": "abdomen", "dn": "Abdomen", "btns": 4},
    { "sn": "rightthigh", "dn": "Right thigh", "btns": 4},
    { "sn": "leftthigh", "dn": "Left thigh", "btns": 4},
    { "sn": "rightleg", "dn": "Right leg", "btns": 4},
    { "sn": "leftleg", "dn": "Left leg", "btns": 4},
    { "sn": "rightfoot", "dn": "Right foot", "btns": 4},
    { "sn": "leftfoot", "dn": "Left foot", "btns": 4}
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
    let s;

    for (let i = 0; i < 17; i++) {
        s = btnA[i];
        ave = getAvg(s.vA);
        tot += ave;
        txt += `${s.dn}: ${ave}\n`;
    }

    txt += `Total: ${tot}`;

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
    const len = myA.length;
    // add up array values
    for (let i = 1; i < len; i++) {
        c += myA[i];
    }
    const av = c / (len - 1);
    if (av >= 2.5) return 3;
    if (av >= 1.5) return 2;
    if (av > 0) return 1;
    return 0;
};

// Add event listeners to buttons
this.clearBtn.addEventListener("click", () => {
    // Scale 'main' up
    for (let i = 0; i < 17; i++) {
        const s = btnA[i];
        // section name like "face"
        const section = s.sn;
        // number of btns in section
        const num = s.btns;
        // reset data
        s.vA = [0];
        // loop all buttons in a section
        for (let j = 1; j <= num; j++) {

            // get button by name like face1
            const button = main[`${section}${j}`];

            if (button) {
                // listen
                button.gotoAndStop(0);
                // add an element in the value array for each
                s.vA.push(0);
            } else {
                console.warn(`Button '${section}${j}' not found.`);
            }
        }
    }
    updateGui();
});

// Setup buttons in each section
function setUp() {
    for (let i = 0; i < 17; i++) {
        const s = btnA[i];
        // section name like "face"
        const section = s.sn;
        // number of btns in section
        const num = s.btns;
        // track data
        s.vA = [0];
        // loop all buttons in a section
        for (let j = 1; j <= num; j++) {

            // get button by name like face1
            const button = main[`${section}${j}`];

            if (button) {
                // listen
                button.addEventListener("click", btnClick);
                // add an element in the value array for each
                s.vA.push(0);
            } else {
                console.warn(`Button '${section}${j}' not found.`);
            }
        }
    }
    updateGui();
}

// Call setup
setUp.call(this);

// Drag the bodies
// Set the mouse pointer to "pointer" when hovering over the MovieClip
main.cursor = "grab";

// Variables to track dragging
let offsetX, offsetY;

// Add event listeners for mouse interactions
main.on("mousedown", function (evt) {
    // Calculate offset between mouse position and MovieClip position
    offsetX = evt.stageX - main.x;
    offsetY = evt.stageY - main.y;

    // Change the cursor to "grab" when dragging starts
    main.cursor = "grabbing";

    // Add a mousemove event to enable dragging
    main.on("pressmove", function (evt) {
        // Update the MovieClip position to follow the mouse
        main.x = evt.stageX - offsetX;
        main.y = evt.stageY - offsetY;

        // Update the stage to render the new position
        this.stage.update();
    });
});

// Remove the pressmove listener when the mouse is released
main.on("pressup", function (evt) {
    // Reset the cursor back to "pointer"
    main.cursor = "grab";

    // Remove the pressmove event
    main.off("pressmove");
});


// Define scaling step
const scaleStep = 0.2;

// Add event listeners to buttons
this.plusBtn.addEventListener("click", () => {
    // Scale 'main' up
    main.scaleX += scaleStep;
    main.scaleY += scaleStep;
});

this.minusBtn.addEventListener("click", () => {
    // Scale 'main' down
    main.scaleX = Math.max(0.1, main.scaleX - scaleStep); // Prevent negative scale
    main.scaleY = Math.max(0.1, main.scaleY - scaleStep);
});

this.resetBtn.addEventListener("click", () => {
    // Reset 'main' to initial state
    main.scaleX = anatStart.s / 100;
    main.scaleY = anatStart.s / 100;
    main.x = anatStart.x;
    main.y = anatStart.y;
});



// Ensure stage updates
//createjs.Ticker.addEventListener("tick", stage);


// Update the stage for the initial setup
//this.stage.update();
