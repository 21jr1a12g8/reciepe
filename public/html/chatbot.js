async function query(data) {
    const response = await fetch(
        "http://localhost:3000/api/v1/prediction/cd3b3f5d-609a-4c60-8874-07ec696e6ff9",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }
    );
    const result = await response.json();
    return result;
}

query({"question": "Hey, how are you?"}).then((response) => {
    console.log(response);
});
