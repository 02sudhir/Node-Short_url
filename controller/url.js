const shortid = require('shortid');
const URL = require('../models/urls');

async function handlegenerateNewShortUrl(req, res) {
  const body = req.body;
  if (!body.url) return res.status(400).json({ error: 'URL is required' });

  const shortId = shortid.generate();
  await URL.create({
    shortId: shortId,
    redirectURL: body.url,
    visithistory: []
  });

  return res.json({ id: shortId });
}

async function handleGetAnalytics(req,res){
    const shortId = req.params.shortId;
    const result = await URL.findOne({shortId});
    return res.json({totalClicks:result.visithistory.length,analytics:result.visithistory})
}

module.exports = {
  handlegenerateNewShortUrl,
  handleGetAnalytics,
};
