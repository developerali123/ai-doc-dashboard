const express = require("express");
const { body } = require("express-validator");
const validate = require("../middleware/validate");
const authenticateToken = require("../middleware/authMiddleware");
const documentController = require("../controllers/documentController");

const router = express.Router();

router.post(
  "/",
  authenticateToken,
  validate([
    body("title").notEmpty().withMessage("Title is required"),
    body("description").notEmpty().withMessage("Description is required"),
    body("tags").isArray().withMessage("Tags must be an array"),
  ]),
  documentController.createDocument
);

router.get("/", authenticateToken, documentController.getDocuments);

router.get("/:id", authenticateToken, documentController.getDocumentById);

router.put(
  "/:id",
  authenticateToken,
  validate([
    body("title").notEmpty().withMessage("Title is required"),
    body("description").notEmpty().withMessage("Description is required"),
    body("tags").isArray().withMessage("Tags must be an array"),
  ]),
  documentController.updateDocument
);

router.delete("/:id", authenticateToken, documentController.deleteDocument);
router.get("/:id/summary", authenticateToken, documentController.getDocumentSummary);

module.exports = router;
