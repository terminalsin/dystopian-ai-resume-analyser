import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import multer from 'multer';
import { db } from '@/db';
import { jobDescriptions } from '@/db/schema';

const upload = multer({
  storage: multer.diskStorage({
    destination: './uploads',
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
  })
});

export async function POST(req: Request) {
  const formData = await req.formData();
  const file = formData.get('file') as File;

  if (!file) {
    return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const filename = uuidv4() + path.extname(file.name);
  const filepath = path.join(process.cwd(), 'uploads', filename);

  await fs.writeFile(filepath, buffer);

  const [jobDescription] = await db.insert(jobDescriptions).values({
    id: uuidv4(),
    filename,
    filepath,
  }).returning();

  return NextResponse.json({ id: jobDescription.id }, { status: 201 });
}