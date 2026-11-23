
const { MongoClient } = require("mongodb");

const URI = "mongodb://localhost:27017";
const client = new MongoClient(URI);

async function main() {
  await client.connect();

  const users = client.db("blog_db").collection("users");

  // Start with an empty collection
  await users.deleteMany({});

  // TODO 1: Insert a user with an embedded address
  await users.insertOne({
    name: "Alice",
    email: "alice@example.com",
    address: {
      city: "Paris",
      country: "France"
    }
  });

  // TODO 2: Insert a user with at least 3 skills
  await users.insertOne({
    name: "Bob",
    email: "bob@example.com",
    skills: ["JavaScript", "MongoDB", "Node.js"]
  });

  // TODO 3: Insert at least 5 users
  await users.insertMany([
    {
      name: "Carol",
      email: "carol@example.com",
      address: {
        city: "Lyon",
        country: "France"
      },
      skills: ["Python", "Git"]
    },
    {
      name: "Dave",
      email: "dave@example.com",
      address: {
        city: "Marseille",
        country: "France"
      },
      skills: ["Docker", "Node.js"]
    },
    {
      name: "Eve",
      email: "eve@example.com",
      address: {
        city: "Luxembourg City",
        country: "Luxembourg"
      },
      skills: ["Go", "Kubernetes"]
    },
    {
      name: "Frank",
      email: "frank@example.com",
      skills: ["TypeScript", "React", "Next.js"]
    },
    {
      name: "Grace",
      email: "grace@example.com",
      address: {
        city: "Madrid",
        country: "Spain"
      }
    }
  ]);

  // TODO 4: Retrieve and log all users
  const allUsers = await users.find().toArray();

  console.log("All users:");
  allUsers.forEach(user => {
    console.log(user.name);
  });

  // TODO 5: Find the user living in Paris
  const parisUser = await users.findOne({
    "address.city": "Paris"
  });

  console.log("User living in Paris:", parisUser);

  // TODO 6: Find all users from France
  const frenchUsers = await users.find({
    "address.country": "France"
  }).toArray();

  console.log("Users from France:");
  frenchUsers.forEach(user => {
    console.log(user.name);
  });

  // TODO 7: Find users with a skills field
  const skilledUsers = await users.find({
    skills: { $exists: true }
  }).toArray();

  console.log("Users with skills:");
  skilledUsers.forEach(user => {
    console.log(user.name);
  });

  await client.close();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
