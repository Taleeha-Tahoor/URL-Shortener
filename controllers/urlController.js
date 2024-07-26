import {nanoid} from "nanoid";
import URL from "../models/urlModel.js";

export async function handleGenerateURL(req,res){
    const body = req.body;
    if(!body.url) return res.status(400).json({error: "url is required"});

    const shortID = nanoid(8);
    await URL.create({
        shortId: shortID,
        redirectURL: body.url,
        visitHistory: [],
    })
    return res.render("home", {id: shortID});
}

export async function handleRedirect(req, res) {
  const shortId = req.params.shortid;
  console.log(`Received shortId: ${shortId}`);

  try {
    const entry = await URL.findOneAndUpdate(
      { shortId },
      { $push: { visitHistory: { timestamp: Date.now() } } },
      { new: true }
    );

    if (entry) {
      console.log(`Redirecting to: ${entry.redirectURL}`);
      return res.redirect(entry.redirectURL);
    } else {
      console.error(`URL with shortId '${shortId}' not found`);
      return res.status(404).json({ error: 'URL not found' });
    }
  } catch (error) {
    console.error('Error during URL redirection:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

export async function handleGetAnalytics (req, res) {
    const shortId = req.params.shortId;
   const result = await URL.findOne({shortId});

   return res.json({totalClicks: result.visitHistory.length, analytics: result.visitHistory });
}