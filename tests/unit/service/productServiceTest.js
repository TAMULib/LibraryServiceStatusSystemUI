describe('service: ProductService', function () {

    var WsApi, ProductService;

    beforeEach(function() {
        module('core');
        module('app');
        module('mock.products');
        module('mock.wsApi');

        inject(function ($q, _WsApi_, $injector) {
            ProductService = $injector.get('ProductService');
            WsApi = _WsApi_;
            installPromiseMatchers();
        });
    });

    describe('Are the service methods defined', function () {
        it('getAll should be defined', function () {
            expect(ProductService.getAll).toBeDefined();
            expect(typeof ProductService.getAll).toEqual("function");
        });
        it('getById should be defined', function () {
            expect(ProductService.getById).toBeDefined();
            expect(typeof ProductService.getById).toEqual("function");
        });
    });

    describe('Do the service methods work as expected', function () {
        it('getAll should return all mock products', function () {
            expect(ProductService.getAll()).toBeResolvedWith(mockProducts);
        });
        it('getById should return the correct product', function () {
            expect(ProductService.getById(1)).toBeResolvedWith(mockProducts[0]);
            expect(ProductService.getById(2)).toBeResolvedWith(mockProducts[1]);
            expect(ProductService.getById(3)).toBeResolvedWith(mockProducts[2]);
            expect(ProductService.getById(5)).toBeResolvedWith(mockProducts[4]);
            expect(ProductService.getById(9)).toBeResolvedWith(mockProducts[8]);
        });
    });

});
