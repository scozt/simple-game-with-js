const div = document.createElement("div");
div.id = "container";
document.body.appendChild(div);

const GAME = {
    ROWS: 10,
    COLUMNS: 19,
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