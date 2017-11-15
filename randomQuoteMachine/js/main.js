let quoteText = document.querySelector("#quoteText");
let quoteTitle = document.querySelector("#quoteTitle");
let refreshButton = document.querySelector("#refreshButton").addEventListener("click", getQuote);
let tweetButton = document.querySelector("#tweetButton");
let body = document.querySelector("body");

// Set default background color
body.style.backgroundColor = "#333";


function setColor() {
    // Changes background color
    let currentColor = body.style.backgroundColor;
    // Sweep.js - Usage: sweep(target, properties, fromColor, toColor[, options]);
    sweep(body, 'backgroundColor', currentColor, getColor());
}


function getColor() {
    // Returns random value/color from array
    const colors = ['#16a085', '#27ae60', '#2c3e50', '#f39c12', '#e74c3c', '#9b59b6', '#FB6964', '#342224', "#472E32", "#BDBB99", "#77B1A9", "#73A857"];
    return colors[Math.floor(Math.random() * colors.length)];
}

function getQuote() {
    let xhr = new XMLHttpRequest();
    // Adds random number at the end to prevent caching
    xhr.open('GET', 'http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1&q=' + Math.floor(Math.random() * 1000000));

    xhr.onload = function() {
        if (this.status == 200) {
            let output = '';

            // Parses responseText as JSON and saves first value in array as variable
            const parsedResponse = JSON.parse(this.responseText)[0];

            // quotesondesign.com returns paragraph instead of plaintext, so html tag(s) need to be stripped
            const currentQuote = strip(parsedResponse.content).trim();
            const currentAuthor = strip(parsedResponse.title).trim();
            quoteTitle.innerText = currentAuthor;
            quoteText.innerHTML = currentQuote;

            // Tweet current quote, twitter share intent usage: https://twitter.com/intent/tweet?text=
            // Tweet has format "quote", author
            tweetButton.setAttribute("href", "https://twitter.com/intent/tweet?text=" + encodeURI("\"" + currentQuote + "\", " + currentAuthor));
            setColor();
        }
    }

    xhr.send();


}

function strip(html) {
    //Strips html tags from input string
    var tmp = document.createElement("DIV");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
}

getQuote();