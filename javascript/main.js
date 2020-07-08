const div = document.createElement("div");
div.id = "container";
document.body.appendChild(div);

const GAME = {
    ROWS: 10,
    COLUMNS: 19,
    checkedColumns: [6, 7, 8, 9, 10, 11, 12],
    previousRowCheckedColumns: [6, 7, 8, 9, 10, 11, 12],
    currentRowId: 9,
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
    console.log('hello');
    const row = document.getElementById("container").childNodes.item([GAME.currentRowId]);
    const checkboxes = row.getElementsByTagName("input");

    for(let column of GAME.checkedColumns){
        checkboxes.item(column).checked = value;
    }
};
setCheckboxValuesTo(true);