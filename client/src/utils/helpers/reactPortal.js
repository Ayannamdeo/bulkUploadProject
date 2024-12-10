import { useLayoutEffect, useState } from "react";
import { createPortal } from "react-dom";

export function ReactPortal({ children, wrapperId = "default-react-modal" }) {
  const [wrapperElement, setWrapperElement] = useState(null);
  let systemCreated = false;

  useLayoutEffect(() => {
    let element = document.getElementById(wrapperId);
    if (!element) {
      element = createWrapperElement(wrapperId);
      systemCreated = true;
    }
    setWrapperElement(element);

    return () => {
      if (systemCreated && element.parentNode) {
        element.parentNode.removeChild(element);
      }
    };
  }, [wrapperId]);

  if (wrapperElement === null) return null;

  return createPortal(children, wrapperElement);
}

function createWrapperElement(wrapperId) {
  const wrapperElement = document.createElement("div");
  wrapperElement.setAttribute("id", wrapperId);
  document.body.appendChild(wrapperElement);
  return wrapperElement;
}
