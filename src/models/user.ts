import {RowDataPacket} from "mysql2/promise"

export default interface User extends RowDataPacket {
    id: number,
    email: string,
    password: string
}