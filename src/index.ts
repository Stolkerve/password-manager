import express from "express"
import cors from "cors"
import morgan from "morgan"
import {initConnection} from "./database"

async function main() {
    initConnection();
    
    const server = express();

    server.use(cors());
    server.use(morgan("dev"));

    server.listen(3000, () => {
        console.log("Hola mundo");
    });
}

main();