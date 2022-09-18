import { StoreOrder } from '../../models/order';

const storeorder = new StoreOrder();

describe('Order Module', () => {
    it('All methods should be defined', () => {
        expect(storeorder.show).toBeDefined();
        expect(storeorder.create).toBeDefined();
        expect(storeorder.delete).toBeDefined();
        expect(storeorder.update).toBeDefined();
    });

    it('show method should return the correct order', async () => {
        const result = await storeorder.show('1');
        expect(result?.id);
    });

    it("update method should update order's status", async () => {
        const result = await storeorder.update('1');
        expect(result?.status).toBeUndefined();
    });

    it('delete method should remove the order', async () => {
        const result = await storeorder.delete('1');
        expect(result).toBeFalsy();
    });
});
