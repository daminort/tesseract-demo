export type UploadRequest = {
  file: File;
};

export type UploadResponse = {
  id: string,
  name: string,
  url: string,
};
