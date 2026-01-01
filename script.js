document.getElementById("predictBtn").addEventListener("click", async function() {
    const features = document.getElementById("features").value
        .split(",")
        .map(Number);  // convert comma-separated input to numbers
    const model = document.getElementById("model").value;

    if (!features || features.length === 0) {
        alert("Please enter the features!");
        return;
    }

    try {
        const response = await fetch("https://ml-fastapi-deployment-6uga.onrender.com/predict", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ model, features })  // send features as array
        });

        if (!response.ok) {
            const errorData = await response.json();
            document.getElementById("result").innerText = "Error: " + (errorData.error || "Unknown error");
            return;
        }

        const data = await response.json();

        // Map prediction to friendly message
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
