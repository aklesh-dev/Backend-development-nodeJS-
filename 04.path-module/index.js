const path = require("path");

console.log("Directory name:", path.dirname(__filename));
console.log("file name:", path.basename(__filename));
console.log("File extension:", path.extname(__filename));

const joinPath = path.join("/user", "document", "node", "projects");
console.log("Joined path:", joinPath);

const normalizePath = path.normalize("/user/documents/../node/project");
console.log("Normalize path:", normalizePath);

