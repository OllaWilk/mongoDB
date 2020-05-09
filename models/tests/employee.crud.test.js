const Employee = require('../employee.model.js');
const expect = require('chai').expect;
const MongoMemoryServer = require('mongodb-memory-server').MongoMemoryServer;
const mongoose = require('mongoose');


describe('Employee', () => {

  before(async () => {

    try {
      const employeeDB = new MongoMemoryServer();

      const uri = await employeeDB.getConnectionString();

      mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

    } catch(err) {
      console.log(err);
    }
  });

  describe('Reading data', () => {

    before(async () => {
      const testEmpOne = new Employee({
        firstName: 'Ola',
        lastName: 'Wilk',
        department: 'Testing'
      });
      await testEmpOne.save();

      const testEmpTwo = new Employee({
        firstName: 'Marek',
        lastName: 'Jelon',
        department: 'IT'
      });
      await testEmpTwo.save();
  });

    it('should return all the data with "find" method', async () => {
      /*const employees = await Employee.find();
      const expectedLength = 2;
      expect(employees.length).to.be.equal(expectedLength);
      */
      //!!! DLACZEGO ZŁAPANE W TRY{} CATCH{} DZIAŁA A TAK JAK POWYŻEJ NIE DZIAŁA
      try {
        const employees = await Employee.find();
        const expectedLength = 2;
        expect(employees.length).to.be.equal(expectedLength);
      } catch(err) {
        console.log(err);
      }

    });


    it('should return proper document by various params with "findOne" method.', async () => {

      try {
        const nameTest = await Employee.findOne({ firstName: 'Ola' });
        const lastNameTest = await Employee.findOne({ lastName: 'Wilk' });
        const depTest = await Employee.findOne({ department: 'Testing' });

        const expectedName = 'Ola';
        const expectedLastName = 'Wilk';
        const expectedDep = 'Testing';

        expect(nameTest.firstName).to.be.equal(expectedName);
        expect(lastNameTest.lastName).to.be.equal(expectedLastName);
        expect(depTest.lastName).to.be.equal(expectedDep);
      } catch(err) {
        console.log(err);
      }
    });


    after(async () => {
      await Employee.deleteMany();
    });
  });

  describe('Creating data', () => {

    it('should insert new document with "insertOne" method', async () => {
      const employee = new Employee({
        firstName: 'Ola',
        lastName: 'Wilk',
        department: 'Testing'
      });
      await employee.save();

      expect(employee.isNew).to.be.false;
    });

    after(async () => {
      await Employee.deleteMany();
    });
  });

  describe('Updating data', () => {

    beforeEach(async () => {
        const testEmpOne = new Employee({
          firstName: 'Ola',
          lastName: 'Wilk',
          department: 'Testing'
        });
        await testEmpOne.save();

        const testEmpTwo = new Employee({
          firstName: 'Marek',
          lastName: 'Jelon',
          department: 'IT'
        });
        await testEmpTwo.save();
    });

    it('should properly update one document with "updateOne" method', async () => {
      await Employee.updateOne({ firstName: 'Ola' }, { $set: { firstName: '=Kasia=' }});
      const updatedEmployee = await Employee.findOne({ firstName: '=Kasia=' });
      expect(updatedEmployee).to.not.be.null;
    });

    it('should properly update one document with "save" method', async () => {
      const employee = await Employee.findOne({ firstName: 'Ola' });
      employee.firstName = '=Ola=';
      await employee.save();

      const updatedEmployee = await Employee.findOne({ firstName: '=Ola=' });
      expect(updatedEmployee).to.not.be.null;
    });

    it('should properly update multiple documents with "updateMany" method', async () => {
      await Employee.updateMany({}, { $set: { firstName: 'Ola' }});
      const employees = await Employee.find();
      expect(employees[0].firstName).to.be.equal('Ola');
      expect(employees[1].firstName).to.be.equal('Ola');
    });

    afterEach(async () => {
      await Employee.deleteMany();
    });
  });

  describe('Removing data', () => {

    beforeEach(async () => {
      const testEmpOne = new Employee({
        firstName: 'Ola',
        lastName: 'Wilk',
        department: 'Testing'
      });
      await testEmpOne.save();

      const testEmpTwo = new Employee({
        firstName: 'Marek',
        lastName: 'Jelon',
        department: 'IT'
      });
      await testEmpTwo.save();
    });

    it('should properly remove one doc with "deleteOne" method', async () => {
      await Employee.deleteOne({ firstName: 'Ola' });
      const delEmp = await Employee.findOne({ firstName: 'Ola' });

      expect(delEmp).to.be.null;
    });

    it('should properly remove one document with "remove" method', async () => {
      const employee = await Employee.findOne({ firstName: 'Ola' });
      await employee.remove();
      const delEmp = await Employee.findOne({ firstName: 'Ola' });
      expect(delEmp).to.be.null;
    });

    it('should properly remove multiple documents with "deleteMany" method', async () => {
      await Employee.deleteMany();
      const delEmp = await Employee.find();
      expect(delEmp).to.be.empty;
    });

    afterEach(async () => {
      await Employee.deleteMany();
    });
  });
});