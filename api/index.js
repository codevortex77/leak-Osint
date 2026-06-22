export default async function handler(req, res) {
    // Enable CORS for instant access anywhere
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'application/json');

    const { query } = req.query;

    if (!query) {
        return res.status(400).send(JSON.stringify({ error: "No query provided", Credit: "@RichUniversal" }, null, 2));
    }

    // Target Leak OSINT API
    const apiUrl = `https://rootx-osint.in/?type=leakosint&key=swayam&query=${query}`;

    try {
        // ADDED HEADERS: Spoofing a real Chrome browser to bypass security blocks
        const response = await fetch(apiUrl, {
            headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
                "Accept": "application/json, text/plain, */*"
            }
        });
        
        let data = await response.json();

        // If the original API still throws its own error, return it neatly with your credit
        if (data.error) {
             return res.status(400).send(JSON.stringify({ error: data.error, Credit: "@RichUniversal" }, null, 2));
        }

        // Remove all unwanted metadata
        delete data.key_stats;
        delete data.timestamp;
        delete data.req_left;
        delete data.req_total;
        delete data.expiry;
        delete data.developer;

        // Inject your custom credit at the end of the JSON object
        data.Credit = "@RichUniversal";

        // Output the cleanly formatted, high-speed JSON response
        return res.status(200).send(JSON.stringify(data, null, 2));
        
    } catch (error) {
        return res.status(500).send(JSON.stringify({ error: "Server connection failed", Credit: "@RichUniversal" }, null, 2));
    }
}
