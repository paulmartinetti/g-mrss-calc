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
    let s;

    for (let i = 0; i < 17; i++) {
        s = btnA[i];
        ave = getAvg(s.vA);
        tot += ave;
        txt += `${s.sn}: ${ave}\n`;
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
    const av = c / (len-1);
    if (av >= 2.5) return 3;
    if (av >= 1.5) return 2;
    if (av > 0) return 1;
    return 0;
};

// Setup buttons in each section
function setUp() {
    for (let i = 0; i < 17; i++) {
        const s = btnA[i];
        // section name like "face"
        const section = s.sn;
        // number of btns in section
        const num = s.btns;
        // loop all buttons in a section
        for (let j = 1; j <= num; j++) {

            // get button by name like face1
            const button = this.main[`${section}${j}`];
            
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
}

// Call setup
setUp.call(this);
// Reference to the MovieClip
const myClip = this.main;

// Set the mouse pointer to "pointer" when hovering over the MovieClip
myClip.cursor = "grab";

// Variables to track dragging
let offsetX, offsetY;

// Add event listeners for mouse interactions
myClip.on("mousedown", function (evt) {
    // Calculate offset between mouse position and MovieClip position
    offsetX = evt.stageX - myClip.x;
    offsetY = evt.stageY - myClip.y;

    // Change the cursor to "grab" when dragging starts
    myClip.cursor = "grabbing";

    // Add a mousemove event to enable dragging
    myClip.on("pressmove", function (evt) {
        // Update the MovieClip position to follow the mouse
        myClip.x = evt.stageX - offsetX;
        myClip.y = evt.stageY - offsetY;

        // Update the stage to render the new position
        this.stage.update();
    });
});

// Remove the pressmove listener when the mouse is released
myClip.on("pressup", function (evt) {
    // Reset the cursor back to "pointer"
    myClip.cursor = "grab";

    // Remove the pressmove event
    myClip.off("pressmove");
});

// Update the stage for the initial setup
this.stage.update();
