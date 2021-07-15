export interface IDatabaseRepository<Entity> {
  getAll(filters?: Partial<Entity>): Promise<Entity[]>;
  getOne(id: string): Promise<Entity>;
  create(data: Entity): Promise<Entity>;
  update(id: string, data: Entity): Promise<Entity>;
  delete(id: string): Promise<Entity>;
}
