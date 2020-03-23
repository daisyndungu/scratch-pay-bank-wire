function businessDateWithDelayApi(initialDate, delay) {
    const parsedDate = luxon.DateTime.fromFormat(initialDate, 'MMMM dd, yyyy').toObject()
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
            initialDate: luxon.DateTime.utc(...Object.values(parsedDate)),
            delay
        })
    }
    fetch(`${BASE_URL}/getBusinessDateWithDelay`, options).then(function (response) {
        // The API call was successful!
        return response.json();
    }).then(function (data) {
        // This is the JSON from our response
        datesChannel.publish("businessDates", data);
        return data
    }).catch(function (err) {
        // There was an error
        datesChannel.publish("businessDates", { error: 'Unable to retrieve business date. Please try again.' });
    });
}