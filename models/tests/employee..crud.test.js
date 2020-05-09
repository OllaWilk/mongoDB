const Employee = require('../employee.model');
const expect = require('chai').expect;
const MongoMemoryServer = require('mongodb-memory-server').MongoMemoryServer;
const mongoose = require('mongoose');


describe('Employee', () => {

  before(async () => {

    try {
      const fakeDB = new MongoMemoryServer();

      const uri = await fakeDB.getConnectionString();

      mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

    } catch(err) {
      console.log(err);
    }
  });

  describe('Reading data', () => {

    before(async () => {
      const testEmpOne = new Employee({ firstName: ' Name 1',
      lastName: ' LastName 1',
      department: ' Department 1'
    });
      await testEmpOne.save();

      const testEmpTwo = new Employee({ firstName: ' Name 2',
      lastName: ' LastName 2',
      department: ' Department 2'
    });
      await testEmpTwo.save();
    });

    it('should return all the data with "find" method', async () => {

    });

    it('should return proper document by various params with "findOne" method.', async () => {

    });

    after(async () => {
      await Employee.deleteMany();
    });
  });

  describe('Creating data', () => {

    it('should insert new document with "insertOne" method', async () => {

    });

    after(async () => {
      await Employee.deleteMany();
    });
  });

  describe('Updating data', () => {

    beforeEach(async () => {
        const testEmpOne = new Employee({
            firstName: ' Name 1',
            lastName: ' LastName 1',
            department: ' Department 1'
        });
        await testEmpOne.save();

        const testEmpTwo = new Employee({
            firstName: ' Name 2',
            lastName: ' LastName 2',
            department: ' Department 2'
        });
        await testEmpTwo.save();
    });

    it('should properly update one document with "updateOne" method', async () => {

    });

    it('should properly update one document with "save" method', async () => {

    });

    it('should properly update multiple documents with "updateMany" method', async () => {

    });

    afterEach(async () => {
      await Employee.deleteMany();
    });
  });

  describe('Removing data', () => {

    beforeEach(async () => {
        const testEmpOne = new Employee({
            firstName: ' Name 1',
            lastName: ' LastName 1',
            department: ' Department 1'
        });
        await testEmpOne.save();

        const testEmpTwo = new Employee({
            firstName: ' Name 2',
            lastName: ' LastName 2',
            department: ' Department 2'
        });
        await testEmpTwo.save();
    });

    it('should return all the data with "find" method', async () => {

    });

    it('should properly remove one document with "remove" method', async () => {

    });

    it('should properly remove multiple documents with "deleteMany" method', async () => {

    });

    afterEach(async () => {
      await Employee.deleteMany();
    });
  });
});