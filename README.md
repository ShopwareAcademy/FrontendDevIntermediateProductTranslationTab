# FrontendDevIntermediateProductTranslationTab

This plugin is part of the **Frontend Development Intermediate** learning path.

It demonstrates how to:

- Extend the product detail page in the Shopware administration
- Add and register a custom administration tab
- Create and connect a custom administration view
- Load and edit product translations in a single view

Tested for **Shopware 6.7**

## Install

Run the following commands to install the plugin:

```bash
bin/console plugin:refresh
bin/console plugin:install FrontendDevIntermediateProductTranslationTab --activate --clearCache
```

Then build the administration and clear the cache:

```bash
bin/build-administration.sh
bin/console cache:clear
```
