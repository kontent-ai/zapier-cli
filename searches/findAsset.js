const assetSearchFields = require('../fields/filters/assetSearchFields');
const assetOutputFields = require('../fields/output/assetOutputFields');
const getAsset = require('../utils/assets/getAsset');
const getAssetByExternalId = require('../utils/assets/getAssetByExternalId');

async function execute(z, bundle) {
    let found;

    const searchField = bundle.inputData.searchField;
    const searchPattern = bundle.inputData.searchPattern;
    const searchValue = bundle.inputData.searchValue;

    switch(searchField) {
        case 'id':
            found = await getAsset(z, bundle, searchValue);
            break;
        case 'externalId':
            found = await getAssetByExternalId(z, bundle, searchValue);
            break;
    }

    return [found];
}

const findAsset = {
    noun: 'Asset search',
    display: {
        hidden: false,
        important: false,
        description: 'Finds an asset based on its ID or external ID',
        label: 'Find Asset',
    },
    key: 'find_asset',
    operation: {
        perform: execute,
        inputFields: [
            ...assetSearchFields
        ],
        outputFields: [
            ...assetOutputFields
        ],
        sample: {
            descriptions: [
              {
                language: {
                  id: '00000000-0000-0000-0000-000000000000'
                },
                description: `The asset's alt text for the default language.`
              }
            ],
            external_id: 'custom-asset-identifier',
            file_name: 'file_name.png',
            file_reference: {
              id: '806ec84e-7c71-4856-9519-ee3dd3558583',
              type: 'internal'
            },
            folder: {
              id: '8fe4ff47-0ca8-449d-bc63-c280efee44ea'
            },
            id: 'fcbb12e6-66a3-4672-85d9-d502d16b8d9c',
            image_height: 548,
            image_width: 1280,
            last_modified: '2019-09-12T08:29:36.1645977Z',
            size: 148636,
            title: 'Makes the asset easier to find when you need it',
            type: 'image/png',
            url: 'https://assets-us-01.kc-usercontent.com/8d20758c-d74c-4f59-ae04-ee928c0816b7/adf26cd2-1acb-403f-9d1e-6d04e46c39f1/file_name.png'
          }
    },
};

module.exports = findAsset;
