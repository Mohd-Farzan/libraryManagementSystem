const Book = require('../Model/Book');

// Controller to render admin dashboard with books and borrowed details
const getAdminDashboard = async (req, res) => {
  try {
    // Fetch all books and populate the 'borrowedBy' field if available
    const books = await Book.find().populate('borrowedBy', 'name email').exec();
    
    res.render('adminHome', { books }); // Render the admin home page with books data
  } catch (error) {
    console.error('Error fetching books:', error);
    res.status(500).json({ message: 'Error fetching books for admin dashboard' });
  }
};

module.exports = { getAdminDashboard };
