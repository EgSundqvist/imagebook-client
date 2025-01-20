export interface ImageData {
  ID: number;
  CreatedAt: string;
  UpdatedAt: string;
  DeletedAt: string | null;
  URL: string;
  Description: string;
  UserID: number | null;
  PresignedURL: string;
}
