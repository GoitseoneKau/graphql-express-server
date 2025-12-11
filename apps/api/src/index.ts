import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import qlschema from "./schema/schema.js"
import { connectDb } from "./config/db.js"
import path from 'path'
import * as dotenv from 'dotenv'
import cors from 'cors'
import { fileURLToPath } from 'url';


dotenv.config()
connectDb()


const app = express();
const PORT = process.env.PORT || 3000;
const environment = process.env.ENVIRONMENT

const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory


app.use(cors());

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, './public')));

app.use('/graphql',
    graphqlHTTP({
        schema: qlschema,
        graphiql: environment === 'development'
    }))

// Optional: Route to serve a specific HTML file for the root path
app.get('/', (_, res) => {
    res.sendFile(path.join(__dirname, './index.html'));
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});