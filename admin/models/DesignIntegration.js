var keystone = require('keystone');
var Types = keystone.Field.Types;

// storage for the files to be uploaded
var myStorage = new keystone.Storage({
  adapter: keystone.Storage.Adapters.FS,
  fs: {
    path: keystone.expandPath('./public/uploads/documents'),
    /*publicPath: '/public/uploads/documents',*/
    publicPath: 'http://res.cloudinary.com/dy8kdozhn/image/upload/',
  },
  schema: {
    size: true,
    mimetype: true,
    path: true,
    originalname: true,
    url: true
  }
});

var Integration = new keystone.List('Integration', {
	autokey: { from: 'IntegrationName', path: 'slug', unique: true },
	map: { name: 'IntegrationName' },
	defaultSort: '-IntegrationName'
} );

Integration.add({
  IntegrationName: { type: String, required: true, initial: true, default: 'New Integration' },
  IntegrationCategory: { type: String, required: true, initial: true, default: 'Category' },
  IntegrationDescription: { type: Types.Textarea },
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
Integration.defaultColumns = 'IntegrationName|25%, IntegrationCategory|26%,IntegrationDescription|26%, publishedDate';
Integration.register();
