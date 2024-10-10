const extract_resume_fields = {
  "name": "extract_resume_fields",
  "description": "Function that collects and structures input parameters for all of the resume fields one would need to extract",
  "strict": true,
  "parameters": {
    "type": "object",
    "required": [
      "name",
      "contact_information",
      "education",
      "work_experience",
      "skills"
    ],
    "properties": {
      "name": {
        "type": "object",
        "properties": {
          "verbatim_text": { "type": "string", "description": "The exact name as it appears on the resume" },
          "ai_analysis": { "type": "string", "description": "AI's interpretation or standardization of the name" }
        },
        "required": ["verbatim_text", "ai_analysis"],
        "additionalProperties": false,
        "description": "Full name of the individual"
      },
      "contact_information": {
        "type": "object",
        "properties": {
          "email": { "type": "string", "description": "Email address of the individual" },
          "phone": { "type": "string", "description": "Phone number of the individual" },
          "address": { "type": "string", "description": "Physical address of the individual" }
        },
        "required": ["email", "phone", "address"],
        "additionalProperties": false,
        "description": "Contact details of the individual"
      },
      "education": {
        "type": "array",
        "description": "List of educational qualifications",
        "items": {
          "type": "object",
          "required": [
            "degree",
            "institution",
            "year",
            "scoring"
          ],
          "properties": {
            "degree": {
              "type": "object",
              "properties": {
                "verbatim_text": { "type": "string", "description": "The exact degree as it appears on the resume" },
                "ai_analysis": { "type": "string", "description": "AI's interpretation or standardization of the degree" }
              },
              "required": ["verbatim_text", "ai_analysis"],
              "additionalProperties": false,
              "description": "Degree obtained"
            },
            "institution": {
              "type": "object",
              "properties": {
                "verbatim_text": { "type": "string", "description": "The exact institution name as it appears on the resume" },
                "ai_analysis": { "type": "string", "description": "AI's interpretation or standardization of the institution name" }
              },
              "required": ["verbatim_text", "ai_analysis"],
              "additionalProperties": false,
              "description": "Name of the institution"
            },
            "year": {
              "type": "object",
              "properties": {
                "verbatim_text": { "type": "string", "description": "The exact year as it appears on the resume" },
                "ai_analysis": { "type": "number", "description": "AI's interpretation of the year as a number" }
              },
              "required": ["verbatim_text", "ai_analysis"],
              "additionalProperties": false,
              "description": "Year of graduation"
            },
            "scoring": {
              "type": "object",
              "properties": {
                "score": { "type": "number", "description": "The score of the education out of 10" },
                "reasoning": { "type": "string", "description": "The reasoning for the score" }
              },
              "required": ["score", "reasoning"],
              "additionalProperties": false,
              "description": "Scoring of the education and how impressive it is given the resume and common knowledge"
            }
          },
          "additionalProperties": false
        }
      },
      "work_experience": {
        "type": "array",
        "description": "List of work experiences",
        "items": {
          "type": "object",
          "required": [
            "job_title",
            "company",
            "start_date",
            "end_date",
            "responsibilities",
            "scoring"
          ],
          "properties": {
            "job_title": {
              "type": "object",
              "properties": {
                "verbatim_text": { "type": "string", "description": "The exact job title as it appears on the resume" },
                "ai_analysis": { "type": "string", "description": "AI's interpretation or standardization of the job title" }
              },
              "required": ["verbatim_text", "ai_analysis"],
              "additionalProperties": false,
              "description": "Title of the job held"
            },
            "company": {
              "type": "object",
              "properties": {
                "verbatim_text": { "type": "string", "description": "The exact company name as it appears on the resume" },
                "ai_analysis": { "type": "string", "description": "AI's interpretation or standardization of the company name" }
              },
              "required": ["verbatim_text", "ai_analysis"],
              "additionalProperties": false,
              "description": "Company name"
            },
            "start_date": {
              "type": "object",
              "properties": {
                "verbatim_text": { "type": "string", "description": "The exact start date as it appears on the resume" },
                "ai_analysis": { "type": "string", "description": "AI's interpretation or standardization of the start date" }
              },
              "required": ["verbatim_text", "ai_analysis"],
              "additionalProperties": false,
              "description": "Start date of employment"
            },
            "end_date": {
              "type": "object",
              "properties": {
                "verbatim_text": { "type": "string", "description": "The exact end date as it appears on the resume" },
                "ai_analysis": { "type": "string", "description": "AI's interpretation or standardization of the end date" }
              },
              "required": ["verbatim_text", "ai_analysis"],
              "additionalProperties": false,
              "description": "End date of employment"
            },
            "responsibilities": {
              "type": "array",
              "description": "List of job responsibilities",
              "items": {
                "type": "object",
                "properties": {
                  "verbatim_text": { "type": "string", "description": "The exact responsibility as it appears on the resume" },
                  "ai_analysis": { "type": "string", "description": "AI's interpretation or analysis of the responsibility" }
                },
                "required": ["verbatim_text", "ai_analysis"],
                "additionalProperties": false,
                "description": "Specific responsibility"
              }
            },
            "scoring": {
              "type": "object",
              "properties": {
                "score": { "type": "number", "description": "The score of the job experience out of 10" },
                "reasoning": { "type": "string", "description": "The reasoning for the score" }
              },
              "required": ["score", "reasoning"],
              "additionalProperties": false,
              "description": "Scoring of the job experience and how impressive it is given the resume and common knowledge"
            }
          },
          "additionalProperties": false
        }
      },
      "skills": {
        "type": "array",
        "description": "List of skills relevant to the job",
        "items": {
          "type": "object",
          "properties": {
            "verbatim_text": { "type": "string", "description": "The exact skill as it appears on the resume" },
            "ai_analysis": { "type": "string", "description": "AI's interpretation or categorization of the skill" },
            "trustworthiness": {
              "type": "object",
              "properties": {
                "score": { "type": "number", "description": "The score of the skill out of 10" },
                "reasoning": { "type": "string", "description": "The reasoning for the score" }
              },
              "required": ["score", "reasoning"],
              "additionalProperties": false,
              "description": "Scoring of how likely this skill is to be true"
            }
          },
          "required": ["verbatim_text", "ai_analysis", "trustworthiness"],
          "additionalProperties": false,
          "description": "Specific skill"
        }
      }
    },
    "additionalProperties": false
  }
};

export default extract_resume_fields;