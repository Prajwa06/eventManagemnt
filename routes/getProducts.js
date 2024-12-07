const Product = require("../models/Product");



function filterArray(data,category,minPrice,maxPrice) {
  

  return data.filter(item => {
    let isMatch = true;

    // Check category
    if (category && item.category !== category) {
      isMatch = false;
    }

    // Check minimum price
    if (minPrice && item.price < parseFloat(minPrice)) {
      isMatch = false;
    }

    // Check maximum price
    if (maxPrice && item.price > parseFloat(maxPrice)) {
      isMatch = false;
    }

    return isMatch;
  });
}


const getProducts = async (category, minPrice, maxPrice) => {
  try {
    const result = await Product.find();
    let documents;
    documents=filterArray(result,category,minPrice,maxPrice);
   

    if (!documents) {
      return {
        statusCode: 400,
        message: "Products does not  exist",
      };
    }

    return {
      statusCode: 201,
      message: "Product fetched succesfully",
      data: documents,
    };
  } catch (error) {
    if (error) {
      console.log(error);
      return {
        statusCode: 400,
        message: "Products fetching failed, Please try again",
      };
    }
    return {
      statusCode: 500,
      message: "Internal server error",
    };
  }
};

module.exports = getProducts;
