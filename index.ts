import express from 'express';
import bodyParser from 'body-parser';

const app = express();
app.use(bodyParser.json());

function add(a: any, b: any) {
    return a + b;
}

app.post('/rpc', async (req: any, res: any) => {
    const { jsonrpc, method, params, id } = req.body;
    if (jsonrpc !== '2.0' || !method || !Array.isArray(params)) {
        return res.status(400).json({ error: 'Invalid JSON-RPC version' });
    }

    let result: any;
    switch (method) {
        case 'add':
            result = add(params[0], params[1]);
            break;
        default:
            res.status(400).json({ error: 'Method not found' });
            return;
    }

    res.json({ jsonrpc: '2.0', result, id });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

// Create a New Request:
// Click on the "New" button or the "+" tab to create a new request.
// Set the request type to "POST" since the server endpoint is expecting a POST method.
// Enter the URL for the request. Assuming you're running the server locally, the URL will be http://localhost:3000/rpc.
// Set Headers:
// Go to the "Headers" tab.
// Add a new header with Key as Content-Type and Value as application/json. This header tells the server that the request body format is JSON.
// Configure the Request Body:
// Switch to the "Body" tab.
// Select "raw" and choose "JSON" from the dropdown menu that appears after selecting "raw".
// Enter the JSON data for the request. For example, to use the add method defined in your server, you could send:
// json
// Copy code
// {
//   "jsonrpc": "2.0",
//   "method": "add",
//   "params": [10, 5],
//   "id": 1
// }
// Send the Request:
// Click the "Send" button to make the request to your local server.
// After sending the request, you should see the response from your server in the Postman interface. If everything is set up correctly, the response should look like:

// json
// Copy code
// {
//     "jsonrpc": "2.0",
//     "result": 15,
//     "id": 1
// }
// This response indicates that the add method was called with parameters 10 and 5, and the result returned was 15, matching the id sent in the request.
