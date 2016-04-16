var MongoClient = require('mongodb').MongoClient,
	config = require('../../config');
	url = config.db_url;

module.exports = {
// Connect to the db
	getMaleCount: function(req, res, callback) {
		MongoClient.connect(url, function(err, db) {
			if(err) {
				console.log('Failed to connect: ', err);
				return;
			}

			console.log('Get Male Votes Count')

			var votersCollection = db.collection('voters_counts');
			


			votersCollection.findOne({}, function(err,data) {
				if(err) {
					console.log(err);
				}
				console.log('Male count: ',data.male);
				db.close();
				callback(res,{ count: data.male });
			});

			return;
		});
	},

	getFemaleCount: function(req, res, callback) {
		MongoClient.connect(url, function(err, db) {
			if(err) {
				console.log('Failed to connect: ', err);
				return;
			}

			console.log('Get Female Votes Count')

			var votersCollection = db.collection('voters_counts');
			

			votersCollection.findOne({}, function(err,data) {
				if(err) {
					console.log(err);
				}
				console.log('Female count: ',data.female);
				db.close();
				callback(res,{count: data.female} );
			});

			return;
		});
	},

	getTotalCount: function(req, res, callback) {
		MongoClient.connect(url, function(err, db) {
			if(err) {
				console.log('Failed to connect: ', err);
				return;
			}

			console.log('Get Total Voters Count')

			var votersCollection = db.collection('voters_counts');
			

			votersCollection.findOne({}, function(err,data) {
				if(err) {
					console.log(err);
				}
				console.log('Total count: ',data.total);
				db.close();
				callback(res,{ count: data.total} );
			});

			return;
		});
	},

	getAgeGroupCount: function(age, res, callback) {
		MongoClient.connect(url, function(err, db) {
			if(err) {
				console.log('Failed to connect: ', err);
				return;
			}

			console.log('Get Age Group Voters Count : ', age)

			var votersCollection = db.collection('voters_counts');
			

			votersCollection.findOne({}, function(err,data) {
				if(err) {
					console.log(err);
				}

				if(age >= 17 && age <= 19) {
					console.log('Total count: ',data.age_bracket.age17_19);
					db.close();
					callback(res, {count: data.age_bracket.age17_19} );
				}
				else if(age >= 20 && age <= 24) {
					console.log('Total count: ',data.age_bracket.age20_24);
					db.close();
					callback(res, { count: data.age_bracket.age17_19} );
				}
				else if(age >= 25 && age <= 29) {
					console.log('Total count: ',data.age_bracket.age25_29);
					db.close();
					callback(res,{ count: data.age_bracket.age25_29 });
				}
				else if(age >= 30 && age <= 34) {
					console.log('Total count: ',data.age_bracket.age30_34);
					db.close();
					callback(res, { count: data.age_bracket.age30_34} );
				}
				else if(age >= 35 && age <= 39) {
					console.log('Total count: ',data.age_bracket.age35_39);
					db.close();
					callback( res, { count: data.age_bracket.age35_39} );
				}
				else if(age >= 40 && age <= 44) {
					console.log('Total count: ',data.age_bracket.age40_44);
					db.close();
					callback(res, { count: data.age_bracket.age40_44} );
				}
				else if(age >= 45 && age <= 49) {
					console.log('Total count: ',data.age_bracket.age45_49);
					db.close();
					callback(res, { count: data.age_bracket.age45_49 });
				}
				else if(age >= 50 && age <= 54) {
					console.log('Total count: ',data.age_bracket.age50_54);
					db.close();
					callback(res, { count: data.age_bracket.age50_54 });
				}
				else if(age >= 55 && age <= 59) {
					console.log('Total count: ',data.age_bracket.age55_59);
					db.close();
					callback(res,{ count: data.age_bracket.age55_59 });
				}
				else if(age >= 60 && age <= 64) {
					console.log('Total count: ',data.age_bracket.age60_64);
					db.close();
					callback(res,{count : data.age_bracket.age60_64});
				}
				else if(age >= 65) {
					console.log('Total count: ',data.age_bracket.age65);
					db.close();
					callback(res,{ count:data.age_bracket.age65 });
				}
				else
				{
					console.log('Not in age bracket');
					db.close();
					callback(res,{ count: 0 });

				}
				
			});

			return;
		});
	}
}