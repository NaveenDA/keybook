import * as mongoose from 'mongoose';
import Bcrypt  from 'bcryptjs';
const Schema = mongoose.Schema;

export interface IUser extends mongoose.Document {
  comparePassword(password: any, arg1: () => void);
  name: string,
  email: string,
  password: string,
  user_active: boolean
}
export const UserSchema = new Schema({
  name: {
    type: String,
    required: 'Enter a name'
  },
  email: {
    type: String,
    required: 'Enter a email',
    unique: true
  },
  password: {
    type: String,
    required: 'Enter a password'
  },
  user_ative: {
    type: Boolean
  }
},
{
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});
UserSchema.pre<IUser>("save", function(next) {
    if(!this.isModified("password")) {
        return next();
    }
    this.password = Bcrypt.hashSync(this.password, 10);
    next();
});
UserSchema.methods.comparePassword = function (plaintext, callback) { 
  return callback(Bcrypt.compareSync(plaintext, this.password));
}