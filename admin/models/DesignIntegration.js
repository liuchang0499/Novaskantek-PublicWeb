var keystone = require('keystone');
var Types = keystone.Field.Types;

var Integration = new keystone.List('Integration', {
	autokey: { from: 'IntegrationName', path: 'slug', unique: true },
	map: { name: 'IntegrationName' },
	defaultSort: '-IntegrationName'
} );

Integration.add({
  IntegrationName: { type: String, required: true, initial: true, default: 'New Integration' },
  IntegrationCategory: { type: String, required: true, initial: true, default: 'Category' },
  publishedDate: { type: Date, default: Date.now },
  heroImage: { type: Types.CloudinaryImage, required: true, initial: true },
});


// virtuals added to the schema
Integration.schema.virtual('url').get(function(){
  return '/Integration/' + this.slug;
});

/**
 * Registration
 */
Integration.defaultColumns = 'IntegrationName|35%, IntegrationCategory|26%, publishedDate';
Integration.register();
