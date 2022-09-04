import { NextFunction, Request, Response, Router } from "express";
import jsonwebtoken from "jsonwebtoken";
import { query } from "../database";
import Vault from "../models/vault"

const router: Router = Router();

// Authorization: Bearer <token>
router.use((req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (authHeader?.startsWith("Bearer")) {
        const token = authHeader.slice("Bearer".length).trim();
        jsonwebtoken.verify(token, "secreto", async (err: Error | null, decode: any) => {
            if (err) {
                res.status(401).send("ERROR token malo")
                return;
            }

            res.locals.userID = decode.id;
            next();
        })
    }
})

// get user passwords
router.get("/", async (req: Request, res: Response) => {
    const userID = res.locals.userID;

    const vaults = await query<Vault[]>("SELECT vaults.* FROM vaults INNER JOIN users ON vaults.userID = users.id WHERE users.id = ?", [userID]);

    res.json(vaults);
})

// store a new password
router.post("/", async (req: Request, res: Response) => {
    const userID = res.locals.userID;

    const vault: Vault = req.body;
    vault.userID = userID;

    try {
        await query("INSERT INTO vaults SET ?", [vault]);
        res.sendStatus(200);
    } catch(e: any) {
        res.sendStatus(400);
    }
})

// update a password
router.put("/", async (req: Request, res: Response) => {
    const userID = res.locals.userID;

    const vault: Vault = req.body;
    vault.userID = userID;

    try {
        await query("UPDATE vaults SET ? WHERE vaults.id = ? AND vaults.userID = ?", [vault, vault.id, vault.userID]);
        res.sendStatus(200);
    } catch(e: any) {
        res.sendStatus(400);
    }
})

export default router;