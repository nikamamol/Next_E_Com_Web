 import Product from "@/models/Product"
 import db from "@/utils/db"

// import connectedToDatabase from "@/utils/db";

export default async function handler(req, res) {
  await db.connect()

  if (req.method === 'GET') {
    const product = await Product.findById(req.query.id)
    return res.status(200).json(product)
  }

  await db.disconnect()
}








// export default async function handler(req, res) {
//   const client = await connectedToDatabase();
//   const db = client.db();
//   const usersCollection = db.collection("products");
//   const product = await usersCollection.find({products: req.query._id}).toArray();
//   return res.status(200).json(product);
// }



