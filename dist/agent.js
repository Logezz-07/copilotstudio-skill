"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.skillAgent = void 0;
const agents_hosting_1 = require("@microsoft/agents-hosting");
const package_json_1 = __importDefault(require("@microsoft/agents-hosting/package.json"));
exports.skillAgent = new agents_hosting_1.AgentApplication();
exports.skillAgent.onConversationUpdate('membersAdded', async (context) => {
    console.log('Member(s) added:', context.activity.membersAdded);
});
exports.skillAgent.onActivity('message', async (context) => {
    const text = context.activity.text;
    if (!text || text.trim() === '') {
        // Send welcome message if the message is empty (first turn)
        const welcomeText = `Hello from echo bot, running on version ${package_json_1.default.version}`;
        await context.sendActivity(agents_hosting_1.MessageFactory.text(welcomeText, welcomeText));
        return;
    }
    const replyText = `Echo: ${text}`;
    await context.sendActivity(agents_hosting_1.MessageFactory.text(replyText, replyText));
    if (text === null || text === void 0 ? void 0 : text.includes('version')) {
        await context.sendActivity(agents_hosting_1.MessageFactory.text('Running on version ' + package_json_1.default.version, 'Running on version ' + package_json_1.default.version));
    }
});
//# sourceMappingURL=agent.js.map