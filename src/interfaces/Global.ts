import type { JSX, ReactElement, ReactNode } from "react";

export interface Modal {
  id?: string | number;
  close?: () => void;
}

type TransactionType = "debit" | "credit" | "transfer";
type TransactionStatus = "successful" | "failed";

export interface RowDataProps {
  id: number;
  sender: string;
  beneficiary: string;
  bank: string;
  amount: number;
  transactionType: TransactionType;
  status: TransactionStatus;
  createdAt: string;
}

export interface NavbarProps {
  title: string;
  subtitle: string;
}

export interface DashboardLayoutProps {
  children: ReactNode;
}

export interface Layout {
  children: ReactNode;
  loginBtn: boolean;
  terms: boolean;
}
export interface AccountOption {
  icon: any;
  title: string;
  description: string;
}
export interface AddProps {
  setActiveTab: any;
}

export interface IFormInputProps {
  label?: string;
  placeholder?: string;
  id: string;
  name?: string;
  shortP?: string;
  error?: string | undefined;
  defaultValue?: string | number;
  type?: React.HTMLInputTypeAttribute | "textarea" | "select";
  inputClassName?: string;
  className?: string;
  onChange?: (e: any) => void;
  onBlur?: (e: any) => void;
  icon?: JSX.Element | string;
  required?: boolean;
  disabled?: boolean;
  selectOptions?: any[];
  valuePropertyName?: string;
  keyPropertyName?: string;
  telValue?: string;
  itemPropertyName?: string;
  searchFunc?: boolean;
  defaultCountry?: string;
  onlyCountries?: string[];
}

export interface Route {
  path: string;
  name: string;
  element: ReactElement;
}
export interface OTPProps {
  page: string;
  inputCount: number;
  title: string;
  paragraph: ReactElement;
  resend?: boolean;
}

export interface IColData {
  selector?: (row: any) => string;
  cell?: (row: any) => ReactNode;
  [key: string]: string | number | any;
}

export interface ActionProps {
  id: number;
  row: RowDataProps;
  setIsActionMenuOpen?: any;
}

export interface SidebarDataProps {
  id: string;
  icon: any;
  title: string;
  url: string;
}
export type WearItem = {
  id: string;
  name: string;
  brand: string;
  price: number;
  rating: number;
  gender: "MALE" | "FEMALE" | "UNISEX";
  reviews: number;
  categoryId: number;
  description: string;
  sizes: number[];
  colors: string[];
  mainImage: string;
  thumbnails: string[];
};

export interface ImagePreviewerProps {
  images: string[];
  setImages: any;
}
export type CreateOrderProps = {
  userId: number;
  paymentReference: string;
  orders: {
    vendorId: number;
    totalAmount: number;
    items: {
      productId: number;
      quantity: number;
      price: number;
    }[];
  }[];
};

export type ProductProps = {
  id: number;
  name: string;
  price: number;
  rating: number;
  gender: string;
  description: string;
  sizes: string[];
  colors: string[];
  mainImage: string;
  thumbnails: string[];
  stock: number;
  material: string;
  subCategoryItemId: number;
  vendorId: number;
  createdAt: string;
  updatedAt: string;
};

export type Item = {
  id: number;
  orderId: number;
  productId: number;
  quantity: number;
  price: number;
};

export type OrderProps = {
  id: number;
  userId: number;
  vendorId: number;
  status: string;
  totalAmount: number;
  paymentReference: string;
  createdAt: string;
  updatedAt: string;
  items: Item[];
};
