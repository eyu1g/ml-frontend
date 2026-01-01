document.getElementById("predictionForm").addEventListener("submit", async function(e) {
    e.preventDefault(); // prevent form refresh

    // Collect all features in the order of dataset
    const features = [
        Number(document.getElementById("age").value),
        Number(document.getElementById("sex").value),
        Number(document.getElementById("cp").value),
        Number(document.getElementById("trestbps").value),
        Number(document.getElementById("chol").value),
        Number(document.getElementById("fbs").value),
        Number(document.getElementById("restecg").value),
        Number(document.getElementById("thalach").value),
        Number(document.getElementById("exang").value),
        Number(document.getElementById("oldpeak").value),
        Number(document.getElementById("slope").value),
        Number(document.getElementById("ca").value),
        Number(document.getElementById("thal").value)
    ];

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
