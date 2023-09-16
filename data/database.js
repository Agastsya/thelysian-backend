import mongoose from "mongoose";
import colors from "colors";

export const ConnectDB = () => {
  mongoose
    .connect(process.env.MONGO_URI, {
      dbName: "thelysian-backend",
    })
    .then((c) =>
      console.log(`The DB is connected with ${c.connection.host}`.bgBlue.black)
    )
    .catch((e) => console.log(e));
};
