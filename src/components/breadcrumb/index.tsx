import { useBreadcrumb } from "@refinedev/core";
import { Breadcrumb } from "antd";

interface BreadcrumbProps {
  pageTitle: string;
}

export const PageBreadcrumb = ({ pageTitle }: BreadcrumbProps) => {
  const { breadcrumbs } = useBreadcrumb();

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-white/90">
        {pageTitle}
      </h2>
      <Breadcrumb className="breadcrumb" items={breadcrumbs}></Breadcrumb>
    </div>
  );
};
