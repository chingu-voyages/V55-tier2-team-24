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
  filteredResults: Resources[];
  tags: Tags[];
  resources: Resources[];
  lastUpdate: string;
}

export interface StoreContext {
  store: Store;
}
