import { Move } from 'pokenode-ts';
import MainClient from './MainClient';
import { getResourceId } from '@/helpers';

export const ContestApi = {
  getSuperContestEffectById: async (id: number) =>
    await MainClient.contest.getSuperContestEffectById(id),

  getContestEffectById: async (id: number) => await MainClient.contest.getContestEffectById(id),

  getMoveContestEffects: async (move: Move) => {
    const { super_contest_effect, contest_effect } = move;

    const superContestEffectPromise = super_contest_effect
      ? ContestApi.getSuperContestEffectById(getResourceId(super_contest_effect.url))
      : null;

    const contestEffectPromise = contest_effect
      ? ContestApi.getContestEffectById(getResourceId(contest_effect.url))
      : null;

    const [superContestEffectData, contestEffectData] = await Promise.all([
      superContestEffectPromise,
      contestEffectPromise,
    ]);

    if (superContestEffectData) {
      delete superContestEffectData.moves;
      superContestEffectData.flavor_text_entries =
        superContestEffectData.flavor_text_entries.filter(({ language }) => language.name === 'en');
    }

    return { superContestEffectData, contestEffectData };
  },
};
