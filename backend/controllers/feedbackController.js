const Feedback = require('../models/Feedback');

exports.createFeedback = async (req, res) => {
  try {
    const { rating, comments } = req.body;
    const feedback = await Feedback.create({ user: req.user._id, rating, comments });
    res.status(201).json(feedback);
  } catch (error) {
    res.status(400).json({ message: 'Failed to create feedback', error: error.message });
  }
};

exports.getFeedbacks = async (req, res) => {
  try {
    const feedbacks = await Feedback.find({}).populate('user');
    res.json(feedbacks);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch feedbacks', error: error.message });
  }
};
