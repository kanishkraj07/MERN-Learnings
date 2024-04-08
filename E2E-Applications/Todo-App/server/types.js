const zod = require("zod");

const TODO_SCHEMA = zod.object({
    title: zod.string(),
    description: zod.string(),
    isCompleted: zod.boolean()
})

const TODO_ID_SCHEMA = zod.string();

module.exports = {
    TODO_SCHEMA,
    TODO_ID_SCHEMA,
}