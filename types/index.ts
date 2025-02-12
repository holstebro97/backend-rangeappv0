export type ProgressEntry = {
  id: string;
  exerciseIndex: number;
  date: string;
  tension: "low" | "medium" | "high";
  reps: number;
  weight: number;
}

export type Exercise = {
  id: number;
  exercises: [
    {
      name: string;
      description: string;
      function: string;
      range: string;
      youtubeLink: string;
      youtubeTitle: string;
      typeOfMovement: "Compound Exercise" | "Isolation Exercise";
    },
    {
      name: string;
      description: string;
      function: string;
      range: string;
      youtubeLink: string;
      youtubeTitle: string;
      typeOfMovement: "Compound Exercise" | "Isolation Exercise";
    }
  ];
  reappearInterval: number;
  completed: boolean;
  completionTime?: number;
  reappearTime?: number;
  progress: ProgressEntry[];
} 