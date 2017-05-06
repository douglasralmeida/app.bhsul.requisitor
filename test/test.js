var chai = require('chai');
var chaiHttp = require('chai-http');
var app = require('../server');
var should = chai.should();

chai.use(chaiHttp);

describe('Teste', function() {
  it('Teste basico', function(done) {
    chai.request(app)
      .get('/teste')
      .end(function(err, res){
        res.should.have.status(200);
        done();
      });
  });

//  it('should list a SINGLE blob on /blob/<id> GET');
//  it('should add a SINGLE blob on /blobs POST');
//  it('should update a SINGLE blob on /blob/<id> PUT');
//  it('should delete a SINGLE blob on /blob/<id> DELETE');
});

