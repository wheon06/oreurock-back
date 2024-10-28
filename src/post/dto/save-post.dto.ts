export class SavePostDto {
  placeId: number;
  thumbnail: string;
  climbType: '볼더링' | '리드' | '문보드' | '킬터보드';
  bestGradeId: string;
  authorId: number;
}
