document.getElementById("predictionForm").addEventListener("submit", async function(e) {
    e.preventDefault(); // prevent form refresh

    // Collect all feature inputs
    const features = Array.from(document.querySelectorAll('input[name="feature"]'))
        .map(input => Number(input.value));

    const model = document.getElementById("model").value;

    try {
        const response = await fetch("https://ml-fastapi-deployment-6uga.onrender.com/predict", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ features, model })
        });

        const data = await response.json();

        let message = "";
        if (data.prediction === 0) {
            message = "Prediction: No Heart Disease (Healthy)";
        } else if (data.prediction === 1) {
            message = "Prediction: Heart Disease Likely";
        } else {
            message = "Prediction: Unknown";
        }

        document.getElementById("result").innerText = message;

    } catch (err) {
        document.getElementById("result").innerText = "Error: " + err.message;
    }
});
