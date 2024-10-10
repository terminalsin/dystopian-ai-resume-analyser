import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse/sync';

export interface UniversityData {
  institution: {
    displayName: string;
    schoolType: string;
    aliasNames: string;
    state: string;
    city: string;
    zip: string;
    region: string;
    isPublic: boolean;
    institutionalControl: string;
    primaryPhotoCardThumb: string;
  };
  ranking: {
    displayRank: string;
    sortRank: string;
    isTied: boolean;
  };
  searchData: {
    actAvg: { rawValue: string };
    percentReceivingAid: { rawValue: string };
    acceptanceRate: { rawValue: string };
    tuition: { rawValue: string };
    hsGpaAvg: { rawValue: string };
    engineeringRepScore: { rawValue: string };
    parentRank: { rawValue: string };
    enrollment: { rawValue: string };
    businessRepScore: { rawValue: string };
    satAvg: { rawValue: string };
    costAfterAid: { rawValue: string };
    testAvgs: {
      displayValue: [
        { value: string },
        { value: string }
      ];
    };
  };
}

let universities: UniversityData[] | null = null;

export function loadUniversities(): UniversityData[] {
  if (universities) return universities;

  const filePath = path.join(process.cwd(), 'src', 'data', 'data.csv');
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  
  const records = parse(fileContent, {
    columns: true,
    skip_empty_lines: true
  });

  universities = records.map((record: any) => ({
    institution: {
      displayName: record['institution.displayName'],
      schoolType: record['institution.schoolType'],
      aliasNames: record['institution.aliasNames'],
      state: record['institution.state'],
      city: record['institution.city'],
      zip: record['institution.zip'],
      region: record['institution.region'],
      isPublic: record['institution.isPublic'] === 'true',
      institutionalControl: record['institution.institutionalControl'],
      primaryPhotoCardThumb: record['institution.primaryPhotoCardThumb'],
    },
    ranking: {
      displayRank: record['ranking.displayRank'],
      sortRank: record['ranking.sortRank'],
      isTied: record['ranking.isTied'] === 'true',
    },
    searchData: {
      actAvg: { rawValue: record['searchData.actAvg.rawValue'] },
      percentReceivingAid: { rawValue: record['searchData.percentReceivingAid.rawValue'] },
      acceptanceRate: { rawValue: record['searchData.acceptanceRate.rawValue'] },
      tuition: { rawValue: record['searchData.tuition.rawValue'] },
      hsGpaAvg: { rawValue: record['searchData.hsGpaAvg.rawValue'] },
      engineeringRepScore: { rawValue: record['searchData.engineeringRepScore.rawValue'] },
      parentRank: { rawValue: record['searchData.parentRank.rawValue'] },
      enrollment: { rawValue: record['searchData.enrollment.rawValue'] },
      businessRepScore: { rawValue: record['searchData.businessRepScore.rawValue'] },
      satAvg: { rawValue: record['searchData.satAvg.rawValue'] },
      costAfterAid: { rawValue: record['searchData.costAfterAid.rawValue'] },
      testAvgs: {
        displayValue: [
          { value: record['searchData.testAvgs.displayValue.0.value'] },
          { value: record['searchData.testAvgs.displayValue.1.value'] },
        ],
      },
    },
  }));

  return universities;
}

export function findUniversity(name: string): UniversityData | undefined {
  const normalizedName = name.toLowerCase();
  return loadUniversities().find(uni => 
    uni.institution.displayName.toLowerCase().includes(normalizedName) ||
    uni.institution.aliasNames.toLowerCase().includes(normalizedName)
  );
}