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
