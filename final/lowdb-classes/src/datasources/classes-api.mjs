import { JSONFilePreset } from 'lowdb/node';

class ClassAPI {
  constructor() {
  }

  async getClass(id) {
    const db = await JSONFilePreset('db.json', { classes: [] });

    return db.data.classes.find((classes) => classes.id === id);
  }

  async updateClass({ id, classDetails }) {
    const db = await JSONFilePreset('db.json', { classes: [] });
    const { name, description, price, attendees } = classDetails;
    const classInstance = db.data.classes.find((classInstance) => classInstance.id === id);
    console.log(classInstance);

    const updatedClass = {
      ...classInstance,
      ...(name && { name }),
      ...(description && { description }),
      ...(price && { price }),
      ...(attendees && { attendees }),
    };

    db.data.classes = db.data.classes.map((classInstance) => {
        if (classInstance.id === id) {
          return updatedClass;
        }
        return classInstance;
    });

    db.write();
    await new Promise(resolve => setTimeout(resolve, 6000));

    return updatedClass;
  }

  async getClasses() {
    const db = await JSONFilePreset('db.json', { classes: [] });

    return db.data.classes;
  }

  async createClass({ name, description, price, attendees }) {
    const db = await JSONFilePreset('db.json', { classes: [] });
    const id = (db.data.classes.length + 1).toString();

    const attendeeFormat = attendees.map((attendee) => ({ id: attendee }));
    // Simulate slowness
    await new Promise(resolve => setTimeout(resolve, 5000));
    db.data.classes.push({ id, name, description, price, attendees: attendeeFormat });
    await db.write();
    // Delete the event in 20 minutes
    setTimeout(() => {
      db.data.classes = db.data.classes.filter((classes) => classes.id !== id);
      db.write();
    }, 1200000);
    // Iterate over the attendees and provide just the ids
    return { id, name, description, price, attendees: attendeeFormat };
  }

  async getUserClasses(userId) {
    const db = await JSONFilePreset('db.json', { classes: [] });
    return db.data.classes.filter((classes) => classes.attendees.filter((attendee) => attendee.id === userId).length > 0);
  }
}

export default ClassAPI;
