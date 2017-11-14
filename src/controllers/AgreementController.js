
const agreementService = require('../services/AgreementService');
const personService = require('../services/PersonService');
const thesisService = require('../services/ThesisService');


export async function getAgreementById(req, res) {
    const agreement = await agreementService.getAgreementById(req.params.id);
    res.status(200).json(agreement);
}

export async function getPreviousAgreementById(req, res) {
    const agreement = await agreementService.getPreviousAgreementById(req.params.id);
    res.status(200).json(agreement);
}

export async function getAllAgreements(req, res) {
    const agreements = await agreementService.getAllAgreements();
    res.status(200).json(agreements);
}

const agreementHasNoId = (data) => {
    return data.agreementId === "" || data.agreementId == null;
} 
const getPersonData = (data) => {
    const personData = {
        personId: data.personId,
        firstname: data.studentFirstName,
        lastname: data.studentLastName,
        studentNumber: data.studentNumber,
        email: data.studentEmail,
        major: data.studentMajor
    };
    return personData;
}

const getThesisData = (data) => {
    const thesisData = {
        thesisTitle: data.thesisTitle,
        startDate: data.thesisStartDate,
        completionEta: data.thesisCompletionEta,
        performancePlace:  data.thesisPerformancePlace
    };
    return thesisData;
}

const getAgreementData = (data, thesisId) => {
    const agreementData = {
        authorId: data.personId,
        thesisId: thesisId,
        responsibleSupervisorId: data.responsibleSupervisorId,
        studyFieldId: data.studyFieldId,
        studentGradeGoal: data.studentGradeGoal,
        studentWorkTime: data.thesisWorkStudentTime,
        supervisorWorkTime: data.thesisWorkSupervisorTime,
        intermediateGoal: data.thesisWorkIntermediateGoal,
        meetingAgreement: data.thesisWorkMeetingAgreement,
        other: data.thesisWorkOther
    };
    return agreementData;
}
export async function saveAgreement(req, res) {
    const data = req.body;
    if (agreementHasNoId(data)) {
        const personData = getPersonData(data);
        const personSaveResponse =  updatePerson(personData);
        const thesisData = getThesisData(data);
        const thesisSaveResponse = saveThesis(thesisData);
        const agreementData = getAgreementData(data, thesisSaveResponse);
        const agreementSaveResponse = await saveAgreementToService(agreementData);
        if (!personSaveResponse.errno && !thesisSaveResponse.errno && !agreementSaveResponse.errno) {
            personData.personId = personSaveResponse;
            thesisData.thesisId = thesisSaveResponse;
            agreementData.agreementId = agreementSaveResponse;
            console.log("personID" ,personSaveResponse);
            console.log("ThesisID" ,thesisSaveResponse);
            console.log("AgreementID" ,agreementSaveResponse);
            res.status(200).json({person: personData, thesis: thesisData, agreement: agreementData });
            }
        else {
            res.status(500).json({text: "Error occured"});
        }
        
    } else {
        res.status(500).json({ text: "agreement already exists" });
    }
}

const updatePerson = async function(personData) {
   return await personService.updatePerson(personData);
}

const saveThesis = async function(thesisData) {
    return await thesisService.saveThesis(thesisData);
}

const saveAgreementToService = async function(agreementData) {
    return await agreementService.saveNewAgreement(agreementData);
}

export async function updateAgreement(req, res) {
    const data = req.body;
    const agreementId = req.params.id;
    if (agreementId != null && agreementId !== '') {
        try {
            const personData = {
                personId: data.personId,
                firstname: data.studentFirstName,
                lastname: data.studentLastName,
                studentNumber: data.studentNumber,
                email: data.studentEmail,
                major: data.studentMajor
            };
            const cleanPersonData = removeUselessKeys(personData);
            const personResponse = await personService.updatePerson(cleanPersonData);
            const thesisData = {
                thesisId: data.thesisId,
                thesisTitle: data.thesisTitle,
                startDate: data.thesisStartDate,
                completionEta: data.thesisCompletionEta,
                performancePlace:  data.thesisPerformancePlace
            };
            const cleanThesisData = removeUselessKeys(thesisData);
            const thesisResponse = await thesisService.updateThesis(cleanThesisData);
            const agreementData = {
                agreementId: agreementId,
                authorId: data.personId,
                thesisId: data.thesisId,
                responsibleSupervisorId: data.responsibleSupervisorId,
                studyFieldId: data.studyFieldId,
                studentGradeGoal: data.studentGradeGoal,
                studentWorkTime: data.thesisWorkStudentTime,
                supervisorWorkTime: data.thesisWorkSupervisorTime,
                intermediateGoal: data.thesisWorkIntermediateGoal,
                meetingAgreement: data.thesisWorkMeetingAgreement,
                other: data.thesisWorkOther
            };
            const cleanAgreementData = removeUselessKeys(agreementData);
            const agreementResponse = await agreementService.updateAgreement(cleanAgreementData);
            res.status(200).json({ text: "agreement update successfull(/SQL error)", agreementId: agreementId });
        } catch (err) {
            res.status(500).json({ text: "error occurred", error: err });
        }
    } else {
        res.status(500).json({ text: "problem with agreementId" });
    }
}

function removeUselessKeys(messyData) {
    //removes keys that are undefined/null from data
    let cleanData = {};
    Object.keys(messyData).map(key => {
        if (messyData[key] != null) {
            cleanData[key] = messyData[key];
        }
    });
    return cleanData;
}

export async function savePrevious(req, res) {
    const data = req.body;
    try {
        const daoResponse = await agreementService.savePrevious(data);
        res.status(200).json({ text: "agreement linked to previous agreement successfully", agreementId: daoResponse });
    } catch (err) {
        res.status(500).json({ text: "error occurred", error: err });
    }
}

