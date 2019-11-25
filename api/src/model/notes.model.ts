import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;

export interface INotes extends mongoose.Document { 
  title: string,
  content: string,
  image: string[],
  user_id: string,
  folder_id: string,
  todo_list: string[],
  note_color: string,
  is_pinned: boolean,
  is_bin:boolean
}

export const NotesSChema = new Schema({
  title: {
    type: String
  },
  content: {
    type: String
  },
  image: [{
    url: String,
    text: String
  }],
  user_id: {
    type: String
  },
  folder_id: {
    type: String
  },
  todo_list: [{
    task: String,
    is_completed: Boolean
  }],
  note_color: {
    type: String
  },
  is_pinned: {
    type: Boolean
  },
  is_bin: {
    type: Boolean
  }
},
{
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }  
})