import express from 'express';
const router = express.Router();

import ShortUrl from '../models/ShortUrl';

router.get('/url', async (req, res) => {
    ShortUrl.findOne({ short_id: req.body.short_id }, { short_id: 1, target: 1, clicks: 1, created_at: 1 }, (err, shortUrl) => {
        if (err) {
            res.status(500).json({ success: false, message: err });
        } else if (shortUrl) {
            res.json({ success: true, data: shortUrl });
        } else {
            res.status(404).json({ success: false, message: 'Url not found' });
        }
    });
});

router.post('/url', async (req, res) => {
    if(!req.body.target) { return res.status(400).json({ success: false, message: 'Target is required' }); }

    let shortUrl = new ShortUrl({
        target: req.body.target,
        owner: req.headers['x-forwarded-for'] || req.socket.remoteAddress
    });

    shortUrl.save((err, shortUrl) => {
        if (err) {
            return res.status(500).json({ success: false, message: err });
        } else {
            return res.status(201).json({ success: true, data: {
                short_id: shortUrl.short_id,
                target: shortUrl.target,
                clicks: shortUrl.clicks,
                created_at: shortUrl.created_at,
                password: shortUrl.password
            } });
        }
    });
});

router.delete('/url', async (req, res) => {
    if(!req.body.short_id) { return res.status(400).json({ success: false, message: 'Short id is required' }); }
    if(!req.body.password) { return res.status(400).json({ success: false, message: 'Password is required' }); }
    ShortUrl.findOne({ short_id: req.body.short_id, password: req.body.password }, (err, shortUrl) => {
        if (err) {
            return res.status(500).json({ success: false, message: err });
        } else if (shortUrl) {
            shortUrl.remove((err) => {
                if (err) {
                    return res.status(500).json({ success: false, message: err });
                } else {
                    return res.status(200).json({ success: true, message: 'Url deleted' });
                }
            });
        } else {
            return res.status(404).json({ success: false, message: 'Url not found' });
        }
    });
});



export default router;