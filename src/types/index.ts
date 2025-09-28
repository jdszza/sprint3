export type Item = { 
  id: number; 
  title: string; 
  status: string; 
  description?: string; 
  location?: string; 
  priority?: string; 
};

export type HistoryEntry = { 
  id: number; 
  itemId: number; 
  event: string; 
  at: string; 
  description?: string; 
};
