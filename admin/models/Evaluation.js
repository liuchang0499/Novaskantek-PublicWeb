var keystone = require('keystone');
var Types = keystone.Field.Types;

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
