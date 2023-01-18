db.createUser(
    {
        user: "sharenergy",
        pwd: "sharenergy",
        roles: [
            {
                role: "readWrite",
                db: "prod"
            }
        ]
    }
);

db.createCollection(
    "users"
 )

// db.users.insert( { name: "userLogin", username: "desafiosharenergy", password: "sh@r3n3rgy" } )
db.users.insertOne( { name: "userLogin", email: "desafiosharenergy@gmail.com", password: "sh@r3n3rgy" } )