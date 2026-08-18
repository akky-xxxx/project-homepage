import * as migration_20260802_122917_initial from './20260802_122917_initial';
import * as migration_20260816_140953_add_two_factor_auth from './20260816_140953_add_two_factor_auth';

export const migrations = [
  {
    up: migration_20260802_122917_initial.up,
    down: migration_20260802_122917_initial.down,
    name: '20260802_122917_initial',
  },
  {
    up: migration_20260816_140953_add_two_factor_auth.up,
    down: migration_20260816_140953_add_two_factor_auth.down,
    name: '20260816_140953_add_two_factor_auth'
  },
];
