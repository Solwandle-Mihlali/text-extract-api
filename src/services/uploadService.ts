import fs from "fs";
import { createWorker } from "tesseract.js";

export function calculateAge(dob: string): number | null {
  const birthDate = new Date(dob);
  if (isNaN(birthDate.getTime())) return null;
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  )
    age--;
  return age;
}

export async function extractText(
  filePath: string,
  mimeType: string,
): Promise<string> {
  try {
    if (mimeType === "application/pdf") {
      const buffer = fs.readFileSync(filePath);
      const uint8Array = new Uint8Array(buffer);
      const { PDFParse } = await import("pdf-parse");
      const parser = new PDFParse(uint8Array);
      const result = await parser.getText();
      return result.text.trim();
    } else if (mimeType.startsWith("image/")) {
      const worker = await createWorker("eng");
      const {
        data: { text },
      } = await worker.recognize(filePath);
      await worker.terminate();
      return text.trim();
    } else {
      throw new Error("Unsupported file type for text extraction");
    }
  } catch (error) {
    console.error("Text extraction error:", error);
    return "Error extracting text";
  }
}
