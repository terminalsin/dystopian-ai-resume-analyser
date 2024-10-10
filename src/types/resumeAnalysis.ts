type ResumeInput = {
  verbatim_text: string;
};
export type ResumeStringInput = ResumeInput & {
  ai_analysis: string;
}

export type ResumeNumberInput = ResumeInput & {
  ai_analysis: number;
}

export type ResumeScore = {
  score: number;
  reasoning: string;
}

export type ContactInformation = {
  email?: string;
  phone?: string;
  address?: string;
};

export type Education = {
  degree: ResumeStringInput;
  institution: ResumeStringInput;
  year?: ResumeNumberInput;
  scoring?: ResumeScore;
};

export type WorkExperience = {
  job_title: ResumeStringInput;
  company: ResumeStringInput;
  start_date: ResumeStringInput;
  end_date?: ResumeStringInput;
  responsibilities?: ResumeStringInput[];
  scoring?: ResumeScore;
};

export type ResumeSkill = ResumeStringInput & {
  trustworthiness?: ResumeScore;
}

export type ResumeFields = {
  name: ResumeStringInput;
  contact_information?: ContactInformation;
  education?: Education[];
  work_experience?: WorkExperience[];
  skills?: ResumeStringInput[];
};

export type SoftSkill = {
  skill_type: ResumeStringInput;
  score: ResumeNumberInput;
  description: ResumeStringInput;
};

export type DEIAssumptions = {
  ethnicity: ResumeStringInput;
  gender: ResumeStringInput;
  age: ResumeNumberInput;
  personality: ResumeStringInput;
  sociability: ResumeStringInput;
  aggressiveness: ResumeStringInput;
  ambition: ResumeStringInput;
  creativity: ResumeStringInput;
  agreeableness: ResumeStringInput;
  neuroticism: ResumeStringInput;
  openness: ResumeStringInput;
  work_ethic: ResumeStringInput;
  intelligence: ResumeStringInput;
  sexual_orientation: ResumeStringInput;
  religion: ResumeStringInput;
};

export type SoftSkillsAnalysis = {
  soft_skills: SoftSkill[];
  DEI_assumptions: DEIAssumptions;
};

export type ResumeAnalysis = {
    analysis: ResumeFields & SoftSkillsAnalysis;
    pdfUrl: string;
}