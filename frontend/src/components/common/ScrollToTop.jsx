import { useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';


const resetScrollPosition = () => {
  window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;

  document.querySelectorAll('.page-shell__content').forEach((element) => {
    element.scrollTop = 0;
  });
};

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    resetScrollPosition();
  }, [pathname]);

  return null;
};

export default ScrollToTop;
