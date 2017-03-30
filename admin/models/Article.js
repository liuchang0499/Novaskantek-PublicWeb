var keystone = require('keystone');
var Types = keystone.Field.Types;

var Article = new keystone.List('Article', {
	autokey: { from: 'articleName', path: 'slug', unique: true },
	map: { name: 'articleName' },
	defaultSort: '-articleName'
} );

Article.add({
  articleName: { type: String, required: true, initial: true, default: 'New Article' },
  articleCategory: { type: String, required: true, initial: true, default: 'Category' },
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
