const { Command } = require("commander");
const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
} = require("./contacts.js");

const program = new Command();

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const contacts = await listContacts();
      if (contacts.length > 0) {
        console.table(contacts);
        console.log(`Amount of contacts: ${contacts.length}`);
      } else {
        console.log("Contacts not found");
      }
      break;

    case "get":
      const contactGet = await getContactById(id);
      console.table(contactGet);
      console.log(`Contact found with id: ${id}`);

      break;

    case "add":
      await addContact(name, email, phone);
      console.log(`Contact ${name} added success`);
      break;

    case "remove":
      await removeContact(id);
      console.log(`Contact with id: ${id} deleted`);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
