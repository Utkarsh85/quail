var mongoOpen= require('../../core/db/mongodb/mongodb.js');
var Model;
var expect = require('chai').expect;
var uniqueSlug = require('unique-slug');
var Promise= require('bluebird');

describe('model',function () {
	before(function (done) {
		mongoOpen= require('../../core/db/mongodb/mongodb.js');
		mongoOpen.connectToServer(function (err) {
			if(err)
				throw err;
			else
			{
				Model= require('../../core/model/model')();
				done();
			}
		})
	});

	describe('create',function () {
		it('Create should work',function (done) {
			Model.Organization.create({name:'abcd'})
			.then(function (organization) {
				expect(organization.name).to.equal('abcd');
				done();
			})
			.catch(function (err) {
				done(err);
			});
		})
	})

	describe('find',function () {
		it('find should work',function (done) {
			var randomSlug = uniqueSlug();

			Model.Organization.create({name:randomSlug})
			.then(function (organization) {
				return Model.Organization.find({name: randomSlug}).exec();
			})
			.then(function (organization) {
				expect(organization).to.have.length(1);
				expect(organization[0].name).to.equal(randomSlug);
				done();
			})
			.catch(function (err) {
				done(err);
			});
		})
	})

	describe('findOne',function () {
		it('findOne should work',function (done) {
			var randomSlug = uniqueSlug();

			Model.Organization.create({name:randomSlug})
			.then(function (organization) {
				return Model.Organization.findOne({name: randomSlug});
			})
			.then(function (organization) {
				expect(organization.name).to.equal(randomSlug);
				done();
			})
			.catch(function (err) {
				done(err);
			});
		})
	})

	describe('update',function () {
		it('update should work',function (done) {
			var randomSlug = uniqueSlug();

			Model.Organization.create({name:'abcd'})
			.then(function (organization) {
				return Model.Organization.update(organization._id,{name: randomSlug});
			})
			.then(function (organization) {
				expect(organization.name).to.equal(randomSlug);
				done();
			})
			.catch(function (err) {
				done(err);
			});
		})
	})

	describe('destroy',function () {
		it('destroy should work',function (done) {
			var randomSlug = uniqueSlug();

			Model.Organization.create({name:randomSlug})
			.then(function (organization) {
				return Model.Organization.destroy(organization._id);
			})
			.then(function (organization) {
				expect(organization).to.have.length(1);
				expect(organization[0].name).to.equal(randomSlug);
				done();
			})
			.catch(function (err) {
				done(err);
			});
		})
	})

	describe('destroyMulti',function () {
		it('destroyMulti should work',function (done) {
			var randomSlug = uniqueSlug();
			var arr=[1,1,1,1,1,1];
			Promise.all(arr.map(function () {
				Model.Organization.create({name:randomSlug})
			}))
			.then(function (organizations) {
				return Model.Organization.destroy({name:randomSlug});
			})
			.then(function (organizations) {
				expect(organizations).to.have.length(arr.length);
				organizations.map(function (organization) {
					expect(organization.name).to.equal(randomSlug);
				})
				done();
			})
			.catch(function (err) {
				done(err);
			});
		})
	})

	describe('destroyMultiNative',function () {
		it('destroyMultiNative should work',function (done) {
			var randomSlug = uniqueSlug();
			var arr=[1,1,1,1,1,1];
			Promise.all(arr.map(function () {
				Model.Organization.create({name:randomSlug})
			}))
			.then(function (organizations) {
				return Model.Organization.native().deleteMany({name:randomSlug});
			})
			.then(function (docs) {
				expect(docs.result.ok).to.equal(1);
				done();
			})
			.catch(function (err) {
				done(err);
			});
		})
	})


	describe('createEmbeded',function () {
		it('CreateEmbeded should work',function (done) {
			var randomSlugOrg = uniqueSlug();
			var randomSlugJob = uniqueSlug();

			Model.Organization.create({name:randomSlugOrg})
			.then(function (organization) {
				return Model.Jobs.create({title:randomSlugJob},organization._id)
			})
			.then(function (job) {
				expect(job.title).to.equal(randomSlugJob);
				done();
			})
			.catch(function (err) {
				done(err);
			});
		})
	})


	describe('findEmbeded',function () {
		it('findEmbeded should work',function (done) {
			var randomSlugOrg = uniqueSlug();
			var randomSlugJob = uniqueSlug();

			Model.Organization.create({name:randomSlugOrg})
			.then(function (organization) {
				return Model.Jobs.create({title:randomSlugJob},organization._id)
			})
			.then(function (job) {
				return Model.Jobs.find({title:randomSlugJob}).exec();
			})
			.then(function (job) {
				expect(job).to.have.length(1);
				expect(job[0].title).to.equal(randomSlugJob);
				done();
			})
			.catch(function (err) {
				done(err);
			});
		})
	})

	describe('findOneEmbeded',function () {
		it('findOneEmbeded should work',function (done) {
			var randomSlugOrg = uniqueSlug();
			var randomSlugJob = uniqueSlug();

			Model.Organization.create({name:randomSlugOrg})
			.then(function (organization) {
				return Model.Jobs.create({title:randomSlugJob},organization._id)
			})
			.then(function (job) {
				return Model.Jobs.findOne({title:randomSlugJob});
			})
			.then(function (job) {
				expect(job.title).to.equal(randomSlugJob);
				done();
			})
			.catch(function (err) {
				done(err);
			});
		})
	})

	describe('updateEmbeded',function () {
		it('updateEmbeded should work',function (done) {
			var randomSlugOrg = uniqueSlug();
			var randomSlugJob = uniqueSlug();

			Model.Organization.create({name:randomSlugOrg})
			.then(function (organization) {
				return Model.Jobs.create({title:'cool job'},organization._id)
			})
			.then(function (job) {
				return Model.Jobs.update(job._id,{title:randomSlugJob});
			})
			.then(function (job) {
				expect(job.title).to.equal(randomSlugJob);
				done();
			})
			.catch(function (err) {
				done(err);
			});
		})
	})

	describe('destroyEmbeded',function () {
		it('destroyEmbeded should work',function (done) {
			var randomSlugOrg = uniqueSlug();
			var randomSlugJob = uniqueSlug();

			Model.Organization.create({name:randomSlugOrg})
			.then(function (organization) {
				return Model.Jobs.create({title:randomSlugJob},organization._id)
			})
			.then(function (job) {
				return Model.Jobs.destroy(job._id.toString());
			})
			.then(function (job) {
				expect(job).to.have.length(1);
				expect(job[0].title).to.equal(randomSlugJob);
				done();
			})
			.catch(function (err) {
				done(err);
			});
		})
	})

	describe('destroyEmbededMulti',function () {
		it('destroyEmbededMulti should work',function (done) {
			var randomSlugOrg = uniqueSlug();
			var randomSlugJob = uniqueSlug();
			var arr=[1,1,1,1,1,1,1,1,1,1,1,1];

			Model.Organization.create({name:randomSlugOrg})
			.then(function (organization) {
				return Promise.all(arr.map(function () {
					return Model.Jobs.create({title:randomSlugJob},organization._id);
				}));
			})
			.then(function (jobs) {
				// console.log(arr.length,jobs.length);
				return Model.Jobs.destroy({title:randomSlugJob});
			})
			.then(function (jobs) {
				// console.log(jobs.length)
				expect(jobs).to.have.length(arr.length);
				jobs.map(function (job) {
					expect(job.title).to.equal(randomSlugJob);
				});
				done();
			})
			.catch(function (err) {
				done(err);
			});
		})
	})
})