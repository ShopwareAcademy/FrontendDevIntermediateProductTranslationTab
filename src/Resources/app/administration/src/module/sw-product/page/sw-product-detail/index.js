import template from './sw-product-detail.html.twig';

Shopware.Component.override('sw-product-detail', {
    template: template,

    computed: {
        productCriteria() {
            const criteria = this.$super('productCriteria');

            // Add associations to load all translations
            criteria.addAssociation('translations');
            criteria.addAssociation('translations.language');

            return criteria;
        }
    }
});
