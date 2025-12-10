import template from './sw-academy-product-translations-tab.html.twig';

const {Component, Context, Data, Store} = Shopware;
const {Criteria, EntityCollection} = Data;

Component.register('sw-academy-product-translations-tab', {
    template: template,

    inject: ['repositoryFactory'],

    data() {
        return {
            rows: [],
            languagesFromRepository: [],
        }
    },

    computed: {
        product() {
            return Store.get('swProductDetail').product;
        },
        productRepository() {
            return this.repositoryFactory.create('product');
        },
        productTranslationRepository() {
            return this.repositoryFactory.create('product_translation');
        },
        languageRepository() {
            return this.repositoryFactory.create('language');
        }
    },

    watch: {
        product: {
            immediate: true,
            async handler(newProduct) {
                if (!newProduct || !newProduct.id) {
                    return;
                }

                await this.loadLanguages();
                await this.loadProductWithTranslations()
                await this.buildRows();
            }
        }
    },

    methods: {
        async loadLanguages() {
            const criteria = new Criteria();
            criteria.addFilter(Criteria.equals('active', true));

            this.languagesFromRepository = await this.languageRepository.search(criteria, Context.api);
        },

        async loadProductWithTranslations() {
            const criteria = new Criteria();
            criteria.addFilter(Criteria.equals('productid', this.product.id));
            criteria.addAssociation('translations');

            if (!this.product.translations) {
                this.product.translations = new EntityCollection(
                    '/product-translation',
                    'product_translation',
                    Context.api
                );
            }
        },

        async buildRows() {
            if (!this.languagesFromRepository.length) {
                return;
            }

            const productTranslations = this.product.translations;
            this.rows = [];

            for (const language of this.languagesFromRepository) {
                let productTranslation = productTranslations.find((item)=> item.languageId === language.id);

                if(!productTranslation) {
                    const productInLanguageContext = await this.getProductInLanguageContext(this.product.id, language.id);

                    productTranslation = this.productTranslationRepository.create(Context.api);

                    productTranslation.productId = this.product.id;
                    productTranslation.productVersionId = this.product.versionId;
                    productTranslation.languageId = language.id;

                    productTranslation.name = productInLanguageContext.name;
                    productTranslation.description = productInLanguageContext.description;

                    productTranslations.add(productTranslation);
                }

                this.rows.push({
                    language,
                    translation: productTranslation
                });
                console.log('ROWS', this.rows);
            }
            console.log('ROWS at the end', this.rows);
        },

        async getProductInLanguageContext(productId, languageId) {
            const criteria = new Criteria();
            const languageContext = {
                ...Context.api,
                languageId: languageId
            };

            return await this.productRepository.get(
                productId,
                languageContext,
                criteria
            );
        }
    }
});
