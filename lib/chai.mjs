import chai from './chai.js';

// Destructure everything we want to export from chai.
const {
	version,
	AssertionError,
	use,
	util,
	config,
	Assertion,
	expect,
	should,
	Should,
	assert,
} = chai;

// Re-export.
export {
	chai as default,
	version,
	AssertionError,
	use,
	util,
	config,
	Assertion,
	expect,
	should,
	Should,
	assert,
};
