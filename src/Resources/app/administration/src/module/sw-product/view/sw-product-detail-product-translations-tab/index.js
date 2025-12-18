import template from './sw-product-detail-product-translations-tab.html.twig';

const {Component, Store} = Shopware;

Component.register('sw-product-detail-product-translations-tab', {
    template: template,

    computed: {
        product() {
            return Store.get('swProductDetail').product;
        },
    },
});
