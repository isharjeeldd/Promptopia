import { Schema, model, models } from "mongoose";

const PromptSchema = new Schema({
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    prompt: {
        type: String,
        required: [true, 'Prompt is required']
    },
    tag: {
        type: String,
        required: [true, 'Tag is required']
    },

})

// because the route gets called everytime our mongo connection is established so we check if the model is already added to the collection
const Prompt = models.Prompt || model("Prompts", PromptSchema);
export default Prompt;