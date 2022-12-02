import mongoose from 'mongoose';
import document from './document.js';

export default class Database {
  constructor(uri) {
    this.documents = mongoose.model('Document', document);
    mongoose.connect(uri);
  }

  async createDocument(document) {
    if (await this.hasDocument(document.name)) return;
    return await this.documents.create(document);
  }

  async getDocument(name) {
    return await this.documents.findOne({ name });
  }

  async hasDocument(name) {
    return await this.documents.exists({ name });
  }

  async updateDocument(name, update) {
    return await this.documents.findOneAndUpdate({ name }, update, { new: true });
  }

  async deleteDocument(name) {
    return await this.documents.deleteOne({ name });
  }
}