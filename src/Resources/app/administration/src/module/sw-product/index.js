const productModule = Shopware.Module.getModuleRegistry().get('sw-product');

if (productModule) {
    // routes.detail.children ist der pfad, der im sw-product definiert ist, um "Tabs" anzuhängen
    productModule.routes.get('sw.product.detail').children.push({
        path: '/sw/product/detail/:id?/product-translations',
        name: 'sw.product.detail.productTranslations',
        component: 'sw-academy-product-translations-tab',
        meta: {
            parentPath: 'sw.product.index',
        },
    });
}