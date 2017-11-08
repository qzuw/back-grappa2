const knex = require('../../connection');

export const getAgreementById = (id) => {
    return knex.select('thesis.title as thesisTitle', 'studyfield.name as studentMajor', 'agreement.studentGradeGoal', 'person.email as studentEmail', 'person.firstname as studentFirstName', 'person.lastname as studentLastName').from('agreement')
        .join('thesis', 'agreement.thesisId', '=', 'thesis.thesisId')
        .join('person', 'agreement.authorId', '=', 'person.personId')
        .join('studyfield', 'agreement.studyfieldId', '=', 'studyfield.studyfieldId')
        .where('agreementId', id)
        .then(agreement => {
            return agreement;
        });
}

export const getPreviousAgreementById = (id) => {
    return knex.select().from('previousagreements')
        .join('agreement', 'previousagreements.previousAgreementId', '=', 'agreement.agreementId')
        .where('previousagreements.agreementId', id)
        .then(agreement => {
            return agreement;
        });
}

export const getAllAgreements = () => {
    return knex.select().from('agreement')
        .then(agreements => {
            return agreements;
        });
}

export const saveNewAgreement = (data) => {
    return knex('agreement')
        .returning('agreementId')
        .insert(data)
        .then(agreementId => agreementId[0])
        .catch(err => err);
}

export const updateAgreement = (data) => {
    return knex('agreement')
        .returning('agreementId')
        .where('agreementId', '=', data.agreementId)
        .update(data)
        .then(agreementId => agreementId[0])
        .catch(err => err);
}

export const savePrevious = (data) => {
    return knex('previousagreements')
        .returning('agreementId')
        .insert(data)
        .then(agreementId => agreementId[0])
        .catch(err => err);
}
