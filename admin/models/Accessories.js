var keystone = require('keystone');
var Types = keystone.Field.Types;

var Accessories = new keystone.List('Accessories', {
	autokey: { from: 'accessoriesName', path: 'slug', unique: true },
	map: { name: 'accessoriesName' },
	defaultSort: '-accessoriesName'
} );

Accessories.add({
  accessoriesName: { type: String, required: true, initial: true, default: 'New accessories' },
  accessoriesNo: { type: String, required: true, initial: true, default: 'No' },
  accessoriesCategory: { type: String, required: true, initial: true, default: 'Category' },
  publishedDate: { type: Date, default: Date.now },
  heroImage: { type: Types.CloudinaryImage, required: true, initial: true },
  accessoriesDescription: { type: Types.Textarea },
  accessoriesFeature: { type: Types.Textarea },
  accessoriesParameter: { type: Types.Textarea },

});


// virtuals added to the schema
Accessories.schema.virtual('url').get(function(){
  return '/Accessories/' + this.slug;
});

/**
 * Registration
 */
Accessories.defaultColumns = 'accessoriesName|15%,  accessoriesCategory, publishedDate';
Accessories.register();
