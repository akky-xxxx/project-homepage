import * as migration_20260802_122917_initial from './20260802_122917_initial';
import * as migration_20260816_140953_add_two_factor_auth from './20260816_140953_add_two_factor_auth';
import * as migration_20260824_100550_add_api_keys_collection from './20260824_100550_add_api_keys_collection';

export const migrations = [
  {
    up: migration_20260802_122917_initial.up,
    down: migration_20260802_122917_initial.down,
    name: '20260802_122917_initial',
  },
  {
    up: migration_20260816_140953_add_two_factor_auth.up,
    down: migration_20260816_140953_add_two_factor_auth.down,
    name: '20260816_140953_add_two_factor_auth',
  },
  {
    up: migration_20260824_100550_add_api_keys_collection.up,
    down: migration_20260824_100550_add_api_keys_collection.down,
    name: '20260824_100550_add_api_keys_collection'
  },
];
