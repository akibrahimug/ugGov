import { organisations } from './organisations';
import { programmes } from './programmes';
import { news } from './news';
import { publications } from './publications';
import { guides } from './guides';
import { services } from './services';
import { people, roles } from './people';

const all = [
  ...organisations,
  ...programmes,
  ...news,
  ...publications,
  ...guides,
  ...services,
  ...people,
  ...roles,
];

const byId = new Map(all.map((doc) => [doc._id, doc]));

export function lookup<T = unknown>(id: string): T | undefined {
  return byId.get(id) as T | undefined;
}
