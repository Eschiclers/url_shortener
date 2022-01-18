import express from 'express';
const router = express.Router();
import {nanoid} from 'nanoid';
import Config from '../config';

import ShortUrl from '../models/ShortUrl';

function isURL(str) {
    var pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
    return !!pattern.test(str);
}

router.get('/url/:short_id', async (req, res) => {
    ShortUrl.findOne({ short_id: req.params.short_id }, { short_id: 1, target: 1, is_protected: 1, clicks: 1, created_at: 1 }, (err, shortUrl) => {
        if (err) {
            res.json({ success: false, message: err });
        } else if (shortUrl) {
            shortUrl.clicks++;
            shortUrl.save();
            res.json({ success: true, data: shortUrl });
        } else {
            res.json({ success: false, message: 'Url not found' });
        }
    });
});

router.post('/url', async (req, res) => {
    if (!req.body.target) { return res.json({ success: false, message: 'Target is required' }); }
    if (!isURL(req.body.target)) { return res.json({ success: false, message: 'Target is not a valid url' }); }

    let shortUrl = new ShortUrl({
        target: req.body.target,
        short_id: nanoid(Number(Config.ID_LENGTH)),
        owner: req.headers['x-forwarded-for'] || req.socket.remoteAddress
    });

    shortUrl.save((err, shortUrl) => {
        if (err) {
            return res.json({ success: false, message: err });
        } else {
            return res.json({
                success: true, data: {
                    short_id: shortUrl.short_id,
                    target: shortUrl.target,
                    clicks: shortUrl.clicks,
                    created_at: shortUrl.created_at,
                    password: shortUrl.password
                }
            });
        }
    });
});

router.delete('/url', async (req, res) => {
    if (!req.body.short_id) { return res.json({ success: false, message: 'Short id is required' }); }
    if (!req.body.password) { return res.json({ success: false, message: 'Password is required' }); }
    ShortUrl.findOne({ short_id: req.body.short_id, password: req.body.password }, (err, shortUrl) => {
        if (err) {
            return res.json({ success: false, message: err });
        } else if (shortUrl) {
            shortUrl.remove((err) => {
                if (err) {
                    return res.json({ success: false, message: err });
                } else {
                    return res.json({ success: true, message: 'Url deleted' });
                }
            });
        } else {
            return res.json({ success: false, message: 'Url not found' });
        }
    });
});



export default router;