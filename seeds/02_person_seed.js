exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('person').del()
      .then(function () {
          // Inserts seed entries
          return knex('person').insert([
              {
                  personId: 1,
                  shibbolethId: 'zippoletid1',
                  email: 'grappasupervisor@mailinator.com',
                  title: 'Dr.',
                  firstname: 'Olli',
                  lastname: 'Ohjaaja',
                  isRetired: false,
                  studentNumber: ('012345678'),
                  address: ('Leppäsuonkatu'),
                  phone: '050 1234567',
                  major: 'Käpistely'
              },
              {
                  personId: 2,
                  shibbolethId: 'zippoletid2',
                  email: 'grappaprofessor@mailinator.com',
                  title: 'Prof.',
                  firstname: 'Venla',
                  lastname: 'Vastuullinen',
                  isRetired: false,
                  studentNumber: ('012345678'),
                  address: ('Leppäsuonkatu'),
                  phone: '050 1234567',
                  major: 'Matte'
              },
              {
                  personId: 3,
                  shibbolethId: 'zippoletid3',
                  email: 'anna.puu@hotmail.com',
                  title: 'Other',
                  firstname: 'Anna',
                  lastname: 'Puu',
                  isRetired: false,
                  studentNumber: ('012345678'),
                  address: ('Väinö Auerin katu'),
                  phone: '050 1234567',
                  major: 'Kemma'
              },
              {
                  personId: 4,
                  shibbolethId: 'zippoletid4',
                  email: 'retired.person@gmail.com',
                  title: 'Dr.',
                  firstname: 'Erkki',
                  lastname: 'Eläkeläinen',
                  isRetired: true,
                  studentNumber: ('012345678'),
                  address: ('Mannerheimintie'),
                  phone: '050 1234567',
                  major: 'geologiaa'
              },
              {
                  personId: 5,
                  shibbolethId: 'zippoletid5',
                  email: 'grappastudent@mailinator.com',
                  title: '',
                  firstname: 'Olivia',
                  lastname: 'Opiskelija',
                  isRetired: false,
                  studentNumber: ('87654321'),
                  address: ('Intiankatu'),
                  phone: '050 1234567',
                  major: 'mathematics'
              }
          ]);
      });
};
