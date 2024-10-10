import OpenAI from 'openai';
import { createReadStream } from 'fs';
import { ResumeAnalysis, ResumeFields, SoftSkillsAnalysis } from '../types/resumeAnalysis';
import extract_resume_fields from './functions/extract_resume_fields';
import extract_soft_skills from './functions/extract_soft_skills';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function analyzeResume(filePath: string): Promise<ResumeAnalysis> {
  // Upload the file
  const file = await openai.files.create({
    file: createReadStream(filePath),
    purpose: 'assistants',
  });

  console.log(file);

  // Create an assistant
  const assistant = await openai.beta.assistants.create({
    name: "Resume Analyzer",
    instructions: `You are a helpful assistant that analyzes resumes. Extract and summarize relevant details from the resume attached. 
    Then, submit all that information to the extract_resume_fields function. From the resume, extract assumed information, 
    such as assumed intelligence, sociability, etc scores, 
    all that would be soft skills. Include skills that have low scores, but are still important. If a candidate is likely
    to be aggressive or hard to work with, include that in the description. 
    
    In all scoring, be:
    - Harsh, but fair
    - Thinking of the worst possible outcome for the candidate
    - Assuming the candidate is lying unless proven otherwise
    - Assuming the candidate is not a good fit for the job unless proven otherwise
    - Have the company's interests at heart
    - Assume the candidate uses AI to optimize their resume

    Use the following scoring system:
    - 1-3: Industry Average
    - 4: Industry Competent
    - 5-6: Above performer w/ High Potential
    - 7-9: Industry Champion
    - 10: World Class

    Have it be an array of types, 
    a score, then a short description why that score is fitting. Assume ethnicity race etc too, all that would be important for 
    a DEI hire. Call the extract_soft_skills function.`,
    model: "gpt-4o",
    tools: [
      { type: "file_search" },
      { 
        type: "function",
        function: extract_resume_fields
      },
      {
        type: "function",
        function: extract_soft_skills
      }
    ],
  });

  const thread = await openai.beta.threads.create();

  let analysis: Partial<ResumeAnalysis> = {};

  const handleRequireAction = async (run: OpenAI.Beta.Threads.Run): Promise<OpenAI.Beta.Threads.Run> => {
    if (
      run.required_action &&
      run.required_action.type === 'submit_tool_outputs' &&
      run.required_action.submit_tool_outputs.tool_calls
    ) {
      const toolOutputs = run.required_action.submit_tool_outputs.tool_calls.map((tool) => {
        const toolCallArguments = JSON.parse(tool.function.arguments);
        console.log(toolCallArguments);

        // Update analysis based on the function called
        if (tool.function.name === 'extract_resume_fields') {
          analysis = { ...analysis, ...toolCallArguments as ResumeFields };
        } else if (tool.function.name === 'extract_soft_skills') {
          analysis = { ...analysis, ...toolCallArguments as SoftSkillsAnalysis };
        }

        return {
          tool_call_id: tool.id,
          output: JSON.stringify({ acknowledged: true }),
        };
      });

      if (toolOutputs.length > 0) {
        run = await openai.beta.threads.runs.submitToolOutputsAndPoll(
          thread.id,
          run.id,
          { tool_outputs: toolOutputs }
        );
        console.log("Tool outputs submitted successfully.");
      } else {
        console.log("No tool outputs to submit.");
      }

      return run;
    }
    return run;
  };

  const handleRunStatus = async (run: OpenAI.Beta.Threads.Run): Promise<OpenAI.Beta.Threads.Run> => {
    if (run.status === "completed") {
      return run;
    } else if (run.status === "requires_action") {
      return handleRequireAction(run);
    } else if (run.status === "queued") {
      console.log(JSON.stringify(run));
      console.log("Run is queued, waiting for 5 seconds before checking again...");
      await new Promise(resolve => setTimeout(resolve, 5000));
      return handleRunStatus(run);
    } else {
      console.error("Run did not complete:", run);
      throw new Error(`Run failed with status: ${run.status}`);
    }
  };

  // Add a message to the thread
  await openai.beta.threads.messages.create(thread.id, {
    role: "user",
    content: "Please analyze the resume in the uploaded file and provide a structured output using the extract_resume_fields and extract_soft_skills functions.",
    attachments: [{file_id: file.id, tools: [{type: "file_search"}]}],
  });

  // Run the assistant
  const ran = await openai.beta.threads.runs.createAndPoll(thread.id, {
    assistant_id: assistant.id,
  });

  // Wait for the run to complete
  const finalRun = await handleRunStatus(ran);

  if (finalRun.status === "completed") {
    if (Object.keys(analysis).length === 0) {
      throw new Error("No structured data found in the assistant's response");
    }
    return analysis as ResumeAnalysis;
  }

  throw new Error(`Run did not complete successfully. Final status: ${finalRun.status}`);
}