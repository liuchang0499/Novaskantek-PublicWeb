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

var Order = new keystone.List('Order', {
	autokey: { from: 'orderNo', path: 'slug', unique: true },
	map: { name: 'orderNo' },
	defaultSort: '-orderNo'
} );

Order.add({
  orderNo: { type: String, required: true, initial: true, default: 'No.' },
  productNo: { type: String, required: true, initial: true, default: 'No.' },
  tokenNo: { type: String, required: true, initial: true, default: 'No.' },
  productImage: { type: Types.CloudinaryImage, required: true, initial: true },
  productName: { type: String, required: true, initial: true, default: '...' },
  isMaintain: { type: Types.Select, options: ['是', '否'], index: true, required: true, initial: true },
  isCare: { type: Types.Select, options: ['是', '否'], index: true, required: true, initial: true },
  company: { type: String, required: true, initial: true, default: '公司名称' },
  orderdDate: { type: Types.Datetime, default: Date.now, required: true, initial: true },
  orderContact: { type: Types.Name, required: true, initial: true },
});


// virtuals added to the schema
Order.schema.virtual('url').get(function(){
  return '/Order/' + this.slug;
});

/**
 * Registration
 */
Order.defaultColumns = 'OrderNo|25%, company|18%, isMaintain, isCare, orderContact, orderdDate';
Order.register();
