"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Packages
const express_1 = require("express");
// Controller
const store_1 = require("../controllers/store");
const router = (0, express_1.Router)();
router.get("/", store_1.getStores);
router.get("/:id", store_1.getStoreById);
exports.default = router;
//# sourceMappingURL=store.js.map