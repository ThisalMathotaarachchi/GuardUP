import { useState, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';
import { awardAchievement } from '../services/achievementService';


export const useAchievementAward = () => {
  const { updateUser } = useAuth();
  const [celebrationBadges, setCelebrationBadges] = useState([]);

  const dismissCelebration = useCallback(() => {
    setCelebrationBadges([]);
  }, []);

  const award = useCallback(async (payload) => {
    try {
      const data = await awardAchievement(payload);
      if (!data) return null;

      if (data.user) {
        updateUser(data.user);
      }

      const fresh = (data.newBadges?.length ? data.newBadges : (data.isNew && data.badge ? [data.badge] : []));
      if (fresh.length) {
        setCelebrationBadges((prev) => {
          const existingIds = new Set(prev.map((b) => b.id));
          const additions = fresh.filter((b) => b?.id && !existingIds.has(b.id));
          return additions.length ? [...prev, ...additions] : prev;
        });
      }

      return data;
    } catch (error) {
      console.error('Achievement award failed:', error);
      return null;
    }
  }, [updateUser]);

  return {
    award,
    celebrationBadges,
    dismissCelebration,
    hasCelebration: celebrationBadges.length > 0,
  };
};

export default useAchievementAward;
