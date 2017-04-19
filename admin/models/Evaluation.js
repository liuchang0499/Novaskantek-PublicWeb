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

var Evaluation = new keystone.List('Evaluation', {
	autokey: { from: 'evaluationTitle', path: 'slug', unique: true },
	map: { name: 'evaluationTitle' },
	defaultSort: '-evaluationTitle'
} );

Evaluation.add({
  evaluationName: { type: String, required: true, initial: true, default: 'New Evaluation' },
  evaluationCategory: { type: String, required: true, initial: true, default: 'Category' },
  publishedDate: { type: Date, default: Date.now },
  heroImage: { type: Types.CloudinaryImage, required: true, initial: true },
});


// virtuals added to the schema
Evaluation.schema.virtual('url').get(function(){
  return '/Evaluation/' + this.slug;
});

/**
 * Registration
 */
Evaluation.defaultColumns = 'evaluationName|15%, evaluationCategory|16%, publishedDate';
Evaluation.register();
