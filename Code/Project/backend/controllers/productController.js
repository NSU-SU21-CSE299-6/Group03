exports.getProducts = (req, res, next) => {
  res.status(200).json({
    success: true,
    message: "To show all the products in the database"
  })
}