import type { IDmsPortalProps } from "./IDmsPortalProps";
import { createHashRouter, RouterProvider } from "react-router-dom";
import useSPService from "@src/hooks/SharePoint/useSPService";
import { useEffect, useState } from "react";
import VersionNumber from "./VersionNumber";
import AppLoading from "./AppLoading";
import SixPaneGrid from "./sixPaneGrid/sixPaneGrid";

export default function DmsPortal(
  props: IDmsPortalProps
): React.ReactElement<IDmsPortalProps> {
  const [isController, setIsController] = useState<boolean | undefined>(undefined);
  const sp = useSPService();
  

  useEffect(() => {
    const load = async () => {
      const isController = await sp.isUserController(props.context.pageContext.site.absoluteUrl);
      setIsController(isController);
    }
    load();
  }, []); // Added dependencies

  const router = createHashRouter([
    {
      path: "/",
      element: <SixPaneGrid 
        livestreamURL={props.livestreamURL}
        livestreamImageURL={props.livestreamImageURL}
      />,
      errorElement: <div>Error!</div>,
      children: [],
    },
  ]);

  return (
    <>
      {
        isController === undefined
          ? <AppLoading />
          : <RouterProvider router={router} />
      }
    <VersionNumber />
    </>
  );
}

