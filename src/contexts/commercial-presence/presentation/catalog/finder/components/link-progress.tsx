"use client";

import { useLinkStatus } from "next/link";
import { ArrowIcon } from "../../../components/icons/arrow-icon";
import styles from "./link-progress.module.css";

export function LinkProgress({ label }: { readonly label: string }) {
  const { pending } = useLinkStatus();
  return (
    <span className={styles.progress} data-pending={pending}>
      <span className="sr-only" role="status">
        {pending ? label : ""}
      </span>
      <ArrowIcon diagonal={false} />
    </span>
  );
}
