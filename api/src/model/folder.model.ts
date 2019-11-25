import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;
export interface IFolder extends mongoose.Document {
  folderName: string
  user_id: string
 }
export const FolderSchema = new Schema({
  folderName: {
    type: String
  },
  user_id: {
    type: String
  }
},
{
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }  
})