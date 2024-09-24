const Complaint = require('../models/Complaint');

exports.createComplaint = async (req, res) => {
  console.log('Request body:', req.body);
  console.log('User from request:', req.user);

  try {
    const { product, description } = req.body;
    const complaint = await Complaint.create({ user: req.user._id, product, description });
    res.status(201).json(complaint);
  } catch (error) {
    res.status(400).json({ message: 'Failed to create complaint', error: error.message });
  }
};


exports.getComplaints = async (req, res) => {
  try {
    const userRole = req.user.role;
    const complaints = userRole === 'admin'
      ? await Complaint.find({}).populate('product', 'name') // Only select the _id field
      : await Complaint.find({ user: req.user._id }).populate('product', 'name');;
      
    res.json(complaints);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch complaints', error: error.message });
  }
};


exports.updateComplaintStatus = async (req, res) => {
  const { complaintId } = req.params;
  const { status } = req.body;

  try {
    const complaint = await Complaint.findById(complaintId);
    console.log(complaint);
    if (!complaint) {
      return res.status(404).json({ message: 'Complaint not found' });
    }

    complaint.status = status;
    await complaint.save();

    res.status(200).json({ message: 'Complaint status updated successfully', complaint });
  } catch (error) {
    console.error('Error updating complaint status:', error); // Log the error
    res.status(500).json({ message: 'Failed to update complaint status', error: error.message });
  }
};
