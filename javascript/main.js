window.onkeyup = handleKeyEvent;
const div = document.createElement("div");
div.id = "container";
document.body.appendChild(div);

const TO_LEFT = 0;
const TO_RIGHT = 1;

const GAME = {
    ROWS: 10,
    COLUMNS: 19,
    checkedColumns: [6, 7, 8, 9, 10, 11, 12],
    previousRowCheckedColumns: [6, 7, 8, 9, 10, 11, 12],
    currentRowId: 9,
    intervalId: undefined,
    checkboxValuesMovingDirection: TO_LEFT,
}

for (let row = 0; row < GAME.ROWS; row++) {
    const div = document.createElement("div");
    div.className = "row";
    div.id = row;

    for (let column = 0; column < GAME.COLUMNS; column++) {
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.id = column;
        div.appendChild(checkbox);
    }

    document.getElementById("container").appendChild(div);
}
const setCheckboxValuesTo = (value) => {
    const row = document.getElementById("container").childNodes.item([GAME.currentRowId]);
    const checkboxes = row.getElementsByTagName("input");

    for(let column of GAME.checkedColumns){
        checkboxes.item(column).checked = value;
    }
};

setCheckboxValuesTo(true);

const startMovingCheckboxValues = () => {

    setCheckboxValuesTo(false);

    if(GAME.checkboxValuesMovingDirection === TO_LEFT) {
        GAME.checkedColumns = GAME.checkedColumns.map((column) => column - 1);
    } else if(GAME.checkboxValuesMovingDirection === TO_RIGHT) {
        GAME.checkedColumns = GAME.checkedColumns.map((column) => column + 1);
    }

    if(GAME.checkedColumns.includes(0)) {
        GAME.checkboxValuesMovingDirection = TO_RIGHT;
    } else if(GAME.checkedColumns.includes(GAME.COLUMNS - 1)) {
        GAME.checkboxValuesMovingDirection = TO_LEFT;
    }

    setCheckboxValuesTo(true);
};

const startGame = () => {

    GAME.currentRowId--;
    setCheckboxValuesTo(true);
    GAME.intervalId = window.setInterval(startMovingCheckboxValues, 70);
};

startGame();

function handleKeyEvent(event) {
    if(event.code === "Space" && GAME.intervalId !== undefined) {
        const overlappingColumnValues =
            GAME.checkedColumns.filter((columnValue) => GAME.previousRowCheckedColumns.includes(columnValue));
    }
}