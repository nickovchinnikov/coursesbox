export type Data<A = Record<string, unknown>> = {
  id: number;
  attributes: A;
};

export type ImageFormats = {
  name: string;
  url: string;
  width: number;
  height: number;
};

export type Image = Data<
  ImageFormats & {
    formats: {
      thumbnail: ImageFormats;
      large: ImageFormats;
      medium: ImageFormats;
      small: ImageFormats;
    };
  }
>;

export type Course = Data<{
  header: string;
  subtitle: string;
  url: string;
  description: string;
  publishedAt: string;
  cover: {
    data: Image;
  };
  images: {
    data: Image[];
  };
}>;

export type Error = {
  status: number;
  name: string;
  message: string;
  details: any;
};

export type Meta = {
  pagination?: {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
  };
};

export type Response<D> = {
  data: D;
  error?: Error;
  meta: Meta;
};
