export type RecipData = {
  id: number;
  hash: string;
  employeeId: number;
  creationDate: Date;
  status: number;
  image: string;
  rawVision?: {
    id: number;
    isReceipt: string;
    category: string;
    total: string;
    description: string;
    isTranslated: boolean;
    translatedVision?: {
      id: number;
      isReceipt: boolean;
      Category: number;
      status: number;
      total: number;
      description: string;
    };
  };
};
