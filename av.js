const avs = () => {
    let results = [];
    let averages = new Map();  // Using a Map to store unique averages and their combos

    // Generate all combinations of numbers 0-3 in a set of four
    for (let a = 0; a <= 3; a++) {
        for (let b = 0; b <= 3; b++) {
            for (let c = 0; c <= 3; c++) {
                for (let d = 0; d <= 3; d++) {
                    let combo = [a, b, c, d].sort();  // Sort to treat same combos as equal
                    let average = Math.round((a + b + c + d) / 4);
                    let key = combo.join(",");  // Create a unique key for the map

                    if (!averages.has(key)) {  // Check if this combo has been added before
                        averages.set(key, average);
                        results.push({ combo, average });
                    }
                }
            }
        }
    }

    // Output each combination and its average
    results.forEach(result => {
        console.log(`Combo: [${result.combo.join(", ")}], Average: ${result.average}`);
    });
}

avs();
