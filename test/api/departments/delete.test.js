const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../../server');
const Department = require('../../../models/department.model');

chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request;

describe('DELETE /api/departments', () => {
    before(async () => {
      const testDepOne = new Department({ _id: '5d9f1140f10a81216cfd4408', name: 'Department #1' });
      await testDepOne.save();
    });

    after(async () => {
      await Department.deleteMany();
    });

    it('/:id should delete chosen document and return success', async () => {
      const res = await request(server).delete('/api/delete/5d9f1140f10a81216cfd4408');
      const delDepartment = await Department.findOne({id: '5d9f1140f10a81216cfd4408'});

      expect(res.status).to.be.equal(404);
      expect(res.body).to.be.an('object');
      expect(delDepartment).to.be.null;
    });
});