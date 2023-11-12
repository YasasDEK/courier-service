Node version: `v18.17.0`

Clone the Project

> git clone https://github.com/YasasDEK/courier-service.git

Open the `courier-service-app` folder. You can see `server`, `client` and `batabase` folders in it.

### Set up the database

Go to the `database` folder. You can see `courier_service_server.json` file in it. You need to import this using the `pgadmin 4`.

To that open the `pgadmin 4` click the `Tools` option from the top bar and select the `import export servers` option. Then select the file and import it. After that providing the password `test123` you can see the databse and the tables.

### Set up the server

Go to the `sever` folder and the the below command to install node modules

> npm i

To start the server run below command

> npm start

The server will run on `http://localhost:8080`

If you need to do any database setup changes, open the `db.ts` file in the server folder.

Current setup

```
user: "postgres",
host: "localhost",
database: "courier_service_db",
password: "test123",
port: 8000,
```

### Set up the client

Go to the `client` folder and the the below command to install node modules

> npm i

To run the client run below command

> npm start

The client will run on `http://localhost:3000`

Now everything is good to go!!!

### Project overview

This project contains two major user roles

- User
- Admin

#### Login and signup

Both of the uers can signup to the system from the signup page `http://localhost:3000/signup`. Initially both of the users register as a normal user. After that admins can change a user's role to admin. To do this he/she needs to be an admin.

##### Existin Admin
###### email: steve@gmail.com | password: test123


##### Existin User
##### email: alex@gmail.com | password: test123

#### Add shipment

Both users and admins can add and new shipments from the add-shipment page `http://localhost:3000/add-shipment`.

#### View shipments

Then users and admins can view those shipments `http://localhost:3000/shipments`.

- Users can view and delete thier shipmetns.
- Admins can view, delete and change the status of all the available shipments.

#### View users

Admins can view all the users in the system and they can make the users as the admins `http://localhost:3000/users`.

#### View shipment details

Both admins can users can view the detials of the shipments `http://localhost:3000/shipments/shhipmentId` (replace the shipment ID with the specific shipment id).

#### Track shipments

Both admins and users can track the shipments from the shipment tracker in the home page `http://localhost:3000/`. By addmin the shipment traxking number.
