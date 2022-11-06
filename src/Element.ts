export default class Element {
  value: number;
  primary: boolean = false;
  secondary: boolean = false;
  tertiery: boolean = false;
  isDone: boolean = false;

  constructor(n: number) {
    this.value = n;
  }
}
