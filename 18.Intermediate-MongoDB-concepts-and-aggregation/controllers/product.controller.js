import Product from "../models/Product.model.js";
import { sampleProducts } from "../data/products.js";

export const insertSampleProducts = async (req, res) => {
  try {
    // Inserts one or more new documents at a time.
    const result = await Product.insertMany(sampleProducts);
    if (result) {
      return res.status(201).json({
        success: true,
        message: "Products created successfully",
        data: `Inserted ${result.length} products`,
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Failed to save the products",
      });
    }

  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({
      success: false,
      message: "Something went wrong!!!",
    })
  }
};

export const getProductStats = async (req, res) => {
  try {
    const result = await Product.aggregate([
      //* Stage 1
      {
        //? Match products that are in stock and have a price greater than or equal to 100
        $match: {
          inStock: true, //* Filter to include only products that are in stock
          price: {
            $gte: 100, //* Filter to include only products with a price greater than or equal to 100
          }
        }
      },
      //* State 2 : Group the document
      {
        //? Group documents by the 'category' field and calculate the average price and count of products in each category
        $group: {
          _id: "$category", //* Grouping key: the 'category' field from the documents
          avgPrice: {
            $avg: "$price" //* Calculate the average price of products in each category
          },
          count: {
            $sum: 1, //* Count the number of products in each category
          },
        }
      }


    ]);

    res.status(200).json({
      success: true,
      totalData: `Total number of data response is ${result.length}`,
      data: result,
    })

  } catch (error) {
    console.error("Error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Something went wrong!!!",
    });
  }
};

export const getProductAnalysis = async(req,res) => {
  try {
    //? Each stage in the aggregation pipeline
    const result = await Product.aggregate([
      {
        //* Match documents where the category is "Electronics"
        $match: {
          category: "Electronics"
        }
      },
      {
        //* Group all documents together (since _id is set to null)
        $group: {
          _id: null,
          //* Calculate the total revenue by summing up the prices of all products in the "Electronics" category
          totalRevenue: {
            $sum: "$price"
          },
          //* Calculate the average price of all products in the "Electronics" category
          averagePrice: {
            $avg: "$price"
          },
          //* Find the maximum product price among all products in the "Electronics" category
          maxProductPrice: {
            $max: "$price"
          },
          //* Find the minimum product price among all products in the "Electronics" category
          minProductPrice: {
            $min: "$price"
          }
        }
      },
      {
    //? Project stage to shape the document
    $project: {
        //* Exclude the _id field from the output
        _id: 0,
        //* Include the totalRevenue field in the output
        totalRevenue: 1,
        //* Include the averagePrice field in the output
        averagePrice: 1,
        //* Include the maxProductPrice field in the output
        maxProductPrice: 1,
        //* Include the minProductPrice field in the output
        minProductPrice: 1,
        //* Calculate the price range by subtracting minProductPrice from maxProductPrice
        priceRange: {
            $subtract: ["$maxProductPrice", "$minProductPrice"],
        },
    }
}


    ])

    res.status(200).json({
      success: true,
      data: result,
    })
    
  } catch (error) {
    console.error("Error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Something went wrong!!!",
    });
  }
}