var MongoClient = require('mongodb').MongoClient,
config = require('../../config');
url = config.db_url;

var result = {};	

module.exports = {
// Connect to the db
addResult: function(resultData, res, callback) {
	MongoClient.connect(url, function(err, db) {
		if(err) {
			console.log('Failed to connect: ', err);
			return;
		}

		console.log('Add new result');

		var resultsCollection = db.collection('results');

		user = {
			email : resultData.email,
			password: resultData.password
		}


		resultsCollection.insert(resultData, function( err, data) {			
			if(err) {
				console.log(err);
			}
			console.log('New record',data);
			db.close();
			callback(res, { success: true, message: "Results added"});

		})
		return;
	});
},

getIssuesByRating: function(req, res, callback) {
	MongoClient.connect(url, function(err, db) {
		if(err) {
			console.log('Failed to connect: ', err);
			return;
		}

		var resultsCollection = db.collection("results");

		var aggregateObj = [			
			{
				$unwind: "$issue_results"
			},
			{
				$group: {
					_id: "$issue_results.id",
					
						rating_sum : { $sum: "$issue_results.rating"}
					
				}
			},
			{
				$sort: {
					rating_sum: -1
				}
			}
		];

		resultsCollection.aggregate(aggregateObj).toArray(function(err, data) 
		{
			if(err){
				console.log(err);
				return;
			}

			callback(res, data);
		})
	});
},

getCandidatesByIssues: function(req, res, callback) {
	MongoClient.connect(url, function(err, db) {
		if(err) {
			console.log('Failed to connect: ', err);
			return;
		}

		var resultsCollection = db.collection("results");

		var aggregateObj = [			
			{
				$unwind: "$issue_results"
			},
			{
				$group: {
					_id: {
						id: "$issue_results.id",
						candidate_id : "$issue_results.candidate_id",
						quote : "$issue_results.quote"
						},					
						rating_sum : { $sum: "$issue_results.rating"}
						
					
				}
			},
			{
				$sort: {
					rating_sum: -1
				}
			}
		];

		resultsCollection.aggregate(aggregateObj).toArray(function(err, data) 
		{
			if(err){
				console.log(err);
				return;
			}

			callback(res, data);
		})
	});
},


getCandidatesByPreffered: function(req, res, callback) {
	MongoClient.connect(url, function(err, db) {
		if(err) {
			console.log('Failed to connect: ', err);
			return;
		}

		var resultsCollection = db.collection("results");

		var aggregateObj = [			
			{
				$group: {
					_id: 
						"$candidate_id_vote",
						
											
						rating_sum : { $sum: 1}
					
				}
			},
			{
				$sort: {
					rating_sum: -1
				}
			}
		];

		resultsCollection.aggregate(aggregateObj).toArray(function(err, data) 
		{
			if(err){
				console.log(err);
				return;
			}

			callback(res, data);
		})
	});
},

getCandidatesByMatched: function(req, res, callback) {
	MongoClient.connect(url, function(err, db) {
		if(err) {
			console.log('Failed to connect: ', err);
			return;
		}

		var resultsCollection = db.collection("results");

		var aggregateObj = [			
			{
				$group: {
					_id: 
						"$candidate_id_match",
						
											
						rating_sum : { $sum: 1}
					
				}
			},
			{
				$sort: {
					rating_sum: -1
				}
			}
		];

		resultsCollection.aggregate(aggregateObj).toArray(function(err, data) 
		{
			if(err){
				console.log(err);
				return;
			}

			callback(res, data);
		})
	});
},


getCandidatesStand: function(req,res, callback) {
	MongoClient.connect(url, function(err, db) {
		if(err) {
			console.log('Failed to connect: ', err);
			return;
		}

		var resultsCollection = db.collection("stands");

		
		resultsCollection.find({ candidate_id : req}).toArray(function(err, data) 
		{
			if(err){
				console.log(err);
				return;
			}

			callback(res, data);
		})
	});
},

getIssues: function(req,res, callback) {
	MongoClient.connect(url, function(err, db) {
		if(err) {
			console.log('Failed to connect: ', err);
			return;
		}

		var resultsCollection = db.collection("stands");

		
		resultsCollection.find({ issue_id : req}).toArray(function(err, data) 
		{
			if(err){
				console.log(err);
				return;
			}

			callback(res, data);
		})
	});
},

getStand: function(req,res, callback) {
	MongoClient.connect(url, function(err, db) {
		if(err) {
			console.log('Failed to connect: ', err);
			return;
		}

		var resultsCollection = db.collection("stands");

		
		resultsCollection.find({ issue_id : req.issue_id,  candidate_id: req.candidate_id}).toArray(function(err, data) 
		{
			if(err){
				console.log(err);
				return;
			}

			callback(res, data);
		})
	});
},

getAllIssues: function(req,res, callback) {
	MongoClient.connect(url, function(err, db) {
		if(err) {
			console.log('Failed to connect: ', err);
			return;
		}

		var resultsCollection = db.collection("stands");

		
		resultsCollection.find({ candidate_id : "1"}).toArray(function(err, data) 
		{
			if(err){
				console.log(err);
				return;
			}

			callback(res, data);
		})
	});
}



}