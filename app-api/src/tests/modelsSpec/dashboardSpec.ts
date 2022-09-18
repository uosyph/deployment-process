import { DashboardQueries } from '../../services/models/dashboard';

const dashboard = new DashboardQueries();

describe('Dashboard Services', () => {
    it('All methods should be defined', () => {
        expect(dashboard.topSoldProds).toBeDefined();
        expect(dashboard.specificTopSoldProds).toBeDefined();
        expect(dashboard.filterByCategory).toBeDefined();
    });

    it('topSoldProducts method should return a list of top sold products', async () => {
        const result = await dashboard.topSoldProds();
        expect(result.length).toBeGreaterThanOrEqual(0);
    });

    it('specificTopSoldProducts method should return a list of top 5 sold products', async () => {
        const result = await dashboard.specificTopSoldProds(5);
        expect(result.length).toBeLessThanOrEqual(5);
    });

    it('filterByCategory method should filter products by category', async () => {
        const result = await dashboard.filterByCategory('general');
        expect(result.length).toBeGreaterThanOrEqual(0);
    });
});
