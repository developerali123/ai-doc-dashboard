const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Create Document
exports.createDocument = async (req, res) => {
  const userId = req.user.userId;
  const { title, description, tags } = req.body;

  try {
    const document = await prisma.document.create({
      data: {
        title,
        description,
        tags,
        userId,
      },
    });

    res.status(201).json(document);
  } catch (error) {
    console.error("Create document error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get All Documents
exports.getDocuments = async (req, res) => {
  const userId = req.user.userId;
  const { search = "", page = 1, limit = 10 } = req.query;

  const skip = (parseInt(page) - 1) * parseInt(limit);
  const take = parseInt(limit);

  try {
    const [documents, total] = await Promise.all([
      prisma.document.findMany({
        where: {
          userId,
          title: {
            contains: search,
            mode: "insensitive",
          },
        },
        orderBy: { createdAt: "desc" },
        skip,
        take,
      }),
      prisma.document.count({
        where: {
          userId,
          title: {
            contains: search,
            mode: "insensitive",
          },
        },
      }),
    ]);

    res.status(200).json({
      data: documents,
      total,
      page: parseInt(page),
      limit: parseInt(limit),
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error("Get documents error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get Single Document
exports.getDocumentById = async (req, res) => {
  const userId = req.user.userId;
  const documentId = parseInt(req.params.id);

  try {
    const document = await prisma.document.findUnique({
      where: { id: documentId },
    });

    if (!document || document.userId !== userId) {
      return res.status(404).json({ message: "Document not found" });
    }

    res.status(200).json(document);
  } catch (error) {
    console.error("Get document by ID error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Update Document
exports.updateDocument = async (req, res) => {
  const userId = req.user.userId;
  const documentId = parseInt(req.params.id);
  const { title, description, tags } = req.body;

  try {
    const document = await prisma.document.findUnique({
      where: { id: documentId },
    });

    if (!document || document.userId !== userId) {
      return res.status(404).json({ message: "Document not found" });
    }

    const updatedDocument = await prisma.document.update({
      where: { id: documentId },
      data: {
        title,
        description,
        tags,
      },
    });

    res.status(200).json(updatedDocument);
  } catch (error) {
    console.error("Update document error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Delete Document
exports.deleteDocument = async (req, res) => {
  const userId = req.user.userId;
  const documentId = parseInt(req.params.id);

  try {
    const document = await prisma.document.findUnique({
      where: { id: documentId },
    });

    if (!document || document.userId !== userId) {
      return res.status(404).json({ message: "Document not found" });
    }

    await prisma.document.delete({
      where: { id: documentId },
    });

    res.status(200).json({ message: "Document deleted successfully" });
  } catch (error) {
    console.error("Delete document error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Simulate AI Summary
exports.getDocumentSummary = async (req, res) => {
  const userId = req.user.userId;
  const documentId = parseInt(req.params.id);

  try {
    const document = await prisma.document.findUnique({
      where: { id: documentId },
    });

    if (!document || document.userId !== userId) {
      return res.status(404).json({ message: "Document not found" });
    }

    // Simulate AI summary
    const predefinedSummaries = [
      "Summary: This document highlights key objectives and goals.",
      "Summary: An overview of the project milestones and deliverables.",
      "Summary: Contains important insights and recommendations.",
      `Summary: ${document.description.split(" ").slice(0, 30).join(" ")}...`,
    ];

    const randomIndex = Math.floor(Math.random() * predefinedSummaries.length);
    const simulatedSummary = predefinedSummaries[randomIndex];

    res.status(200).json({ summary: simulatedSummary });
  } catch (error) {
    console.error("Get document summary error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
