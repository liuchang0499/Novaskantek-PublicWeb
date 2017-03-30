var keystone = require('keystone');
var Types = keystone.Field.Types;

var Application = new keystone.List('Application', {
	autokey: { from: 'applicationName', path: 'slug', unique: true },
	map: { name: 'applicationName' },
	defaultSort: '-applicationName'
} );

Application.add({
  applicationName: { type: String, required: true, initial: true, default: 'New application' },
  applicationCategory: { type: String, required: true, initial: true, default: 'Category' },
  applicationDescription: { type: Types.Textarea, required: true, initial: true, default: 'This' },
  publishedDate: { type: Date, default: Date.now },
  heroImage: { type: Types.CloudinaryImage, required: true, initial: true },
});


// virtuals added to the schema
Application.schema.virtual('url').get(function(){
  return '/Application/' + this.slug;
});

/**
 * Registration
 */
Application.defaultColumns = 'applicationName|15%, applicationCategory|16%, applicationDescription, publishedDate';
Application.register();
