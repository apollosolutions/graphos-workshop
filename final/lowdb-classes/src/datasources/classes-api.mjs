import { JSONFilePreset } from 'lowdb/node';
import { v4 as uuidv4 } from 'uuid';

class ClassAPI {
  constructor() {
  }

  async getClass(id) {
    const db = await JSONFilePreset('db.json', { classes: [] });

    return db.classes.find((classes) => classes.id === id);
  }

  async getClasses() {
    const db = await JSONFilePreset('db.json', { classes: [] });

    return db.data.classes;
  }

  async createClass({ name, description, price, attendees }) {
    const db = await JSONFilePreset('db.json', { classes: [] });
    const id = uuidv4();

    // Simulate slowness
    await setTimeout(() => {}, 2000);
    db.data.classes.push({ id, name, description, price, attendees });
    await db.write();
    // Iterate over the attendees and provide just the ids
    return { id, name, description, price, attendees: attendees.map(id => { id }) };
  }

  async getUserClasses(userId) {
    const db = await JSONFilePreset('db.json', { classes: [] });
    return db.data.classes.filter((classes) => classes.attendees.filter((attendee) => attendee.id === userId).length > 0);
  }
}

export default ClassAPI;
