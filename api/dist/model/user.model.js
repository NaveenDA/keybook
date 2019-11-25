"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = __importStar(require("mongoose"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const Schema = mongoose.Schema;
exports.UserSchema = new Schema({
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
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});
exports.UserSchema.pre("save", function (next) {
    if (!this.isModified("password")) {
        return next();
    }
    this.password = bcryptjs_1.default.hashSync(this.password, 10);
    next();
});
exports.UserSchema.methods.comparePassword = function (plaintext, callback) {
    return callback(bcryptjs_1.default.compareSync(plaintext, this.password));
};
//# sourceMappingURL=user.model.js.map