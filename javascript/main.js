const div = document.createElement("div");
div.id = "container";
document.body.appendChild(div);

const GAME = {
    ROWS: 10,
}

for (let row = 0; row < GAME.ROWS; row++) {
    const div = document.createElement("div");
    div.className = "row";
    div.id = row;

    document.getElementById("container").appendChild(div);
}