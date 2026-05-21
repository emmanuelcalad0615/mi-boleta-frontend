import { datosGovClient } from '../http/datosGovClient';
import { LOTTERY_DATASET_ID } from '../config/datosGovEnv';
import type { LotteryResultRepository } from '@/domain/repositories/LotteryResultRepository';
import type { LotteryResult } from '@/domain/entities/LotteryResult';
import type { PaginatedResult } from '@/domain/value-objects/Pagination';

type RawRow = Record<string, unknown>;

function slugify(value: string): string {
  return value.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
}

function mapRow(raw: RawRow): LotteryResult | null {
  const numero = typeof raw['numero_billete_ganador'] === 'string' ? raw['numero_billete_ganador'].trim() : null;
  const fechaRaw = typeof raw['fecha_del_sorteo'] === 'string' ? raw['fecha_del_sorteo'] : null;

  if (!numero || !fechaRaw) return null;

  const fecha = new Date(fechaRaw);
  if (isNaN(fecha.getTime())) return null;

  const loteria = typeof raw['loter_a'] === 'string' ? raw['loter_a'].trim() : 'Desconocida';
  const serie = typeof raw['numero_serie_ganadora'] === 'string' ? raw['numero_serie_ganadora'].trim() : null;
  const numeroDeSorteo = typeof raw['n_mero_del_sorteo'] === 'string' ? raw['n_mero_del_sorteo'].trim() : null;
  const tipoDePremio = typeof raw['tipo_de_premio'] === 'string' ? raw['tipo_de_premio'].trim() : null;

  const id = slugify(`${loteria}-${fechaRaw}-${numero}`);

  return { id, loteria, fecha, numero, serie, numeroDeSorteo, tipoDePremio, raw };
}

export class DatosGovLotteryResultRepository implements LotteryResultRepository {
  async listLatest({
    page = 1,
    pageSize = 12,
    loteria,
  }: {
    page?: number;
    pageSize?: number;
    loteria?: string;
  }): Promise<PaginatedResult<LotteryResult>> {
    const whereClause = loteria ? `loter_a='${loteria}'` : undefined;

    const dataParams: Record<string, string | number> = {
      $limit: pageSize,
      $offset: (page - 1) * pageSize,
      $order: 'fecha_del_sorteo DESC',
    };
    const countParams: Record<string, string> = { $select: 'count(*)' };
    if (whereClause) {
      dataParams['$where'] = whereClause;
      countParams['$where'] = whereClause;
    }

    const [dataRes, countRes] = await Promise.all([
      datosGovClient.get<RawRow[]>(`/${LOTTERY_DATASET_ID}.json`, { params: dataParams }),
      datosGovClient.get<Array<{ count: string }>>(`/${LOTTERY_DATASET_ID}.json`, { params: countParams }),
    ]);

    const items = (dataRes.data ?? []).map(mapRow).filter((r): r is LotteryResult => r !== null);
    const total = parseInt(countRes.data?.[0]?.count ?? '0', 10);

    return {
      items,
      meta: {
        total,
        page,
        pageSize,
        totalPages: Math.max(1, Math.ceil(total / pageSize)),
      },
    };
  }

  async findByDateAndNumber({
    fecha,
    numero,
    loteria,
  }: {
    fecha: Date;
    numero: string;
    loteria?: string;
  }): Promise<LotteryResult | null> {
    const dateStr = fecha.toISOString().split('T')[0];
    const conditions: string[] = [
      `fecha_del_sorteo>='${dateStr}T00:00:00.000'`,
      `fecha_del_sorteo<='${dateStr}T23:59:59.999'`,
    ];
    if (loteria) {
      conditions.push(`loter_a='${loteria}'`);
    }

    const params: Record<string, string | number> = {
      $limit: 50,
      $where: conditions.join(' AND '),
    };

    const { data } = await datosGovClient.get<RawRow[]>(`/${LOTTERY_DATASET_ID}.json`, { params });

    if (!data || data.length === 0) return null;

    const normalizedTarget = numero.trim().replace(/[-\s]/g, '').replace(/^0+/, '') || '0';

    const match = data.find((row) => {
      const raw = typeof row['numero_billete_ganador'] === 'string' ? row['numero_billete_ganador'] : '';
      const normalized = raw.trim().replace(/[-\s]/g, '').replace(/^0+/, '') || '0';
      return normalized === normalizedTarget;
    });

    return match ? (mapRow(match) ?? null) : null;
  }
}
