"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = __importStar(require("mongoose"));
const Schema = mongoose.Schema;
exports.NotesSChema = new Schema({
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
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});
//# sourceMappingURL=notes.model.js.map