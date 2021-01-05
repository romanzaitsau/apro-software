export interface GetResp {
  id: number;
  recommendations: RecResp[];
  user_id: number;
}

export interface RecResp {
  id: number;
  product: {
    code: string
    id: number
    src?: string
  };
  score: number;
  status: number;
}

export interface Post {
  id: number;
  recommended_products: RecPost[];

}
export interface RecPost {
  id: number;
  status: number;
}
