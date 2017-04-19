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

var Article = new keystone.List('Article', {
	autokey: { from: 'articleName', path: 'slug', unique: true },
	map: { name: 'articleName' },
	defaultSort: '-articleName'
} );

Article.add({
  articleName: { type: String, required: true, initial: true, default: 'New Article' },
  articleCategory: { type: String, required: true, initial: true, default: 'Category' },
  articlePrior: { type: String, required: true, initial: true, default: '0' },
  artilceContext: { type: Types.Textarea },
  publishedDate: { type: Date, default: Date.now },
  authorContact: { type: Types.Name },
  authorEmail: { type: Types.Email },
  authorPhone: { type: String },
});


// virtuals added to the schema
Article.schema.virtual('url').get(function(){
  return '/Article/' + this.slug;
});

/**
 * Registration
 */
Article.defaultColumns = 'articleName|15%, authorContact|16%, authorEmail, publishedDate';
Article.register();
