const express = require("express");
const router = express.Router();
const Idea = require('../models/idea');

//Get All Ideas
router.get("/", async (req, res) => {
  try {
    const ideas = await Idea.find();
    res.json({ success: true, data: ideas });
  } catch (error) {
    console.log(error);
    res.status(500).json ({success: false, error: 'Something went wrong'});
  }
});

//Get Single Idea
  router.get('/:id', async (req, res) => {
    try {
      const idea = await Idea.findById(req.params.id);
      res.json({ success: true, data: idea });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, error: 'Something Went Wrong' });
    }
});

//Add an Idea
router.post('/', async (req, res) => {
  const idea = new Idea({
    text: req.body.text,
    tag: req.body.tag,
    username: req.body.username,
  });

  try {
    const savedIdea = await idea.save();
    res.json({ success: true, data: savedIdea });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: 'Something Went Wrong' });
  }
});

//Update an Idea
router.put('/:id', async (req, res) => {
  try {
    const updatedIdea = await Idea.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          text: req.body.text,
          tag: req.body.tag,
        },
      },
      { new: true }
    );
    res.json({ success: true, data: updatedIdea });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: 'Something Went Wrong' });
  }
});

//Delete an Idea
router.delete('/:id', async (req, res) => {
  try {
    await Idea.findByIdAndDelete(req.params.id);
    res.json({ success: true, data: {} });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: 'Something Went Wrong' });
  }
});

module.exports = router;
