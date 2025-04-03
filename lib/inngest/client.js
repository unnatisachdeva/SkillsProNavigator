import { Inngest } from "inngest";

export const inngest = new Inngest({
  id: "SkillsPro", // Unique app ID
  name:  "SkillsPro Navigator",
  credentials: {
    gemini: {
      apiKey: process.env.GEMINI_API_KEY,
    },
  },
});



