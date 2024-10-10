import React, { useState } from 'react';
import { DEIAssumptions, Education, ResumeAnalysis, ResumeStringInput, SoftSkill, SoftSkillsAnalysis, WorkExperience } from '../types/resumeAnalysis';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Progress } from "@/components/ui/progress";
import { useUniversityRanking } from '../hooks/useUniversityRanking';
import { Star } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { StarRating } from "./StarRating"

interface ResumeAnalysisReportProps {
  analysis: ResumeFields & SoftSkillsAnalysis;
}

export const ResumeAnalysisReport: React.FC<ResumeAnalysisReportProps> = ({ analysis }) => {
  const [selectedExperience, setSelectedExperience] = useState<number | null>(null);

  return (
    <div className="resume-analysis-report space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">{analysis.name.ai_analysis}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4">
            <ContactInfo label="Email" value={analysis.contact_information?.email?.ai_analysis} />
            <ContactInfo label="Phone" value={analysis.contact_information?.phone?.ai_analysis} />
            <ContactInfo label="Address" value={analysis.contact_information?.address?.ai_analysis} />
          </div>
        </CardContent>
      </Card>

      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="education">
          <AccordionTrigger>Education</AccordionTrigger>
          <AccordionContent>
            {analysis.education?.map((edu, index) => (
              <EducationItem key={index} education={edu} />
            ))}
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="work_experience">
          <AccordionTrigger>Work Experience</AccordionTrigger>
          <AccordionContent>
            {analysis.work_experience?.map((exp, index) => (
              <WorkExperienceItem
                key={index}
                experience={exp}
                onClick={() => setSelectedExperience(index)}
              />
            ))}
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="skills">
          <AccordionTrigger>Skills</AccordionTrigger>
          <AccordionContent>
            <SkillsDisplay skills={analysis.skills} />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="soft_skills">
          <AccordionTrigger>Soft Skills Analysis</AccordionTrigger>
          <AccordionContent>
            <SoftSkillsDisplay softSkills={analysis.soft_skills} />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="dei_assumptions">
          <AccordionTrigger>DEI Assumptions</AccordionTrigger>
          <AccordionContent>
            <DEIAssumptions assumptions={analysis.DEI_assumptions} />
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <WorkExperienceModal
        experience={analysis.work_experience?.[selectedExperience!]}
        isOpen={selectedExperience !== null}
        onClose={() => setSelectedExperience(null)}
      />
    </div>
  );
};

const ContactInfo: React.FC<{ label: string; value?: string }> = ({ label, value }) => (
  <div>
    <p className="text-sm font-medium text-muted-foreground">{label}</p>
    <p className="text-sm font-semibold">{value ?? 'N/A'}</p>
  </div>
);

const EducationItem: React.FC<{ education: Education }> = ({ education }) => {
  const { universityData, loading, error } = useUniversityRanking(education?.institution?.ai_analysis);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="mb-2">
      <div className="flex justify-between items-center">
        <p className="font-medium">{education.degree.ai_analysis}</p>
        {education.scoring && (
          <StarRating score={education.scoring.score} reasoning={education.scoring.reasoning} />
        )}
      </div>
      <p className="text-sm">
        {education.institution.ai_analysis} ({education.year?.ai_analysis ?? 'N/A'})
        {!loading && !error && universityData && (
          <span className="ml-2 text-xs font-semibold">
            U.S. News Rank: {universityData.ranking.displayRank}
          </span>
        )}
        {!loading && error && <span className="ml-2 text-xs text-red-500">Ranking unavailable</span>}
      </p>
      {universityData && (
        <Button variant="outline" size="sm" className="mt-2" onClick={() => setIsModalOpen(true)}>
          More Details
        </Button>
      )}
      {universityData && (
        <UniversityDetailsModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          universityData={universityData}
        />
      )}
    </div>
  );
};

interface UniversityDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  universityData: any; // Replace 'any' with the actual type from your API
}

const UniversityDetailsModal: React.FC<UniversityDetailsModalProps> = ({ isOpen, onClose, universityData }) => (
  <Dialog open={isOpen} onOpenChange={onClose}>
    <DialogContent className="max-w-3xl">
      <DialogHeader>
        <DialogTitle>{universityData.institution.displayName}</DialogTitle>
      </DialogHeader>
      <div className="mt-4 grid grid-cols-2 gap-4">
        <DetailItem label="School Type" value={universityData.institution.schoolType} />
        <DetailItem label="State" value={universityData.institution.state} />
        <DetailItem label="City" value={universityData.institution.city} />
        <DetailItem label="Zip" value={universityData.institution.zip} />
        <DetailItem label="Region" value={universityData.institution.region} />
        <DetailItem label="Public" value={universityData.institution.isPublic ? 'Yes' : 'No'} />
        <DetailItem label="Institutional Control" value={universityData.institution.institutionalControl} />
        <DetailItem label="Ranking" value={universityData.ranking.displayRank} />
        <DetailItem label="ACT Average" value={universityData.searchData.actAvg.rawValue} />
        <DetailItem label="% Receiving Aid" value={`${universityData.searchData.percentReceivingAid.rawValue}%`} />
        <DetailItem label="Acceptance Rate" value={`${universityData.searchData.acceptanceRate.rawValue}%`} />
        <DetailItem label="Tuition" value={`$${universityData.searchData.tuition.rawValue}`} />
        <DetailItem label="Average HS GPA" value={universityData.searchData.hsGpaAvg.rawValue} />
        <DetailItem label="Engineering Rep Score" value={universityData.searchData.engineeringRepScore.rawValue} />
        <DetailItem label="Business Rep Score" value={universityData.searchData.businessRepScore.rawValue} />
        <DetailItem label="Enrollment" value={universityData.searchData.enrollment.rawValue} />
        <DetailItem label="SAT Average" value={universityData.searchData.satAvg.rawValue} />
        <DetailItem label="Cost After Aid" value={`$${universityData.searchData.costAfterAid.rawValue}`} />
        <DetailItem label="Test Averages" value={`${universityData.searchData.testAvgs.displayValue[0].value} - ${universityData.searchData.testAvgs.displayValue[1].value}`} />
      </div>
    </DialogContent>
  </Dialog>
);

const DetailItem: React.FC<{ label: string; value: string | number | undefined }> = ({ label, value }) => (
  <div>
    <p className="text-sm font-medium text-muted-foreground">{label}</p>
    <p className="text-sm font-semibold">{value ?? 'N/A'}</p>
  </div>
);

const WorkExperienceItem: React.FC<{ experience: WorkExperience; onClick: () => void }> = ({ experience, onClick }) => (
  <div className="mb-4 cursor-pointer hover:bg-muted p-2 rounded" onClick={onClick}>
    <div className="flex justify-between items-center">
      <h4 className="font-semibold">{experience.job_title?.ai_analysis} at {experience.company?.ai_analysis}</h4>
      {experience.scoring && (
        <StarRating score={experience.scoring.score} reasoning={experience.scoring.reasoning} />
      )}
    </div>
    <p className="text-sm text-muted-foreground">{experience.start_date?.ai_analysis ?? 'N/A'} - {experience.end_date?.ai_analysis ?? 'N/A'}</p>
  </div>
);

const SkillsDisplay: React.FC<{ skills?: ResumeSkill[] }> = ({ skills }) => (
  <div className="flex flex-wrap gap-2">
    {skills?.map((skill, index) => (
      <div key={index} className="flex items-center">
        <Badge variant="secondary" className="text-sm py-1 px-2 mr-1">
          {skill.verbatim_text}
        </Badge>
        {skill.trustworthiness && (
          <StarRating
            score={skill.trustworthiness.score}
            reasoning={skill.trustworthiness.reasoning}
          />
        )}
      </div>
    ))}
  </div>
);

const SoftSkillsDisplay: React.FC<{ softSkills?: SoftSkill[] }> = ({ softSkills }) => (
  <div className="space-y-4">
    {softSkills?.map((skill, index) => (
      <div key={index}>
        <div className="flex justify-between items-center mb-1">
          <h4 className="font-medium">{skill.skill_type.ai_analysis}</h4>
          <span className="text-sm font-semibold">{skill.score.ai_analysis}/10</span>
        </div>
        <Progress value={skill.score.ai_analysis * 10} className="h-2" />
        <p className="text-sm text-muted-foreground mt-1">{skill.description.ai_analysis}</p>
      </div>
    ))}
  </div>
);

const DEIAssumptions: React.FC<{ assumptions?: DEIAssumptions }> = ({ assumptions }) => (
  <div className="grid grid-cols-3 gap-4">
    <ContactInfo label="Ethnicity" value={assumptions?.ethnicity?.ai_analysis} />
    <ContactInfo label="Gender" value={assumptions?.gender?.ai_analysis} />
    <ContactInfo label="Age" value={assumptions?.age?.ai_analysis ? `${assumptions?.age?.ai_analysis} years old` : 'N/A'} />
    <ContactInfo label="Personality" value={assumptions?.personality?.ai_analysis} />
    <ContactInfo label="Sociability" value={assumptions?.sociability?.ai_analysis} />
    <ContactInfo label="Aggressiveness" value={assumptions?.aggressiveness?.ai_analysis} />
    <ContactInfo label="Ambition" value={assumptions?.ambition?.ai_analysis} />
    <ContactInfo label="Creativity" value={assumptions?.creativity?.ai_analysis} />
    <ContactInfo label="Agreeableness" value={assumptions?.agreeableness?.ai_analysis} />
    <ContactInfo label="Neuroticism" value={assumptions?.neuroticism?.ai_analysis} />
    <ContactInfo label="Openness" value={assumptions?.openness?.ai_analysis} />
    <ContactInfo label="Work Ethic" value={assumptions?.work_ethic?.ai_analysis} />
    <ContactInfo label="Intelligence" value={assumptions?.intelligence?.ai_analysis} />
  </div>
);

const WorkExperienceModal: React.FC<{ experience?: WorkExperience; isOpen: boolean; onClose: () => void }> = ({ experience, isOpen, onClose }) => (
  <Dialog open={isOpen} onOpenChange={onClose}>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>{experience?.job_title?.ai_analysis} at {experience?.company?.ai_analysis}</DialogTitle>
      </DialogHeader>
      <div className="mt-4">
        <div className="flex justify-between items-center mb-2">
          <p className="text-sm text-muted-foreground">{experience?.start_date?.ai_analysis ?? 'N/A'} - {experience?.end_date?.ai_analysis ?? 'N/A'}</p>
          {experience?.scoring && (
            <StarRating score={experience.scoring.score} reasoning={experience.scoring.reasoning} />
          )}
        </div>
        <ul className="list-disc list-inside mt-2">
          {experience?.responsibilities?.map((resp, respIndex) => (
            <li key={respIndex} className="text-sm mb-1">{resp.ai_analysis}</li>
          ))}
        </ul>
      </div>
    </DialogContent>
  </Dialog>
);