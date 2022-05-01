import Link from "next/link";
import * as React from "react";
import { LayoutProps } from "../../models";

export function AdminLayout(props: LayoutProps) {
  return (
    <div>
      <h1>Admin Layout</h1>
      <div>Sidebar</div>
      <Link href="/">
        <a>Home</a>
      </Link>
      <Link href="/about">
        <a>About</a>
      </Link>

      <div>{props.children}</div>
    </div>
  );
}
