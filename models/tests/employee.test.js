const Employee = require('../employee.model');
const mongoose = require('mongoose');
const expect = require('chai').expect;

describe('Employee', () => {

    it('should throw an error if no arg', () => {
        const emp = new Employee({});

        emp.validate(err => {
          expect(err.errors.firstName).to.exist;
          expect(err.errors.lastName).to.exist;
          expect(err.errors.department).to.exist;
        });
    });

    it('should throw an error if one of "arg" is missing ', () => {

          const emp = new Employee({ firstName: 'Ola', lastName: 'Wilk' });

          emp.validate(err => {
            expect(err.errors.department).to.exist;
          });

    });

    it('should throw an error if "arg" are not a string', () => {

        const cases = [{}, []];
        for(let name of cases) {
          const emp = new Employee({ name });

          emp.validate(err => {
            expect(err.errors.firstName).to.exist;
            expect(err.errors.lastName).to.exist;
            expect(err.errors.department).to.exist;
          });
        }
    });

    it('should not throw an error if "arg" is okay', () => {

        const emp = new Employee({ firstName: 'Ola', lastName: 'Wilk', department: 'Testing' });

        emp.validate(err => {
        expect(err).to.not.exist;
        });

    });
});