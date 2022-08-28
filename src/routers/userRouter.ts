import { Request, Response, Router } from "express";
import bcrypt from "bcrypt"
import jsonwebtoken from "jsonwebtoken";
import { query } from "../database";
import User from "../models/user"

const router: Router = Router();

router.get("/login", async (req: Request, res: Response) => {
    let user: User = req.body;

    try {
        let exits = await query<User[]>("SELECT * FROM users WHERE users.email = ?", [user.email]);
        
        if (await bcrypt.compare(user.password, exits[0].password)) {
            jsonwebtoken.sign({
                id: exits[0].id
            }, "secreto", (err: Error | null, encoded: string | undefined) => {
                if (!err) {
                    res.status(200);
                    res.json({
                        token: encoded
                    })
                    return;
                }

                res.sendStatus(400);
            });
        }
    } catch(e: any) {
        res.sendStatus(400);
    }

})

router.post("/signup", async (req: Request, res: Response) => {
    let user: User = req.body;

    user.password = await bcrypt.hash(user.password, 10);
    try {
        await query("INSERT INTO users SET ?", [user]);
    } catch(e: any) {
        res.sendStatus(400);
        return;
    }

    res.sendStatus(200);
})

export default router;