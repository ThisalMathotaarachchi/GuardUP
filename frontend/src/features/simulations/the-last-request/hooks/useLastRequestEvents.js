import { useEffect, useRef } from 'react';
import { STORY_EVENTS } from '../../../../data/simulations/last-request/storyEvents';
export const useLastRequestEvents = ({ state, dispatch, onOpenApp, onStartResolution }) => {
  const startRef = useRef(Date.now());
  const firedRef = useRef(new Set());

  useEffect(() => {
    startRef.current = Date.now();
    firedRef.current = new Set();
  }, []);

  useEffect(() => {
    const interval = window.setInterval(() => {
      dispatch({ type: 'TICK', minutes: 1 });
    }, 5000);

    return () => clearInterval(interval);
  }, [dispatch]);

  useEffect(() => {
    const tick = window.setInterval(() => {
      const elapsed = Date.now() - startRef.current;

      STORY_EVENTS.forEach((event) => {
        if (firedRef.current.has(event.id)) return;
        if (elapsed < event.delayMs) return;
        if (event.requires && !event.requires(state)) return;
        if (state.triggeredEvents.includes(event.id)) return;

        firedRef.current.add(event.id);
        dispatch({ type: 'MARK_EVENT', eventId: event.id });

        if (event.notification) {
          dispatch({
            type: 'ADD_NOTIFICATION',
            notification: {
              id: `n-${event.id}`,
              ...event.notification,
              eventId: event.id,
            },
          });
        }

        switch (event.type) {
          case 'email':
            dispatch({ type: 'ADD_EMAIL', emailId: event.emailId });
            break;
          case 'chat-message':
            dispatch({ type: 'ADD_CHAT', channelId: event.payload.channelId, message: event.payload.message });
            if (event.payload.prompt) {
              dispatch({ type: 'SET_PROMPT', prompt: event.payload.prompt });
            }
            break;
          case 'auth-alert':
            dispatch({ type: 'AUTH_ALERT' });
            dispatch({
              type: 'SET_PROMPT',
              prompt: { decisionId: 'auth-incident', context: 'security' },
            });
            break;
          case 'force-resolution':
            if (!state.completed && !state.flags.resolutionStarted) {
              dispatch({ type: 'START_RESOLUTION' });
              dispatch({
                type: 'SET_PROMPT',
                prompt: { decisionId: 'final-response', context: 'security' },
              });
              onStartResolution?.();
            }
            break;
          default:
            break;
        }
      });

      if (state.phase === 'resolution' && state.activePrompt?.decisionId === 'final-response') {
        
      }
    }, 1000);

    return () => clearInterval(tick);
  }, [state, dispatch, onOpenApp, onStartResolution]);

  useEffect(() => {
    if (state.flags.danielRequestResolved && state.flags.itRequestResolved && state.flags.authAlertResolved) {
      if (!state.flags.resolutionStarted && !state.completed) {
        dispatch({ type: 'START_RESOLUTION' });
        dispatch({
          type: 'SET_PROMPT',
          prompt: { decisionId: 'final-response', context: 'security' },
        });
        onStartResolution?.();
      }
    }
  }, [
    state.flags.danielRequestResolved,
    state.flags.itRequestResolved,
    state.flags.authAlertResolved,
    state.flags.resolutionStarted,
    state.completed,
    dispatch,
    onStartResolution,
  ]);
};

export default useLastRequestEvents;
