const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");
//@desc GEt all contacts
//@route GET /api/contacts
//@acess public.

const getContacts = asyncHandler(async (req, res) => {
  const contact = await Contact.find({ user_id: req.user.id });
  res.status(200).json(contact);
});

//@desc GEt  contact by id
//@route GET /api/contacts/:id
//@acess public.

const getContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }
  if (contact.user_id !== req.user.id) {
    res.status(404);
    throw new Error("user is not authorized to access this contact");
  }

  res.status(200).json(contact);
});

//@desc Post a contact
//@route POST /api/contacts
//@acess public.

const postContacts = asyncHandler(async (req, res) => {
  const { name, email, phone } = req.body;

  const contact = await Contact.find({ email });
  // if (contact) {
  //   res.status(403);
  //   throw new Error("please enter new email");
  // }
  if (!name || !email || !phone) {
    res.status(400);
    throw new Error("all feilds are manadatory");
  }

  const newContact = await Contact.create({
    name,
    email,
    phone,
    user_id: req.user.id,
  });
  res.status(201).json(newContact);
});

//@desc PUT a contact
//@route PUT /api/contacts/:id
//@acess public.

const putContacts = asyncHandler(async (req, res) => {
  const { name, email, phone } = req.body;

  if (!name || !email || !phone) {
    res.status(400);
    throw new Error("all feilds are manadatory");
  }
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }
  if (contact.user_id !== req.user.id) {
    res.status(404);
    throw new Error("user is not authorized to access this contact");
  }

  const updatedContact = await Contact.findByIdAndUpdate(
    req.params.id,
    {
      name,
      email,
      phone,
      user_id: req.user.id,
    },
    {
      new: true,
    }
  );
  res.status(200).json(updatedContact);
});

//@desc DELETE a contact
//@route DELETE /api/contacts/:id
//@acess public.

const deleteContacts = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }

  if (contact.user_id !== req.user.id) {
    res.status(404);
    throw new Error("user is not authorized to access this contact");
  }

  await contact.deleteOne();
  res.status(200).json(contact);
});

module.exports = {
  getContacts,
  getContact,
  putContacts,
  postContacts,
  deleteContacts,
};
