var MongoClient = require('mongodb').MongoClient,
	config = require('../../config');
	url = config.db_url;

var user = {};	

module.exports = {
// Connect to the db
	addUser: function(userData, res, callback) {
		MongoClient.connect(url, function(err, db) {
			if(err) {
				console.log('Failed to connect: ', err);
				return;
			}

			console.log('Add new user')

			var usersCollection = db.collection('users');
			
			user = {
				email : userData.email,
				password: userData.password
			}

			if (!user.email || !user.password) {
				console.log("Invalid User Info");
				db.close();
				callback(res, { success: false, "message": "Invalid User Info"});
				return;
			}

			usersCollection.findOne({"email" : user.email}, function( err, data) {
				if(err) {
					console.log(err);
				}

				if(data != null) {
					console.log("Email Already Exists");
					db.close();
					callback(res, { success: false, "message": "User email already exists."});
					return;
				}

				usersCollection.insert(user, function(err,data) {
					if(err) {
						console.log(err);
					}
					console.log('New record',data);
					db.close();
					callback(res, { success: true, message: "User created"});
				});
			})
			return;
		});
	},

	updateUser: function(userData, res, callback) {
		MongoClient.connect(url, function(err, db) {
			if(err) {
				console.log('Failed to connect: ', err);
				return;
			}

			console.log('Add new user')

			var usersCollection = db.collection('users');
			
			user = {
				email : userData.email,
				age: userData.age,
				gender: userData.gender,
				location: {
					region: userData.region,
					province: userData.province,
					city: userData.city
				}

			}

			usersCollection.update({"email" : user.email}, user, function( err, data) {
				if(err) {
					console.log(err);
				}
				console.log('Update user record',data);
				db.close();
				callback(res, { success: true, message: "User update"});
				
			})
			return;
		});
	}

	
}