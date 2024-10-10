import { NextResponse } from 'next/server';
import { db } from '@/db';
import { resumes, jobDescriptions } from '@/db/schema';
import { desc } from 'drizzle-orm';
import { promises as fs } from 'fs';

export async function GET() {
  const latestResume = await db.select().from(resumes).orderBy(desc(resumes.createdAt)).limit(1).get();
  const latestJobDescription = await db.select().from(jobDescriptions).orderBy(desc(jobDescriptions.createdAt)).limit(1).get();

  if (!latestResume || !latestJobDescription) {
    return NextResponse.json({ error: 'Resume or job description not found' }, { status: 404 });
  }

  const resumeContent = await fs.readFile(latestResume.filepath, 'utf-8');
  const jobDescriptionContent = await fs.readFile(latestJobDescription.filepath, 'utf-8');

  //const matchingScore = await calculateMatchingScore(resumeContent, jobDescriptionContent);

  return NextResponse.json({ score: 100 });
}