const extract_soft_skills = {
  "name": "extract_soft_skills",
  "description": `From the resume, extract assumed information, such as assumed intelligence, sociability, etc scores, 
  all that would be soft skills. Include skills that have low scores, but are still important. If a candidate is likely
  to be aggressive or hard to work with, include that in the description.`,
  "strict": true,
  "parameters": {
    "type": "object",
    "required": [
      "soft_skills",
      "DEI_assumptions"
    ],
    "properties": {
      "soft_skills": {
        "type": "array",
        "description": "Array of extracted soft skills with their respective scores and descriptions",
        "items": {
          "type": "object",
          "properties": {
            "skill_type": {
              "type": "object",
              "properties": {
                "verbatim_text": { "type": "string", "description": "The exact soft skill type as inferred from the resume" },
                "ai_analysis": { "type": "string", "description": "AI's categorization or standardization of the soft skill type" }
              },
              "required": ["verbatim_text", "ai_analysis"],
              "additionalProperties": false,
              "description": "Type of soft skill"
            },
            "score": {
              "type": "object",
              "properties": {
                "verbatim_text": { "type": "string", "description": "The exact score or rating as inferred from the resume" },
                "ai_analysis": { "type": "number", "description": "AI's numerical assessment of the skill level (e.g., on a scale of 1-10)" }
              },
              "required": ["verbatim_text", "ai_analysis"],
              "additionalProperties": false,
              "description": "Estimated score for the soft skill"
            },
            "description": {
              "type": "object",
              "properties": {
                "verbatim_text": { "type": "string", "description": "The exact description or evidence of the soft skill from the resume" },
                "ai_analysis": { "type": "string", "description": "AI's interpretation or elaboration on the soft skill" }
              },
              "required": ["verbatim_text", "ai_analysis"],
              "additionalProperties": false,
              "description": "Description or justification for the soft skill assessment"
            }
          },
          "required": [
            "skill_type",
            "score",
            "description"
          ],
          "additionalProperties": false
        }
      },
      "DEI_assumptions": {
        "type": "object",
        "properties": {
          "ethnicity": {
            "type": "object",
            "properties": {
              "verbatim_text": { "type": "string", "description": "Any direct mentions or indications of ethnicity from the resume" },
              "ai_analysis": { "type": "string", "description": "AI's assumption or interpretation of the candidate's ethnicity" }
            },
            "required": ["verbatim_text", "ai_analysis"],
            "additionalProperties": false,
            "description": "Assumed ethnicity based on resume content"
          },
          "gender": {
            "type": "object",
            "properties": {
              "verbatim_text": { "type": "string", "description": "Any direct mentions or indications of gender from the resume" },
              "ai_analysis": { "type": "string", "description": "AI's assumption or interpretation of the candidate's gender" }
            },
            "required": ["verbatim_text", "ai_analysis"],
            "additionalProperties": false,
            "description": "Assumed gender based on resume content"
          },
          "age": {
            "type": "object",
            "properties": {
              "verbatim_text": { "type": "string", "description": "Any direct mentions or indications of age from the resume" },
              "ai_analysis": { "type": "number", "description": "AI's estimation of the candidate's age in years" }
            },
            "required": ["verbatim_text", "ai_analysis"],
            "additionalProperties": false,
            "description": "Assumed age based on education and experience timeline"
          },
          "personality": {
            "type": "object",
            "properties": {
              "verbatim_text": { "type": "string", "description": "Any direct mentions or indications of personality from the resume" },
              "ai_analysis": { "type": "string", "description": "AI's assumption or interpretation of the candidate's personality" }
            },
            "required": ["verbatim_text", "ai_analysis"],
            "additionalProperties": false,
            "description": "Assumed personality based on resume content"
          },
          "sociability": {
            "type": "object",
            "properties": {
              "verbatim_text": { "type": "string", "description": "Any direct mentions or indications of sociability from the resume" },
              "ai_analysis": { "type": "string", "description": "AI's assumption or interpretation of the candidate's sociability" }
            },
            "required": ["verbatim_text", "ai_analysis"],
            "additionalProperties": false,
            "description": "Assumed sociability based on resume content"
          },
          "aggressiveness": {
            "type": "object",
            "properties": {
              "verbatim_text": { "type": "string", "description": "Any direct mentions or indications of aggressiveness from the resume" },
              "ai_analysis": { "type": "string", "description": "AI's assumption or interpretation of the candidate's aggressiveness" }
            },
            "required": ["verbatim_text", "ai_analysis"],
            "additionalProperties": false,
            "description": "Assumed aggressiveness based on resume content"
          },
          "ambition": {
            "type": "object",
            "properties": {
              "verbatim_text": { "type": "string", "description": "Any direct mentions or indications of ambition from the resume" },
              "ai_analysis": { "type": "string", "description": "AI's assumption or interpretation of the candidate's ambition" }
            },
            "required": ["verbatim_text", "ai_analysis"],
            "additionalProperties": false,
            "description": "Assumed ambition based on resume content"
          },
          "creativity": {
            "type": "object",
            "properties": {
              "verbatim_text": { "type": "string", "description": "Any direct mentions or indications of creativity from the resume" },
              "ai_analysis": { "type": "string", "description": "AI's assumption or interpretation of the candidate's creativity" }
            },
            "required": ["verbatim_text", "ai_analysis"],
            "additionalProperties": false,
            "description": "Assumed creativity based on resume content"
          },
          "agreeableness": {
            "type": "object",
            "properties": {
              "verbatim_text": { "type": "string", "description": "Any direct mentions or indications of agreeableness from the resume" },
              "ai_analysis": { "type": "string", "description": "AI's assumption or interpretation of the candidate's agreeableness" }
            },
            "required": ["verbatim_text", "ai_analysis"],
            "additionalProperties": false,
            "description": "Assumed agreeableness based on resume content"
          },
          "neuroticism": {
            "type": "object",
            "properties": {
              "verbatim_text": { "type": "string", "description": "Any direct mentions or indications of neuroticism from the resume" },
              "ai_analysis": { "type": "string", "description": "AI's assumption or interpretation of the candidate's neuroticism" }
            },
            "required": ["verbatim_text", "ai_analysis"],
            "additionalProperties": false,
            "description": "Assumed neuroticism based on resume content"
          },
          "openness": {
            "type": "object",
            "properties": {
              "verbatim_text": { "type": "string", "description": "Any direct mentions or indications of openness from the resume" },
              "ai_analysis": { "type": "string", "description": "AI's assumption or interpretation of the candidate's openness" }
            },
            "required": ["verbatim_text", "ai_analysis"],
            "additionalProperties": false,
            "description": "Assumed openness based on resume content"
          },
          "work_ethic": {
            "type": "object",
            "properties": {
              "verbatim_text": { "type": "string", "description": "Any direct mentions or indications of work ethic from the resume" },
              "ai_analysis": { "type": "string", "description": "AI's assumption or interpretation of the candidate's work ethic" }
            },
            "required": ["verbatim_text", "ai_analysis"],
            "additionalProperties": false,
            "description": "Assumed work ethic based on resume content"
          },
          "intelligence": {
            "type": "object",
            "properties": {
              "verbatim_text": { "type": "string", "description": "Any direct mentions or indications of intelligence from the resume" },
              "ai_analysis": { "type": "string", "description": "AI's assumption or interpretation of the candidate's intelligence" }
            },
            "required": ["verbatim_text", "ai_analysis"],
            "additionalProperties": false,
            "description": "Assumed intelligence based on resume content"
          },
          "sexual_orientation": {
            "type": "object",
            "properties": {
              "verbatim_text": { "type": "string", "description": "Any direct mentions or indications of sexual orientation from the resume" },
              "ai_analysis": { "type": "string", "description": "AI's assumption or interpretation of the candidate's sexual orientation" }
            },
            "required": ["verbatim_text", "ai_analysis"],
            "additionalProperties": false,
            "description": "Assumed sexual orientation based on resume content"
          },
          "religion": {
            "type": "object",
            "properties": {
              "verbatim_text": { "type": "string", "description": "Any direct mentions or indications of religion from the resume" },
              "ai_analysis": { "type": "string", "description": "AI's assumption or interpretation of the candidate's religion" }
            },
            "required": ["verbatim_text", "ai_analysis"],
            "additionalProperties": false,
            "description": "Assumed religion based on resume content"
          }
        },
        "required": [
          "ethnicity",
          "gender",
          "age",
          "personality",
          "sociability",
          "aggressiveness",
          "ambition",
          "creativity",
          "agreeableness",
          "neuroticism",
          "openness",
          "work_ethic",
          "intelligence",
          "sexual_orientation",
          "religion"
        ],
        "additionalProperties": false,
        "description": "Diversity, Equity, and Inclusion assumptions based on resume content"
      }
    },
    "additionalProperties": false
  }
};

export default extract_soft_skills;