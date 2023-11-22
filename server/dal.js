// const MongoClient = require('mongodb').MongoClient;
const { MongoClient, ServerApiVersion } = require('mongodb');



const uri = "mongodb+srv://badbankuser:notasecurepassword@cluster0.yhcaaac.mongodb.net/";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});
async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
        // } finally {
        //     // Ensures that the client will close when you finish/error
        //     await client.close();
    } catch (err) {
        console.log(err.stack);
    }
}
run().catch(console.dir);

let db = null;

// Connect to MongoDB and initialize the 'db' variable
async function connectToMongo() {
    const client = new MongoClient(uri, { monitorCommands: true });

    try {
        // Connect to MongoDB using the client
        await client.connect("admin");

        // Connect to the 'myproject' database
        db = client.db('fullstackbadbank');
        console.log(db + ' is connected')
    } catch (err) {
        console.error('Error connecting to MongoDB:', err);
    }
}

// Call the connectToMongo function to establish the connection
connectToMongo();

async function test() {
    try {
        // Wait for the MongoDB connection to be established
        await run();

        if (!db) {
            throw new Error('Error from test: MongoDB connection is not established.');
        }
        console.log("connected to test")
    } catch (err) {
        console.error(err);
        throw err; // Propagate the error
    }
}

// Function to create a user document in the 'users' collection
async function create(name, email, password) {
    try {
        // Wait for the MongoDB connection to be established
        await connectToMongo();

        if (!db) {
            throw new Error('Error from create: MongoDB connection is not established.');
        }

        const collection = db.collection('users');
        const doc = { name, email, password, balance: 0, role: "user" };
        const result = await collection.insertOne(doc);
        return doc;
    } catch (err) {
        console.error(err);
        throw err; // Propagate the error
    }
}

// Login a user
async function login(email, password) {
    try {
        // Wait for the MongoDB connection to be established
        await connectToMongo();

        if (!db) {
            throw new Error('Error from login: MongoDB connection is not established.');
        }

        const collection = db.collection('users');
        const docs = await collection.find().toArray();
        const user = docs.find((user) => user.email == email);
        if (!user) {
            return false;
        }

        if (user.password == password) {
            return user;
        }

        return false;
    } catch (err) {
        console.error(err);
        throw err; // Propagate the error
    }
}

// function to adjust funds to an account
async function adjust(email, amount) {
    try {
        // Wait for the MongoDB connection to be established
        await connectToMongo();

        if (!db) {
            throw new Error('Error from adjust: MongoDB connection is not established.');
        }

        const collection = db.collection('users');
        const docs = await collection.find().toArray();
        const user = docs.find((user) => user.email == email);
        if (!user) {
            console.log("user not found");
            return null;
        }

        //amount is a string from the url, have to convert to a number before adding or updating the db
        amount = Number(amount);
        // Calculate the new balance after the deposit
        const newBalance = user.balance + amount;

        // Update the user's balance in the collection
        await collection.updateOne(
            { email: user.email },
            { $set: { balance: newBalance } }
        );

        console.log(`Fund adjustment of ${amount} to ${user.email} completed.`);
        return "" + newBalance; //return a string instead of a number, numbers are error codes in "res.send"
    } catch (err) {
        console.error(err);
        throw err; // Propagate the error
    }
}

// function to get the balance for an account
async function balance(email) {
    try {
        // Wait for the MongoDB connection to be established
        await connectToMongo();

        if (!db) {
            throw new Error('Error from balance: MongoDB connection is not established.');
        }

        const collection = db.collection('users');
        const docs = await collection.find().toArray();
        const user = docs.find((user) => user.email == email);
        if (!user) {
            console.log("user not found");
            return null;
        }

        console.log(`user.balance: ${user.balance}`);
        return "" + user.balance; //return a string instead of a number, numbers are error codes in "res.send"
    } catch (err) {
        console.error(err);
        throw err; // Propagate the error
    }
}

// Function to retrieve all user documents from the 'users' collection
// TODO: Stretch goal exclude password from the returned documents, change get to post and tell it to only send back the name and email and balance.
async function all() {
    try {
        // Wait for the MongoDB connection to be established
        await connectToMongo();

        if (!db) {
            throw new Error('Error from all: MongoDB connection is not established.');
        }

        const collection = db.collection('users');
        const docs = await collection.find().toArray();

        console.log("Connected to all");
        return docs;
    } catch (err) {
        console.error(err);
        throw err; // Propagate the error
    }
}

module.exports = { create, login, adjust, balance, all };