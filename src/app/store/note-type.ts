export interface Notes {
  id: number;
  title: string;
  subtitle: string;
  content: string;
  updated: Number;
  firsttime: boolean;
}
export let model: Notes = {
  id: 0,
  title: 'New Note',
  subtitle: "No Additional text",
  content: '',
  updated: Date.now(),
  firsttime: true
}