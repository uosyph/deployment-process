import client from '../database';

export type Product = {
    id?: number;
    name: string;
    price: number;
    category: string;
};

export class StoreProduct {
    async index(): Promise<Product[]> {
        try {
            const con = await client.connect();
            const sql = 'SELECT * FROM products;';
            const result = await con.query(sql);

            con.release();
            return result.rows;
        } catch (err) {
            throw new Error(`Unable to Get a List of Products...  ${err}`);
        }
    }

    async show(id: string): Promise<Product> {
        try {
            const con = await client.connect();
            const sql = 'SELECT * FROM products WHERE id=($1)';
            const result = await con.query(sql, [id]);

            con.release();
            return result.rows[0];
        } catch (err) {
            throw new Error(`Unable to Find Product ${id}...  ${err}`);
        }
    }

    async create(p: Product): Promise<Product> {
        try {
            const con = await client.connect();
            const sql =
                'INSERT INTO products (name, category, price) VALUES($1, $2, $3) RETURNING *';
            const result = await con.query(sql, [p.name, p.category, p.price]);

            const prod = result.rows[0];
            con.release();
            return prod;
        } catch (err) {
            throw new Error(`Unable to Create Product: ${p.name}...  ${err}`);
        }
    }

    async delete(id: string): Promise<Product> {
        try {
            const con = await client.connect();
            const sql = 'DELETE FROM products WHERE id=($1)';
            const result = await con.query(sql, [id]);
            const prod = result.rows[0];

            con.release();
            return prod;
        } catch (err) {
            throw new Error(`Unable to Delete Product ${id}...  ${err}`);
        }
    }
}
