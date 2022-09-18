import client from '../../database';

class DashboardQueries {
    async topSoldProds(): Promise<DashboardQueries[]> {
        try {
            const con = await client.connect();
            const sql =
                'SELECT product_id, COUNT(product_id) AS TotalRepetitions FROM order_products GROUP BY product_id ORDER BY TotalRepetitions DESC;';

            const result = await con.query(sql);
            con.release();
            return result.rows;
        } catch (err) {
            throw new Error(`Unable to Get a List of Top Products...  ${err}`);
        }
    }

    async specificTopSoldProds(num: number): Promise<DashboardQueries[]> {
        try {
            const con = await client.connect();
            const sql =
                'SELECT product_id, COUNT(product_id) AS TotalRepetitions FROM order_products GROUP BY product_id ORDER BY TotalRepetitions DESC LIMIT $1;';

            const result = await con.query(sql, [num]);
            con.release();
            return result.rows;
        } catch (err) {
            throw new Error(`Unable to Get a List of Top Products...  ${err}`);
        }
    }

    async filterByCategory(category: string): Promise<DashboardQueries[]> {
        try {
            const con = await client.connect();
            const sql = 'SELECT * FROM products WHERE category=($1)';
            const result = await con.query(sql, [category]);
            con.release();
            return result.rows;
        } catch (err) {
            throw new Error(`Unable to Filter Products by Category...  ${err}`);
        }
    }
}

export { DashboardQueries };
