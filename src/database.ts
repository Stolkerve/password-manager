import mysql, {Connection, RowDataPacket, OkPacket, ResultSetHeader} from "mysql2/promise"

let mysqlConnection: Connection;

export async function initConnection() {
    mysqlConnection = await mysql.createConnection({
        host: 'localhost',
        user: 'sebas',
        password: '123',
        database: 'password_manager'
    });

    await query(`
        CREATE TABLE IF NOT EXISTS users(
            id INT UNSIGNED AUTO_INCREMENT UNIQUE NOT NULL,
            email VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(72) NOT NULL,
            PRIMARY KEY(id)
        )
    `);

    await query(`
        CREATE TABLE IF NOT EXISTS vaults(
            id INT UNSIGNED AUTO_INCREMENT UNIQUE NOT NULL,
            userID INT UNSIGNED NOT NULL,
            passwordName VARCHAR(255) NOT NULL,
            password VARCHAR(72) NOT NULL,
            FOREIGN KEY(userID) REFERENCES users(id),
            PRIMARY KEY(id)
        )
    `)

}

export async function query<T extends RowDataPacket[][] | RowDataPacket[] | OkPacket | OkPacket[] | ResultSetHeader>(sql: string, values: any | any[] | { [param: string]: any } = undefined) {
    return (await mysqlConnection.query<T>(sql, values))[0];
}