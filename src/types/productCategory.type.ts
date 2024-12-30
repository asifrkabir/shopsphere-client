export interface IProductCategory {
  _id: string;
  name: string;
  logo?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ICreateProductCategory {
  name: string;
}

export interface IUpdateProductCategory {
  name: string;
  logo: string | null;
}

export interface IUpdateProductCategoryFormData {
  id: string;
  formData: FormData;
}
