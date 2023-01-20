const mongoose = require("mongoose");
const { validationResult } = require("express-validator");

const HttpError = require("../models/http-error");
const Client = require("../models/client");

const getClientById = async (req, res, next) => {
  // #swagger.tags= ['Clients']
  // #swagger.description = 'Find a place using Id'
  /* #swagger.responses[200] = { 
      schema: { 
        $ref: "#/definitions/Clients" 
      },
    } */
  const clientId = req.params.cid;

  let client;

  try {
    client = await Client.findById(clientId);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong! Could not find a client.",
      500
    );
    return next(error);
  }

  if (!client) {
    const error = new HttpError(
      "Could not find a client for the provided id.",
      404
    );
    return next(error);
  }

  res.json({ client: client.toObject({ getters: true }) });
};

const getAllClients = async (req, res, next) => {
  // #swagger.tags= ['Clients']
  // #swagger.description = 'Find all clients'
  /* #swagger.responses[200] = { 
      schema: { 
        $ref: "#/definitions/getAllClients" 
      },
    } */
  let clients;
  try {
    clients = await Client.find({});
  } catch (err) {
    const error = new HttpError(
      "Something went wrong! Could not find a client.",
      500
    );
    console.log(err)
    return next(error);
  }

  res
    .status(200)
    .json({ clients: clients.map((c) => c.toObject({ getters: true })) });
};

const createClient = async (req, res, next) => {
  // #swagger.path = '/api/places/'
  // #swagger.tags= ['Clients']
  // #swagger.description = 'Create a new client using a provided json'
  /* #swagger.parameters['Client'] = {
    in: 'body',
    description: 'Create a client.',
    schema: {
        $ref: "#/definitions/createClient"
    }
  } */

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalids inputs passed, please check your data.", 422)
    );
  }

  const { name, email, phone, address, cpf } = req.body;

  let existingClient;
  try {
    existingClient = await Client.findOne({ email: email });
  } catch (err) {
    const error = new HttpError(
      "Signing up failed! Please try again later.",
      500
    );
    return next(error);
  }
  if (existingClient) {
    const error = new HttpError(
      "Client exists already! Please login instead.",
      422
    );
    return next(error);
  }

  const createdClient = new Client({
    name,
    email,
    phone,
    address,
    cpf
  });

  try {
    await createdClient.save(); //handle all mongoDB code to save and store a document
  } catch (err) {
    console.log(err);
    const error = new HttpError("Signing up failed! Please try again.", 500);
    return next(error);
  }


  res.status(201).json({ client: createdClient });
};

const patchClient = async (req, res, next) => {
  // #swagger.path = '/api/places/{cid}'
  // #swagger.tags= ['Clients']
  // #swagger.description = 'Update fields of a Client'
  /* #swagger.parameters['Client'] = {
    in: 'body',
    description: 'Update a client.',
    schema: {
        $ref: "#/definitions/patchClient"
    }
  } */
  

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalids inputs passed, please check your data.", 422)
    );
  }

  const clientId = req.params.cid;
  const { name, email, phone, address } = req.body;

  let client;
  try {
    client = await Client.findById(clientId);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong! Could not update client.",
      500
    );
    return next(error);
  }

  if (!client) {
    throw new HttpError("Could not patch a client for the provided cid.", 404);
  }

  client.name = name;
  client.email = email;
  client.phone = phone;
  client.address = address;

  try {
    await client.save();
  } catch (err) {
    const error = new HttpError(
      "Something went wrong! Could not update client",
      500
    );
    return next(error);
  }

  res.status(200).json({ client: client.toObject({ getters: true }) });
};

const deleteClient = async (req, res, next) => {
  // #swagger.tags= ['Clients']
  // #swagger.description = 'Delete a place using place id'
  const clientId = req.params.cid;

  let client;
  try {
    client = await Client.findById(clientId);
  } catch (err) {
    console.log(err);
    const error = new HttpError(
      "Something went wrong! Could not delete client",
      500
    );
    return next(error);
  }

  if (!client) {
    const error = new HttpError(
      "Could not find a client for the provided id",
      404
    );
    return next(error);
  }


  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await Client.deleteOne({ _id: clientId }); // to avoid error
    // _id: ValidatorError: Error, expected `_id` to be unique.
    await sess.commitTransaction();
  } catch (err) {
    console.log(err);
    const error = new HttpError(
      "Something went wrong! Could not delete client",
      500
    );
    return next(error);
  }

  res.status(200).json({ message: "Deleted client!" });
};

module.exports = {
  getClientById,
  getAllClients,
  createClient,
  patchClient,
  deleteClient,
};
