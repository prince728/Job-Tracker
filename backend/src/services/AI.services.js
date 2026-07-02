const Groq = require("groq-sdk");

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const ResumeScore = async (resumeText, jobDescription) => {
    try {
        const chatCompletion = await groq.chat.completions.create({
            messages: [
                {
                    role: "system",
                    content: `You are an expert technical recruiter and resume analyzer. 
          Analyze the given resume against the job description and respond ONLY with a valid JSON object.
          No markdown, no explanation, no code blocks. Only raw JSON with exactly these keys:
          {
            "matchScore": number between 0-100,
            "matchingSkills": array of strings,
            "missingSkills": array of strings,
            "improvements": array of exactly 3 specific suggestion strings
          }`
                },
                {
                    role: "user",
                    content: `Resume: ${resumeText}\n\nJob Description: ${jobDescription}`
                }
            ],
            model: "openai/gpt-oss-120b"
        });

        const content = chatCompletion.choices[0]?.message?.content;
        return JSON.parse(content);

    } catch (error) {
        throw new Error("AI service failed: " + error.message);
    }
};

const interviewPrepHelp = async (companyName, roleTitle) => {
    try {
        const chatCompletion = await groq.chat.completions.create({
            messages: [
                {
                    role: "system",
                    content: `You are an expert technical interviewer with years of experience hiring software engineers at top tech companies. 
                    Generate interview questions for a candidate applying for the given role at the given company.
                    Respond ONLY with a valid JSON object. No markdown, no explanation, no code blocks. Only raw JSON with exactly this structure:
                    {
                        "dsaTechnical": array of 3 question strings,
                        "roleSpecific": array of 3 question strings,
                        "behavioural": array of 2 question strings,
                        "companySpecific": array of 2 question strings
                    }`
                },
                {
                    role: "user",
                    content: `companyName: ${companyName}\n\n roleTitle: ${roleTitle}`
                }
            ],
            model: "openai/gpt-oss-120b"
        });

        const content = chatCompletion.choices[0]?.message?.content;
        return JSON.parse(content);

    } catch (error) {
        throw new Error("AI service failed: " + error.message);
    }
}


module.exports =  { ResumeScore, interviewPrepHelp };