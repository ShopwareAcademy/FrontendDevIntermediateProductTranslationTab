import template from './sw-academy-product-translations-tab.html.twig';

const {Component, Store} = Shopware;

Component.register('sw-academy-product-translations-tab', {
    template: template,

    computed: {
        product() {
            return Store.get('swProductDetail').product;
        },
    },
});
