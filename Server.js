const express = require('express')
const mongoose = require('mongoose');
const cors = require('cors')
const app = express();
require('dotenv').config();
const jwt = require('jsonwebtoken');
// middle ware
app.use(express.json());
app.use(cors());
const axios = require("axios").default;


// connection 
mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.PASSWORD}@inventory-store.wvexc2z.mongodb.net/kaaftoon-inventory?retryWrites=true&w=majority&appName=inventory-store`).then(() => {
    console.log("Database connected successfully..")
}).catch(err => console.log(err));


// jwt authentication 
// generating token
app.post('/jwt',async(req, res) => {
    const user = req.body
    const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "1hr"
    })
    res.send({token})
});
app.get('/',async(req, res) => {
  res.json("Hello world!")
});

// api hormuud
app.post("/onlinePayment", async function (req, res) {
    try {
     
      let merchentObj = {
        schemaVersion: "1.0",
        requestId: "9270342807",
        timestamp: "client_timestamp",
        channelName: "WEB",
        serviceName: "API_PURCHASE",
        serviceParams: {
          merchantUid: "M0913645",
          apiUserId: "1007424",
          apiKey: "API-2084458443AHX",
          paymentMethod: "MWALLET_ACCOUNT",
          payerInfo: {
            accountNo: req.body.PhonePaid,
          },
          transactionInfo: {
            referenceId: "11111",
            invoiceId: "22222",
            amount: req.body.amountPaid,
            currency: "USD",
            description: `test`,
          },
          userDetail: {
            name: req.body.name,
            email: req.query.email
          }
        },
      };
      let { data } = await axios.post(
        "https://api.waafipay.net/asm",
        merchentObj,        
    );
  
      // &&  data.responseCode==2001
      if (data.errorCode == 0) {
          
        res.json({
          status: true,
          message: "sucessfully paid"
        });
      } else if (!data.errorCode == 0) {
        return res.json({ status: false, message: "not paid plz try again!"});
      }
    } catch (error) {
      res.send(error.message);
    }
  });





const electronicroute = require('./routes/electronicsRoute');
app.use(electronicroute);

const cartRouter = require('./routes/cartRoutes');
app.use(cartRouter);

const userRouter = require('./routes/userRoutes');
app.use(userRouter);


app.listen(7000, () => console.log("Server Started..."))
// kaaftoon 90AyYbsQZrMMj00c