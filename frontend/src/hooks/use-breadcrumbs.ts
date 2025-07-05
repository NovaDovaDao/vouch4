import { createContext, useContext } from "react";

type Breadcrumb = {
  label: string;
  path: string;
};
export interface BreadcrumbsState {
  breadcrumbs: Breadcrumb[];
}

export const BreadcrumbsContext = createContext<BreadcrumbsState | null>(null);

export const useBreadcrumbs = () => {
  const context = useContext(BreadcrumbsContext);
  if (!context) {
    throw new Error(
      "useBreadcrumbs must be used within an BreadcrumbsProvider"
    );
  }
  return context;
};
