import type {
  CatalogNavigationGroup,
  MarketingCopy,
} from "../../../../contracts";
import styles from "./finder-categories.module.css";

interface FinderCategoriesProps {
  readonly groups: readonly CatalogNavigationGroup[];
  readonly selected?: string;
  readonly copy: MarketingCopy["finder"];
  readonly onSelect: (id?: string) => void;
}

export function FinderCategories({
  groups,
  selected,
  copy,
  onSelect,
}: FinderCategoriesProps) {
  return (
    <div className={styles.filters} role="group" aria-label={copy.categories}>
      <button type="button" aria-pressed={!selected} onClick={() => onSelect()}>
        {copy.all}
      </button>
      {groups.map((group) => (
        <button
          key={group.id}
          type="button"
          aria-pressed={selected === group.id}
          onClick={() => onSelect(group.id)}
        >
          {group.name}
        </button>
      ))}
    </div>
  );
}
