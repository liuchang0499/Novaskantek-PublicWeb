var keystone = require('keystone');
var Types = keystone.Field.Types;

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

var Rent = new keystone.List('Rent', {
	autokey: { from: 'RentName', path: 'slug', unique: true },
	map: { name: 'RentName' },
	defaultSort: '-RentName'
} );

Rent.add({
  RentName: { type: String, required: true, initial: true, default: '租赁设备名称' },
  RentNo: { type: String, required: true, initial: true, default: 'No.' },
  RentCategory: { type: String, required: true, initial: true, default: '租赁设备种类' },
  publishedDate: { type: Date, default: Date.now },
  heroImage: { type: Types.CloudinaryImage, required: true, initial: true },
  RentDescription: { type: Types.Textarea },
  RentFeature: { type: Types.Textarea },
  RentParameter: { type: Types.Textarea },
  RentParameter: { type: String },

});


// virtuals added to the schema
Rent.schema.virtual('url').get(function(){
  return '/Rent/' + this.slug;
});

/**
 * Registration
 */
Rent.defaultColumns = 'RentName|15%, RentNo|16%, RentCategory, publishedDate|%16';
Rent.register();
