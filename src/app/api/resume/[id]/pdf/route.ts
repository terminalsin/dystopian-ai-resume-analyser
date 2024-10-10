import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { resumeService } from '@/services/resumeService'
import { db } from '@/db';
import { resumes } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {

  try {
    const resume = await db.select().from(resumes).where(eq(resumes.id, params.id)).get();

    
    if (!resume) {
      console.error(`Resume not found: ${params.id}`);
      return NextResponse.json({ error: `Resume not found: ${params.id}` }, { status: 404 });
    }

    if (!resume.filepath) {
      console.error(`PDF not found: ${resume.filepath}`);
      return new NextResponse('PDF not found', { status: 404 });
    }

    const pdfPath = resume.filepath  

    if (!fs.existsSync(pdfPath)) {
      console.error(`PDF file not found: ${pdfPath}`);
      return new NextResponse('PDF file not found', { status: 404 });
    }

    const pdfBuffer = await fs.readFileSync(pdfPath);

    return new NextResponse(pdfBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `inline; filename="${path.basename(resume.filepath)}"`,
      },
    });
  } catch (error) {
    console.error('Error fetching PDF:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}