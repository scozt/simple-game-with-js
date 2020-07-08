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

const showGameStatus = (message) => {

    clearInterval(GAME.intervalId);
    GAME.intervalId = undefined;

    let gameStatusDiv = document.getElementById("gameStatus");
    if( gameStatusDiv === null) {

        const containerDiv = document.getElementById("container");

        gameStatusDiv = document.createElement("div");
        gameStatusDiv.id = "gameStatus";
        containerDiv.appendChild(gameStatusDiv);
    }
    gameStatusDiv.innerHTML = "";
    gameStatusDiv.innerHTML = message;
};

const setCheckboxValuesTo = (value) => {
    const row = document.getElementById("container").childNodes.item([GAME.currentRowId]);
    const checkboxes = row.getElementsByTagName("input");

    for(let column of GAME.checkedColumns){
        checkboxes.item(column).checked = value;
    }
};

const startGame = () => {

    GAME.currentRowId--;
    setCheckboxValuesTo(true);
    GAME.intervalId = window.setInterval(startMovingCheckboxValues, 70);
};

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

function handleKeyEvent(event) {
    if(event.code === "Space" && GAME.intervalId !== undefined) {
        const overlappingColumnValues =
            GAME.checkedColumns.filter((columnValue) => GAME.previousRowCheckedColumns.includes(columnValue));

        GAME.previousRowCheckedColumns = GAME.checkedColumns;
        GAME.checkedColumns = overlappingColumnValues;

        if(overlappingColumnValues.length === 0) {
            showGameStatus("you lost - hit spacebar to restart game")

        } else if( overlappingColumnValues.length > 0 && GAME.currentRowId === 0) {
            showGameStatus("you won - hit spacebar to restart game")
        } else {
            GAME.currentRowId--;
            setCheckboxValuesTo(true);

        }
    } else {

        // reset values
        GAME.currentRowId = 9;
        GAME.checkedColumns = [6, 7, 8, 9, 10, 11, 12];
        GAME.previousRowCheckedColumns = [6, 7, 8, 9, 10, 11, 12];
        GAME.valuesMovingDirection = TO_LEFT;

        // remove the checkbox values except the first row from bottom
        let rows = document.getElementsByClassName("row");
        for(let row = 0; row < (GAME.ROWS - 1); row++){

            let checkboxes = rows.item(row).getElementsByTagName("input");
            for(let checkbox of checkboxes) {

                checkbox.checked = false;
            }
        }

        showGameStatus("hit spacebar to play");

        startGame();
    }
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
setCheckboxValuesTo(true);

showGameStatus("hit spacebar to play");
startGame();