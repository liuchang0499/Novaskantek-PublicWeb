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
  file: {
    type: Types.File,
    storage: myStorage,
    required: true,
    initial: true
  },
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
