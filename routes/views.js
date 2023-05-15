"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Packages
const express_1 = require("express");
// Controllers
const views_1 = require("../controllers/views");
const router = (0, express_1.Router)();
router.get("/", views_1.getViewsCategories);
exports.default = router;
//# sourceMappingURL=views.js.map