import { useCallback, useRef, useState } from 'react';

import WorkplaceWindow from './components/WorkplaceWindow';

import WorkplaceTaskbar from './components/WorkplaceTaskbar';

import WorkplaceDesktop from './components/WorkplaceDesktop';

import WorkstationBoot from './components/WorkstationBoot';

import NotificationCenter from './components/NotificationCenter';

import WorkplaceGuidance from './components/WorkplaceGuidance';

import IncidentOutcomeOverlay from './components/IncidentOutcomeOverlay';

import EmailApp from './components/apps/EmailApp';

import ChatApp from './components/apps/ChatApp';

import SecurityCenterApp from './components/apps/SecurityCenterApp';

import DirectoryApp from './components/apps/DirectoryApp';

import BrowserApp from './components/apps/BrowserApp';

import FileExplorerApp from './components/apps/FileExplorerApp';

import { useLastRequestStory } from './hooks/useLastRequestStory';

import { useWorkplaceApps } from './hooks/useWorkplaceApps';

import { useLastRequestEvents } from './hooks/useLastRequestEvents';

import { buildLastRequestReport } from '../../../data/simulations/last-request/reportBuilder';

import {

  Mail,

  MessageSquare,

  Globe,

  FolderOpen,

  Users,

  Shield,

} from 'lucide-react';



const APP_META = {

  mail: { title: 'Mail', icon: Mail, offset: { top: '8%', left: '10%' } },

  chat: { title: 'Chat', icon: MessageSquare, offset: { top: '12%', left: '18%' } },

  browser: { title: 'Browser', icon: Globe, offset: { top: '10%', left: '26%' } },

  files: { title: 'File Explorer', icon: FolderOpen, offset: { top: '14%', left: '34%' } },

  directory: { title: 'Employee Directory', icon: Users, offset: { top: '18%', left: '12%' } },

  security: { title: 'Security Center', icon: Shield, offset: { top: '16%', left: '22%' } },

};



const LastRequestWorkspace = ({ onComplete }) => {

  const [booted, setBooted] = useState(false);

  const [showWelcome, setShowWelcome] = useState(true);

  const [dismissedTips, setDismissedTips] = useState(() => new Set());

  const { state, dispatch, makeDecision } = useLastRequestStory();

  const apps = useWorkplaceApps();

  const completionSentRef = useRef(false);

  const stateRef = useRef(state);

  stateRef.current = state;



  const dismissTip = useCallback((tipId) => {

    setDismissedTips((prev) => new Set(prev).add(tipId));

  }, []);



  const handleInteract = useCallback(() => {

    dismissTip('unread');

  }, [dismissTip]);



  const handleOpenApp = useCallback(

    (appId) => {

      handleInteract();

      if (appId === 'security') dismissTip('security');

      apps.openApp(appId);

      dispatch({ type: 'CLEAR_UNREAD', app: appId });

    },

    [apps, dispatch, handleInteract, dismissTip]

  );



  const handleStartResolution = useCallback(() => {

    apps.openApp('security');

  }, [apps]);



  useLastRequestEvents({

    state,

    dispatch,

    onOpenApp: handleOpenApp,

    onStartResolution: handleStartResolution,

  });



  const handleDecision = useCallback(

    (decisionId, optionId) => {

      handleInteract();

      makeDecision(decisionId, optionId);



      if (decisionId === 'final-response') {

        window.setTimeout(() => {

          dispatch({ type: 'SET_OUTCOME' });

        }, 1200);

      }



      if (decisionId === 'auth-incident' && optionId === 'report-immediately') {

        dispatch({ type: 'REPORT_INCIDENT' });

      }

      if (decisionId === 'it-verification' && optionId === 'report-impersonation') {

        dispatch({ type: 'REPORT_INCIDENT' });

      }

    },

    [makeDecision, dispatch, handleInteract]

  );



  const handleOutcomeFinished = useCallback(() => {

    if (completionSentRef.current) return;

    completionSentRef.current = true;

    onComplete?.(buildLastRequestReport(stateRef.current));

  }, [onComplete]);



  const handleNotificationOpen = useCallback(

    (notification) => {

      handleInteract();

      const app = notification.app || 'mail';

      handleOpenApp(app);

      dispatch({ type: 'DISMISS_NOTIFICATION', id: notification.id });

    },

    [handleOpenApp, dispatch, handleInteract]

  );



  const handleReadEmail = useCallback(

    (emailId, inspectHeaders) => {

      handleInteract();

      dispatch({ type: 'READ_EMAIL', emailId, inspectHeaders });

    },

    [dispatch, handleInteract]

  );



  const handleInspectHeaders = useCallback(

    (emailId) => {

      handleInteract();

      dispatch({ type: 'READ_EMAIL', emailId, inspectHeaders: true });

    },

    [dispatch, handleInteract]

  );



  const handleReportIncident = useCallback(() => {

    handleInteract();

    dismissTip('report');

    dispatch({ type: 'REPORT_INCIDENT' });

    if (!state.decisions.some((d) => d.decisionId === 'auth-incident')) {

      handleDecision('auth-incident', 'report-immediately');

    }

  }, [dispatch, state.decisions, handleDecision, handleInteract, dismissTip]);



  if (!booted) {

    return (

      <div className="lr-workspace">

        <WorkstationBoot onComplete={() => setBooted(true)} />

      </div>

    );

  }



  return (

    <div className="lr-workspace">

      <div className="lr-workspace__main">

        <WorkplaceDesktop simMinutes={state.simMinutes} unread={state.unread} onOpenApp={handleOpenApp} />



        <WorkplaceGuidance

          showWelcome={showWelcome && !state.completed}

          onDismissWelcome={() => setShowWelcome(false)}

          state={state}

          dismissedTips={dismissedTips}

          onDismissTip={dismissTip}

        />



        <div className="lr-desktop__windows">

          {Object.entries(APP_META).map(([appId, meta]) => (

            <WorkplaceWindow

              key={appId}

              appId={appId}

              title={meta.title}

              icon={meta.icon}

              open={apps.isOpen(appId)}

              minimized={apps.isMinimized(appId)}

              zIndex={apps.getZIndex(appId)}

              onClose={apps.closeApp}

              onMinimize={apps.minimizeApp}

              onFocus={apps.focusApp}

              style={meta.offset}

            >

              {appId === 'mail' && (

                <EmailApp

                  emails={state.emails}

                  onRead={handleReadEmail}

                  onInspectHeaders={handleInspectHeaders}

                />

              )}

              {appId === 'chat' && (

                <ChatApp

                  chat={state.chat}

                  activePrompt={state.activePrompt}

                  onDecision={handleDecision}

                  onInteract={handleInteract}

                />

              )}

              {appId === 'security' && (

                <SecurityCenterApp

                  authEvents={state.authEvents}

                  sessions={state.sessions}

                  activePrompt={state.activePrompt}

                  onDecision={handleDecision}

                  onReportIncident={handleReportIncident}

                  onInteract={handleInteract}

                />

              )}

              {appId === 'directory' && (

                <DirectoryApp

                  onVerify={() => {

                    handleInteract();

                    dispatch({ type: 'VERIFY_DIRECTORY' });

                  }}

                />

              )}

              {appId === 'browser' && <BrowserApp />}

              {appId === 'files' && (

                <FileExplorerApp

                  onOpenFile={(suspicious) => {

                    handleInteract();

                    dispatch({ type: 'OPEN_FILE', suspicious });

                  }}

                />

              )}

            </WorkplaceWindow>

          ))}

        </div>



        {!state.completed && (

          <NotificationCenter

            notifications={state.notifications}

            onOpen={handleNotificationOpen}

            onDismiss={(id) => dispatch({ type: 'DISMISS_NOTIFICATION', id })}

          />

        )}



        {state.outcomeType && (

          <IncidentOutcomeOverlay outcomeType={state.outcomeType} onFinished={handleOutcomeFinished} />

        )}

      </div>



      <WorkplaceTaskbar

        simMinutes={state.simMinutes}

        unread={state.unread}

        openApps={apps.openApps}

        onOpenApp={handleOpenApp}

        onFocusApp={apps.focusApp}

        notificationCount={state.notifications.length}

      />

    </div>

  );

};



export default LastRequestWorkspace;

