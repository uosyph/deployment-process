import bcrypt from 'bcrypt';
import client from '../database';

export type User = {
    id?: number;
    username: string;
    password: string;
    fisrtname?: string;
    secondname?: string;
};

const pepper: string = process.env.BYCRT_PASSWORD as string;
const salt: string = process.env.SALT_ROUNDS as string;

export class StoreUser {
    async index(): Promise<User[]> {
        try {
            const con = await client.connect();
            const sql = 'SELECT * FROM users;';
            const result = await con.query(sql);

            con.release();
            return result.rows;
        } catch (err) {
            throw new Error(`Unable to Get a List of Users...  ${err}`);
        }
    }

    async show(id: string): Promise<User | null> {
        try {
            const con = await client.connect();
            const sql = 'SELECT * FROM users WHERE id=($1);';
            const result = await con.query(sql, [id]);

            con.release();
            return result.rows[0];
        } catch (err) {
            throw new Error(`Unable to Find User ${id}: ${err}`);
        }
    }

    async create(u: User): Promise<User> {
        try {
            const con = await client.connect();
            const sql =
                'INSERT INTO users (username, password) VALUES($1, $2) RETURNING *;';

            const hashedPW = bcrypt.hashSync(
                u.password + pepper,
                parseInt(salt)
            );

            const result = await con.query(sql, [u.username, hashedPW]);
            con.release();
            return result.rows[0];
        } catch (err) {
            throw new Error(
                `Unable to Create a New User ${u.username}...  ${err}`
            );
        }
    }

    async delete(id: string): Promise<User> {
        try {
            const con = await client.connect();
            const sql = 'DELETE FROM users WHERE id=($1);';
            const result = await con.query(sql, [id]);
            const usr = result.rows[0];

            con.release();
            return usr;
        } catch (err) {
            throw new Error(`Unable to Delete User ${id}... ${err}`);
        }
    }

    async auth(username: string, password: string): Promise<User | null> {
        const con = await client.connect();
        const sql = 'SELECT password FROM users WHERE username=($1)';
        const result = await con.query(sql, [username]);

        if (result.rows.length > 0) {
            const user = result.rows[0];

            if (bcrypt.compareSync(password + pepper, user.password)) {
                return user;
            }
        }

        return null;
    }
}
