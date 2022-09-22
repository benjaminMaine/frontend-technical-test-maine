const path = require('path');
const db = require(`${path.dirname(__filename)}/../db.json`);
const { sortBy } = require('lodash');

// Need this middleware to catch some requests
// and return both conversations where userId is sender or recipient
module.exports = (req, res, next) => {
    if (/conversations/.test(req.url) && req.method === 'GET') {
        const userId = req.query?.senderId;
        const result = db?.conversations?.filter(
            (conv) => conv.senderId == userId || conv.recipientId == userId
        );

        res.status(200).json(sortBy(result, 'lastMessageTimestamp'));
        return;
    }

    next();
};
