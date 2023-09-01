export class Feedback {
  constructor(
    public title: string,
    public category: string,
    public description: string,
    public status?: string,
    public id?: string
  ) {}
}
