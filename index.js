var domain = require('domain');
var edge = require('edge');

// This does get caught in the node error domain
var caughtInDomain = edge.func(function () {/*
	async (input) =>
	{
		return "Caught: .NET welcomes " + input.ToString();
	}
*/});

// This does not get caught in the error domain, presumably because it is async
var notCaughtInDomain = edge.func(function () {/*
	async (input) =>
	{
		return await Task.Run( () => {
			return "Uncaught: .NET welcomes " + input.ToString();
		});
	}
*/});

// Create a new domain
var dom = domain.create();

// Connect an error handler to be called for any errors
dom.on('error', function (error) {
	console.log('domain error handler called!');
	console.log(error);
	console.log(error.stack);
});

// run the following in the domain, so all errors should theoretically be
// caught in the handler above
dom.run(function() {
	// This exception will definitely be caught
	//throw new Error('foo bar!');

	// This exception will NOT be caught
	notCaughtInDomain('Node.js', function (error, result) {
		if (error) throw error;
		throw new Error(result);
	});

	// This exception will also be caught
	/*
	caughtInDomain('Node.js', function (error, result) {
		if (error) throw error;
		throw new Error(result);
	});
	*/
});