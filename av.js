const avs = () => {
    let averages = new Map();  // Using a Map to store unique rounded averages and their combos

    // Generate all combinations of numbers 0-3 in a set of THREE
    for (let a = 0; a <= 3; a++) {
        for (let b = 0; b <= 3; b++) {
            for (let c = 0; c <= 3; c++) {
                let combo = [a, b, c].sort();  // Sort to treat same combos as equal
                let average = Math.round((a + b + c) / 3);  // Calculate and round average
                let key = combo.join(",");  // Create a unique key for the map

                if (!averages.has(key)) {  // Check if this combo has been added before
                    averages.set(key, average);
                }
            }
        }
    }

    // Output each combination and its rounded average
    averages.forEach((average, key) => {
        console.log(`Combo: [${key}], Average: ${average}`);
    });

    averages = new Map();

    // Generate all combinations of numbers 0-3 in a set of FOUR
    for (let a = 0; a <= 3; a++) {
        for (let b = 0; b <= 3; b++) {
            for (let c = 0; c <= 3; c++) {
                for (let d = 0; d <= 3; d++) {
                    let combo = [a, b, c, d].sort();  // Sort to treat same combos as equal
                    let average = Math.round((a + b + c + d) / 4);  // Calculate and round average
                    let key = combo.join(",");  // Create a unique key for the map

                    if (!averages.has(key)) {  // Check if this combo has been added before
                        averages.set(key, average);
                    }
                }
            }
        }
    }

    // Output each combination and its rounded average
    averages.forEach((average, key) => {
        console.log(`Combo: [${key}], Average: ${average}`);
    });

    averages = new Map();

    // Generate all combinations of numbers 0-3 in a set of FIVE
    for (let a = 0; a <= 3; a++) {
        for (let b = 0; b <= 3; b++) {
            for (let c = 0; c <= 3; c++) {
                for (let d = 0; d <= 3; d++) {
                    for (let e = 0; e <= 3; e++) {
                        let combo = [a, b, c, d, e].sort();  // Sort to treat same combos as equal
                        let average = Math.round((a + b + c + d + e) / 5);  // Calculate and round average
                        let key = combo.join(",");  // Create a unique key for the map

                        if (!averages.has(key)) {  // Check if this combo has been added before
                            averages.set(key, average);
                        }
                    }
                }
            }
        }
    }

    // Output each combination and its rounded average
    averages.forEach((average, key) => {
        console.log(`Combo: [${key}], Average: ${average}`);
    });
}

avs();
// to run in VSC, type "node av.js" in a Terminal