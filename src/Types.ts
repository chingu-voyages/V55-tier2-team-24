export interface Tags {
  tag: string;
  id: string;
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
}

export interface StoreContext {
  store: Store;
  filterResources: (query: string) => void;
  clearFilterResources: () => void;
}
