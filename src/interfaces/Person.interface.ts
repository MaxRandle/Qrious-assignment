export default interface Person {
  id: number;
  name: string;
  children: Array<number>;
  gender: string;
  parents: Array<number>;
  spouseId?: number;
}
