var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Product Model
 * ==========
 */
var Product = new keystone.List('Product', {
	autokey: { from: 'productName', path: 'slug', unique: true },
	map: { name: 'productName' },
	defaultSort: '-productName'
} );

Product.add({
  productName: { type: String, required: true, initial: true, default: 'New Product' },
  productNo: { type: String, required: true, initial: true, default: 'No' },
  productCategory: { type: String, required: true, initial: true, default: 'Category' },
  publishedDate: { type: Date, default: Date.now },
  heroImage: { type: Types.CloudinaryImage, required: true, initial: true },
  productDescription: { type: Types.Textarea },
  productFeature: { type: Types.Textarea },
  productParameter: { type: Types.Textarea },
  availableAccessories: { type: String },
  productParameter: { type: String },

});


// virtuals added to the schema
Product.schema.virtual('url').get(function(){
  return '/Product/' + this.slug;
});

/**
 * Registration
 */
Product.defaultColumns = 'productName|15%, productNo|16%, productCategory, publishedDate|%16';
Product.register();
