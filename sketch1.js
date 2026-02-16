//convert CSV to JSON
//show text for each country
//show happiness score in square size
//use AI to make it cool

let data;
let sortedData;
let country;
let textX, textY;
let scale; //scale up the size so it's not tiny

async function setup() {
    createCanvas(windowWidth, windowHeight);

    data = await loadJSON("Data/worldHappiness2024.json");

    // sort data alphabetically by country name
    sortedData = data.sort((a, b) => {
        return a["Country name"].localeCompare(b["Country name"]);
    });

    scale = width * 0.01;

    textAlign(CENTER, CENTER);
}

function draw() {
    background(220);
    if (sortedData) {
        // calculate grid layout for even spacing
        let cols = Math.ceil(Math.sqrt(sortedData.length));
        let rows = Math.ceil(sortedData.length / cols);
        let spacingX = width / (cols + 1);
        let spacingY = height / (rows + 1);

        for (let i = 0; i < sortedData.length; i++) {

            let happinessAmt = sortedData[i]["Ladder score"];
            let countryName = sortedData[i]["Country name"];
            let Generosity = sortedData[i]["Generosity"];

            // calculate evenly spaced position
            let col = i % cols;
            let row = Math.floor(i / cols);
            let squareX = spacingX * (col + 1);
            let squareY = spacingY * (row + 1);
            let squareS = happinessAmt * scale;
            let textS = width*0.01;

            // draw orange square
            fill(255, 140, 0);
            stroke(0);
            strokeWeight(2);
            rectMode(CENTER);
            rect(squareX, squareY, squareS, squareS);

            // write country name above currency symbol and wrap it
            fill(0);
            noStroke();
            textSize(textS);
            text(countryName, squareX, squareY - textS, squareS * 0.9);

            if(Generosity > 0.2){
                currencySymbol(squareX, squareY, true);
            } else {
                currencySymbol(squareX, squareY, false);
            }
        }
    }

    noLoop();
}


function currencySymbol(x, y, highGenerosity){
    push();
    textAlign(CENTER, CENTER);
    fill(0, 150, 0);
    noStroke();

    if (highGenerosity) {
        // high generosity - dollar signs ($$$)
        textSize(width * 0.015);
        textStyle(BOLD);
        text("$$$", x, y);
    } else {
        // lower generosity - cent sign (¢)
        textSize(width * 0.012);
        textStyle(NORMAL);
        text("¢", x, y);
    }
    pop();
}