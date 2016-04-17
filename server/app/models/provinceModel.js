var MongoClient = require('mongodb').MongoClient,
	config = require('../../config');
	url = config.db_url;

module.exports = {
// Connect to the db
	getAllProvinces: function(req, res, callback) {
		MongoClient.connect(url, function(err, db) {
			if(err) {
				console.log('Failed to connect: ', err);
				return;
			}

			console.log('Get All province')

			var provinceCollection = db.collection('provinces');
			


			provinceCollection.find().toArray(function(err,data) {
				if(err) {
					console.log(err);
				}
				console.log('All province : ',data);
				db.close();
				callback(res, data);
			});

			return;
		});
	},

	getProvince: function(req, res, callback) {
		MongoClient.connect(url, function(err, db) {
			if(err) {
				console.log('Failed to connect: ', err);
				return;
			}

			console.log('Get province: ', req);

			req = req.toUpperCase();

			var provinceCollection = db.collection('provinces');
			

			provinceCollection.findOne({ name: req}, function(err,data) {
				if(err) {
					console.log(err);
				}
				console.log('Province count and rank',data);
				db.close();
				callback(res,data );
			});

			return;
		});
	},

	
}