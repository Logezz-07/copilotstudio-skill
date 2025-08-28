"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importStar(require("express"));
const agents_hosting_1 = require("@microsoft/agents-hosting");
const package_json_1 = __importDefault(require("@microsoft/agents-hosting/package.json"));
const agent_js_1 = require("./agent.js");
// Load authentication config from environment variables
const config = (0, agents_hosting_1.loadAuthConfigFromEnv)();
const adapter = new agents_hosting_1.CloudAdapter(config);
const server = (0, express_1.default)();
server.use(express_1.default.static('public'));
server.use((0, agents_hosting_1.authorizeJWT)(config)); // Enable authentication
server.use((0, express_1.json)());
server.post('/api/messages', async (req, res) => {
    await adapter.process(req, res, (context) => agent_js_1.skillAgent.run(context));
});
const port = process.env.PORT || 3978;
server.listen(port, () => {
    console.log(`\n agent skill, running on sdk version ${package_json_1.default.version} listening on ${port} for clientId ${process.env.clientId}`);
}).on('error', (err) => {
    console.error(err);
    process.exit(1);
});
//# sourceMappingURL=index.js.map