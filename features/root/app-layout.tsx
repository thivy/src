import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/features/app-sidebar/app-sidebar";

export const SimpleAppLayout = (props: React.PropsWithChildren) => {
  const { children } = props;
  return <>{children}</>;
};

export const SidebarAppLayout = (props: React.PropsWithChildren) => {
  const { children } = props;
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <AppPageHeader />
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
};

export const AppPageHeader = () => {
  return (
    <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear">
      <div className="flex items-center gap-2 px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mr-2 data-[orientation=vertical]:h-4"
        />
        <h1 className="text-lg font-thin">Azure Cwwhat</h1>{" "}
        <h1 className="text-lg font-light">Azure Chat</h1>
      </div>
    </header>
  );
};
