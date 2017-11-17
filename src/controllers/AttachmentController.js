require('babel-polyfill');
const attachmentService = require('../services/AttachmentService');
const fileService = require('../services/FileService');
const express = require('express');
const Busboy = require('busboy');
const app = express();
const fs = require('fs');

export async function saveAttachment(req, res) {
    try {
        let busboy = new Busboy({ headers: req.headers });
        busboy.on('file', async function (fieldname, file, filename, encoding, mimetype) {
            const attachmentData = {
                agreementId: req.params.id,
                savedOnDisk: false,
                filename: filename,
                type: mimetype
            };
            const attachmentId = await attachmentService.saveAttachment(attachmentData);
            const fileResponse = await fileService.savePdfFile(file, attachmentId);
            if (fileResponse) {
                let successData = {
                    attachmentId: attachmentId,
                    savedOnDisk: true
                };
                const attachmentResponse = await attachmentService.updateAttachment(successData);
            } else {
                res.status(500).json({ text: "could not save file" });
            }
        });
        res.status(200).json({ text: "attachment save successful" });
        return req.pipe(busboy);
    } catch (error) {
        res.status(500).json({ text: "error occured", error: error });
    }
}