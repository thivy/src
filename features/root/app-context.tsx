"use client";

export const AppContext = (props: React.PropsWithChildren) => {
  const { children } = props;
  return <>{children}</>;
};
