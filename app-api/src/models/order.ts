import client from '../database';

export type Order = {
    id?: number;
    status: boolean;
    user_id: number;
    product_id: number[];
    quantity: number[];
};

export class StoreOrder {
    async show(id: string): Promise<Order | null> {
        try {
            const con = await client.connect();
            const sql = 'SELECT * FROM orders WHERE id=($1);';
            const result = await con.query(sql, [id]);

            con.release();
            return result.rows[0];
        } catch (err) {
            throw new Error(`Unable to Find Order ${id}...  ${err}`);
        }
    }

    async create(o: Order): Promise<Order> {
        try {
            const con = await client.connect();
            const sql =
                'INSERT INTO orders (status, user_id) VALUES($1, $2) RETURNING *;';
            const result = await con.query(sql, [o.status, o.user_id]);
            const ordr = result.rows[0];

            const ordered =
                'INSERT INTO order_products (order_id, product_id, quantity) VALUES ($1, $2, $3) RETURNING *;';
            const odResult = await con.query(ordered, [
                ordr.id,
                o.product_id,
                o.quantity,
            ]);
            const ordrd = odResult.rows[0];

            con.release();
            return ordrd;
        } catch (err) {
            throw new Error(`Unable to Create a New Order...  ${err}`);
        }
    }

    async delete(id: string): Promise<Order> {
        try {
            const con = await client.connect();
            const sql = 'DELETE FROM orders WHERE id=($1);';
            const result = await con.query(sql, [id]);
            const ordr = result.rows[0];

            con.release();
            return ordr;
        } catch (err) {
            throw new Error(`Unable to Delete Order ${id}... ${err}`);
        }
    }

    async update(id: string): Promise<Order> {
        try {
            const con = await client.connect();
            const sql = 'UPDATE orders SET status=false WHERE id=($1)';
            const result = await con.query(sql, [id]);
            const ordr = result.rows[0];

            con.release();
            return ordr;
        } catch (err) {
            throw new Error(`Unable to Update Order ${id}'s status... ${err}`);
        }
    }
}
