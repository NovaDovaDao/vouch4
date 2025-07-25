import {
  BreadcrumbsContext,
  type BreadcrumbsState,
} from "@/features/breadcrumbs/use-breadcrumbs";
import { useEffect, useState, type PropsWithChildren } from "react";
import { useLocation } from "react-router-dom";

export const BreadcrumbsProvider = (props: PropsWithChildren) => {
  const [breadcrumbs, setBreadcrumbs] = useState<
    BreadcrumbsState["breadcrumbs"]
  >([]);

  const updateBreadcrumbs = (location: ReturnType<typeof useLocation>) => {
    let label = "";
    switch (location.pathname) {
      case "/":
        label = "Dashboard";
        break;
      case "/members":
        label = "Members";
        break;
      case "/staff":
        label = "Staff";
        break;
      case "/classes":
        label = "Classes";
        break;
      case "/reports/contracts":
        label = "Contracts";
        break;
      case "/reports/memberships":
        label = "Memberships";
        break;
    }
    setBreadcrumbs([{ label, path: location.pathname }]);
  };

  useEffect(() => {
    return () => {
      setBreadcrumbs([]);
    };
  }, []);

  const location = useLocation();
  useEffect(() => {
    updateBreadcrumbs(location);
  }, [location]);

  return (
    <BreadcrumbsContext.Provider
      value={{
        breadcrumbs,
      }}
    >
      {props.children}
    </BreadcrumbsContext.Provider>
  );
};
