function analyse(text, letter, method) {
    textPieces = [];
    counts = [];

    // Split by desired calculation method
    if (method == "sentence") {
        textPieces = text.split(/\s+/);
    } else if (method == "paragraph") {
        textPieces = text.split(/\r?\n/);
    }

    // Count occurances of specified letter
    for (piece of textPieces) {
        counts.push((piece.match(new RegExp(letter, "g"))||[]).length)
    }

    document.getElementById("output").style.removeProperty("color");
    document.getElementById("output").textContent = `The letter ${letter} is appears in ${method}s a median of ${median(counts)} time${counts == 1 ? '' : 's'}`;
}

function median(counts) {
    sortedCounts = Array.from(counts).sort((a, b) => a - b);
    midIndex = Math.floor(sortedCounts.length / 2);

    if (sortedCounts.length % 2 === 0) {
        return (sortedCounts[midIndex - 1] + sortedCounts[midIndex]) / 2;
    }

    return sortedCounts[midIndex];
}

function check() {
    text = document.getElementById("document-text").value;
    letter = document.getElementById("letter").value;
    method = document.querySelector('input[name="calculation"]:checked').value;

    if (!letter.match(/^[a-z]$/i)) {
        document.getElementById("output").textContent = "Please provide a single letter to count";
        document.getElementById("output").style.color = "red";
    } else {
        analyse(text, letter, method);
    }
}