import { StoreProduct } from '../../models/product';

const storeproduct = new StoreProduct();

describe('Product Module', () => {
    it('All methods should be defined', () => {
        expect(storeproduct.index).toBeDefined();
        expect(storeproduct.show).toBeDefined();
        expect(storeproduct.create).toBeDefined();
        expect(storeproduct.delete).toBeDefined();
    });

    it('create method should add a product', async () => {
        const result = await storeproduct.create({
            name: 'testprod',
            price: 160,
            category: 'general',
        });
        expect(result.id).toBeTruthy();
    });

    it('index method should return a list of products', async () => {
        const result = await storeproduct.index();
        expect(result.length).toBeGreaterThanOrEqual(0);
    });

    it('show method should return the correct product', async () => {
        const result = await storeproduct.show('1');
        expect(result);
    });

    it('delete method should remove the product', async () => {
        const result = await storeproduct.delete('1');
        expect(result).toBeFalsy();
    });
});
