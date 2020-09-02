import { SoftDeleteModel } from 'nestjs-objection';

export class ObjectionModel extends SoftDeleteModel {
  static async getMany<T>(input) {
    const model = this as typeof ObjectionModel;
    const { limit, offset, orderBy, filters } = input || {};
    const query = model
      .query()
      .skipUndefined()
      .limit(limit)
      .offset(offset);

    if (orderBy) {
      orderBy.forEach(item => {
        query.orderBy(item.column, item.order);
      });
    }

    if (filters) {
      filters.forEach(filter => {
        if (filter.operation === 'like' || filter.operation === 'ilike') {
          const raw = `"${filter.column}"::text ${filter.operation} ?`;
          filter.expression = `%${filter.expression}%`;
          query.whereRaw(raw, filter.expression);
        } else {
          query.where(filter.column, filter.operation, filter.expression);
        }
      });
    }

    const nodes = await query;
    const totalCount = await model.query().resultSize();
    return {
      nodes: (nodes as unknown) as T[],
      totalCount,
    };
  }

  $beforeInsert(): void {
    this['createdAt'] = new Date().toISOString();
  }

  $beforeUpdate(): void {
    if (this.hasOwnProperty('updatedAt')) {
      this['updatedAt'] = new Date().toISOString();
    }
  }
}
