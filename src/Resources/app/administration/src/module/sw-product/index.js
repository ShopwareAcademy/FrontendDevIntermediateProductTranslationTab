const productModule = Shopware.Module.getModuleRegistry().get('sw-product');

if (productModule) {
    productModule.routes.get('sw.product.detail').children.push({
        name: 'sw.product.detail.productTranslations',
        path: '/sw/product/detail/:id?/product-translations',
        component: 'sw-product-detail-product-translations-tab',
        meta: {
            parentPath: 'sw.product.index',
        },
    });
}
