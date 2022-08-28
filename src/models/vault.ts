import {RowDataPacket} from "mysql2/promise"

export default interface vault extends RowDataPacket {
    id: number,
    userID: number,
    passwordName: string,
    password: string
}