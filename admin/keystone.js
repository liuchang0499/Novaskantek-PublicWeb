// Simulate config options from your production environment by
// customising the .env file in your project's root folder.
require('dotenv').config();

// Require keystone
var keystone = require('keystone');

keystone.init({
	'name': 'keystone-admin',
	'brand': 'keystone-admin',

	'less': 'public',
	'static': 'public',
	'favicon': 'public/favicon.ico',
	'views': 'templates/views',
	'view engine': 'pug',
	'port':'3001',
	'mongo': process.env.MONGO_URI || process.env.MONGOLAB_URI || 'mongodb://jerryliu:zaq1234.@ds141960.mlab.com:41960/jsproject',
	'cloudinary config': 'cloudinary://974719199753275:BUXgG7yf44HkWhBkH6mAQe9vMo0@dy8kdozhn',
	'auto update': true,
	'session': true,
	'auth': true,
	'user model': 'User',
});
keystone.import('models');
keystone.set('locals', {
	_: require('lodash'),
	env: keystone.get('env'),
	utils: keystone.utils,
	editable: keystone.content.editable,
});
keystone.set('routes', require('./routes'));

keystone.set('nav', {
	users: 'users',
});



keystone.start();
