import { AppContext } from "./app-context";
import { InterSans } from "./fonts";

export const AppRoot = (props: React.PropsWithChildren) => {
  const { children } = props;
  return (
    <html lang="en">
      <body
        className={`${InterSans.variable} antialiased font-sans thin-scrollbar overflow-hidden`}
      >
        <AppContext>{children}</AppContext>
      </body>
    </html>
  );
};
