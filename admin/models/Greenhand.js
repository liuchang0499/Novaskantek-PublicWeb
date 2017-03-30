var keystone = require('keystone');
var Types = keystone.Field.Types;

var Greenhand = new keystone.List('Greenhand', {
	autokey: { from: 'guidanceName', path: 'slug', unique: true },
	map: { name: 'guidanceName' },
	defaultSort: '-guidanceName'
} );

Greenhand.add({
  guidanceTitle: { type: String, required: true, initial: true, default: 'New Greenhand' },
  guidanceCategory: { type: String, required: true, initial: true, default: 'Category' },
  guidanceDescription: { type: Types.Textarea, required: true, initial: true, default: 'This is' },
  publishedDate: { type: Date, default: Date.now },
  
});


// virtuals added to the schema
Greenhand.schema.virtual('url').get(function(){
  return '/Greenhand/' + this.slug;
});

/**
 * Registration
 */
Greenhand.defaultColumns = 'guidanceTitle|15%, guidanceDescription|16%, guidanceCategory, publishedDate';
Greenhand.register();
