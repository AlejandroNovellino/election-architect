export interface Dependency {
  id: number;
  name: string;
  type: string;
  fatherDependency: string | null;
  description: string;
}

export interface DependencyType {
  id: number;
  name: string;
}
