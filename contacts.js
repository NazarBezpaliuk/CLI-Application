const fs = require("fs/promises");
const path = require("path");

const contactsPath = path.join(__dirname, "./db/contacts.json");

async function listContacts() {
  const dbRaw = await fs.readFile(contactsPath);
  const parseDb = JSON.parse(dbRaw);
  return parseDb;
}

async function getContactById(contactId) {
  const db = await listContacts();
  const contactGet = db.find((contact) => contact.id === contactId);
  return contactGet;
}

async function removeContact(contactId) {
  const db = await listContacts();
  const updateContactList = db.filter((contact) => contact.id !== contactId);
  return await fs.writeFile(
    contactsPath,
    JSON.stringify(updateContactList, null, 2)
  );
}

async function addContact(name, email, phone) {
  const dbRaw = await fs.readFile(contactsPath);
  const parseDb = JSON.parse(dbRaw);
  numberId = parseDb.length + 1;
  const id = `${numberId}`;
  const contact = { id, name, email, phone };
  const db = await listContacts();

  db.push(contact);
  return await fs.writeFile(contactsPath, JSON.stringify(db, null, 2));
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
