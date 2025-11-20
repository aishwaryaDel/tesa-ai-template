import { dbAdapter } from '../adapters/db.adapter';
import { UseCase, CreateUseCaseDTO, UpdateUseCaseDTO } from '../models/UseCase';

export class UseCaseRepository {
  async findAll(): Promise<UseCase[]> {
    const result = await dbAdapter.query<UseCase>(
      'SELECT * FROM use_cases ORDER BY created_at DESC'
    );
    return result;
  }

  async findById(id: string): Promise<UseCase | null> {
    const result = await dbAdapter.query<UseCase>(
      'SELECT * FROM use_cases WHERE id = $1',
      [id]
    );

    return result.length > 0 ? result[0] : null;
  }

  async create(useCaseData: CreateUseCaseDTO): Promise<UseCase> {
    const {
      title,
      short_description,
      full_description,
      department,
      status,
      owner_name,
      owner_email,
      business_impact,
      technology_stack,
      internal_links,
      tags,
      related_use_case_ids,
      application_url,
    } = useCaseData;

    const result = await dbAdapter.query<UseCase>(
      `INSERT INTO use_cases (
        title, short_description, full_description, department, status,
        owner_name, owner_email, business_impact, technology_stack,
        internal_links, tags, related_use_case_ids, application_url, created_at, updated_at
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, NOW(), NOW())
      RETURNING *`,
      [
        title,
        short_description,
        full_description,
        department,
        status,
        owner_name,
        owner_email,
        business_impact || null,
        JSON.stringify(technology_stack),
        JSON.stringify(internal_links),
        JSON.stringify(tags),
        JSON.stringify(related_use_case_ids || []),
        application_url || null,
      ]
    );

    return result[0];
  }

  async update(id: string, updates: UpdateUseCaseDTO): Promise<UseCase | null> {
    const fields: string[] = [];
    const values: any[] = [];
    let paramIndex = 1;

    if (updates.title !== undefined) {
      fields.push(`title = $${paramIndex++}`);
      values.push(updates.title);
    }
    if (updates.short_description !== undefined) {
      fields.push(`short_description = $${paramIndex++}`);
      values.push(updates.short_description);
    }
    if (updates.full_description !== undefined) {
      fields.push(`full_description = $${paramIndex++}`);
      values.push(updates.full_description);
    }
    if (updates.department !== undefined) {
      fields.push(`department = $${paramIndex++}`);
      values.push(updates.department);
    }
    if (updates.status !== undefined) {
      fields.push(`status = $${paramIndex++}`);
      values.push(updates.status);
    }
    if (updates.owner_name !== undefined) {
      fields.push(`owner_name = $${paramIndex++}`);
      values.push(updates.owner_name);
    }
    if (updates.owner_email !== undefined) {
      fields.push(`owner_email = $${paramIndex++}`);
      values.push(updates.owner_email);
    }
    if (updates.business_impact !== undefined) {
      fields.push(`business_impact = $${paramIndex++}`);
      values.push(updates.business_impact);
    }
    if (updates.technology_stack !== undefined) {
      fields.push(`technology_stack = $${paramIndex++}`);
      values.push(JSON.stringify(updates.technology_stack));
    }
    if (updates.internal_links !== undefined) {
      fields.push(`internal_links = $${paramIndex++}`);
      values.push(JSON.stringify(updates.internal_links));
    }
    if (updates.tags !== undefined) {
      fields.push(`tags = $${paramIndex++}`);
      values.push(JSON.stringify(updates.tags));
    }
    if (updates.related_use_case_ids !== undefined) {
      fields.push(`related_use_case_ids = $${paramIndex++}`);
      values.push(JSON.stringify(updates.related_use_case_ids));
    }
    if (updates.application_url !== undefined) {
      fields.push(`application_url = $${paramIndex++}`);
      values.push(updates.application_url);
    }

    if (fields.length === 0) {
      return await this.findById(id);
    }

    fields.push(`updated_at = NOW()`);
    values.push(id);

    const result = await dbAdapter.query<UseCase>(
      `UPDATE use_cases SET ${fields.join(', ')} WHERE id = $${paramIndex} RETURNING *`,
      values
    );

    return result.length > 0 ? result[0] : null;
  }

  async delete(id: string): Promise<boolean> {
    const result = await dbAdapter.query<{ id: string }>(
      'DELETE FROM use_cases WHERE id = $1 RETURNING id',
      [id]
    );

    return result.length > 0;
  }

  async exists(id: string): Promise<boolean> {
    const result = await dbAdapter.query<{ exists: boolean }>(
      'SELECT EXISTS(SELECT 1 FROM use_cases WHERE id = $1) as exists',
      [id]
    );

    return result[0]?.exists || false;
  }
}

export const useCaseRepository = new UseCaseRepository();
