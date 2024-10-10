import { NextResponse } from 'next/server';
import { db } from '@/db';
import { resumes } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { analyzeResume } from '@/lib/openai';

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const resume = await db.select().from(resumes).where(eq(resumes.id, params.id)).get();

  if (!resume) {
    return NextResponse.json({ error: `Resume not found: ${params.id}` }, { status: 404 });
  }

  console.log("Resume status:", resume.status);

  if (resume.status === 'UPLOADED') {
    console.log("Analyzing resume...");
    await db.update(resumes)
      .set({ status: 'ANALYZING' })
      .where(eq(resumes.id, params.id))
      .run();

      try {
        const analysis = await analyzeResume(resume.filepath);
        await db.update(resumes)
      .set({ status: 'ANALYZED', analysis: JSON.stringify(analysis) })
        .where(eq(resumes.id, params.id))
        .run();

        resume.analysis = JSON.stringify(analysis);
        resume.status = 'ANALYZED';
      } catch (error) {
        console.error("Error analyzing resume:", error);
        await db.update(resumes)
          .set({ status: 'UPLOADED' })
          .where(eq(resumes.id, params.id))
          .run();
        return NextResponse.json({ error: 'Failed to analyze resume' }, { status: 500 });
      }
  }

  return NextResponse.json({
    id: resume.id,
    filename: resume.filename,
    status: resume.status,
    analysis: resume.analysis ? JSON.parse(resume.analysis) : null,
    pdfUrl: `/uploads/${resume.filename}`,
  });
}