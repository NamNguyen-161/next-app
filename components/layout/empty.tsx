import * as React from "react";
import { LayoutProps } from "../../models";

export function EmptyLayout(props: LayoutProps) {
  return <>{props.children}</>;
}
