import {} from "express";
import { calculateAge, extractText } from "../services/uploadService.js";
import {} from "../types/index.js";
export const handleUpload = async (req, res) => {
    if (!req.body) {
        return res.status(400).json({ error: "Data is required" });
    }
    //extract data
    const { firstName, lastName, dateOfBirth } = req.body;
    const file = req.file;
    //validate data
    if (!firstName?.trim() || !lastName?.trim() || !dateOfBirth?.trim()) {
        return res.status(400).json({ error: "All fields are required" });
    }
    if (!file)
        return res.status(400).json({ error: "File is required" });
    //calculate age
    const age = calculateAge(dateOfBirth);
    if (age === null)
        return res.status(400).json({ error: "Invalid date of birth" });
    if (age < 0)
        return res
            .status(400)
            .json({ error: "Date of birth cannot be in the future" });
    //extract text
    const extractedText = await extractText(file.path, file.mimetype);
    res.json({
        fullName: `${firstName} ${lastName}`,
        age,
        extractedText: extractedText,
    });
};
//# sourceMappingURL=uploadController.js.map