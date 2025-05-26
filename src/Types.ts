export interface Tags {
  tag: string;
  id: string;
  selected: boolean;
}

export interface Resources {
  author: string;
  name: string;
  appliedTags: string[];
  url: string;
  createdAt: string;
  id: string;
}

export interface Store {
  filteredResources: Resources[];
  tags: Tags[];
  resources: Resources[];
  lastUpdate: string;
  query: string;
}

export interface StoreContext {
  store: Store;
  clearFilterResources: () => void;
  handleClickedTags: (Tags: Tags) => void;
  searchResources: (query: string) => void;
}
