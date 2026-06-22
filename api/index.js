export default async function handler(req, res) {
    // Enable CORS so the API can be accessed from any bot or terminal
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'application/json');

    const { query } = req.query;

    if (!query) {
        return res.status(400).send(JSON.stringify({ error: "No query provided", Credit: "Swayam" }, null, 2));
    }

    // Target Leak OSINT API
    const apiUrl = `https://rootx-osint.in/?type=leakosint&key=swayam&query=${query}`;

    try {
        const response = await fetch(apiUrl);
        let data = await response.json();

        // Remove all unwanted metadata
        delete data.key_stats;
        delete data.timestamp;
        delete data.req_left;
        delete data.req_total;
        delete data.expiry;
        delete data.developer;

        // Inject your custom credit at the end of the JSON object
        data.Credit = "Swayam";

        // Output the cleanly formatted, high-speed JSON response
        return res.status(200).send(JSON.stringify(data, null, 2));
        
    } catch (error) {
        return res.status(500).send(JSON.stringify({ error: "Error fetching data", Credit: "Swayam" }, null, 2));
    }
}
