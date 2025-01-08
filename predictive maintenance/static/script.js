document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('prediction-form');
    const resultDiv = document.getElementById('result');
    const predictionP = document.getElementById('prediction');
    const probabilityP = document.getElementById('probability');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = {
            Air_temperature: document.getElementById('Air_temperature').value,
            Process_temperature: document.getElementById('Process_temperature').value,
            rotational_speed: document.getElementById('rotational_speed').value,
            torque: document.getElementById('torque').value,
            tool_wear: document.getElementById('tool_wear').value,
            power: document.getElementById('power').value,
            Temperature_difference: document.getElementById('Temperature_difference').value
        };

        try {
            const response = await fetch('/predict', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const result = await response.json();

            predictionP.textContent = `Prediction: ${result.prediction === 1 ? 'Machine Failure' : 'No Machine Failure'}`;
            resultDiv.classList.remove('hidden');
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while making the prediction. Please try again.');
        }
    });
});


