import express from "express"
import cors from "cors"
import morgan from "morgan"

import {initConnection} from "./database"
import userRouter from "./routers/userRouter"
import vaultRouter from "./routers/vaultRouter"

async function main() {
    initConnection();
    
    const server = express();

    server.use(cors());
    server.use(morgan("dev"));
    server.use(express.json());
    server.use("/user", userRouter);
    server.use("/vault", vaultRouter);

    server.listen(3000, () => {
        console.log("Hola mundo");
    });
}

main();