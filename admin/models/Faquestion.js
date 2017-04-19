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
    url: true
  }
});

var Question = new keystone.List('Question', {
	autokey: { from: 'questionTitle', path: 'slug', unique: true },
	map: { name: 'questionTitle' },
	defaultSort: '-questionTitle'
} );

Question.add({
  questionNo: { type: Types.Number, required: true, initial: true, default: 0},
  questionTitle: { type: String, required: true, initial: true, default: 'New Question' },
  questionCategory: { type: String, required: true, initial: true, default: 'Category' },
  questionAnswer: { type: Types.Textarea },
  publishedDate: { type: Date, default: Date.now },
});


// virtuals added to the schema
Question.schema.virtual('url').get(function(){
  return '/Question/' + this.slug;
});

Question.defaultColumns = 'questionTitle|20%, publishedDate|16%, questionCategory|16%, questionAnswer';
Question.register();
