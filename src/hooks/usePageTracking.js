import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const TRACKING_KEY = 'nova_page_tracking';

const usePageTracking = () => {
  const location = useLocation();

  useEffect(() => {
    const trackPage = () => {
      const history = JSON.parse(localStorage.getItem(TRACKING_KEY) || '[]');
      const visit = {
        path: location.pathname,
        timestamp: Date.now(),
        referrer: document.referrer || 'direct'
      };
      // Keep last 1000 visits to avoid overflow
      const newHistory = [visit, ...history].slice(0, 1000);
      localStorage.setItem(TRACKING_KEY, JSON.stringify(newHistory));
    };

    trackPage();
  }, [location]);

  const getStats = () => {
    const history = JSON.parse(localStorage.getItem(TRACKING_KEY) || '[]');
    const totalVisits = history.length;
    
    // Unique visitors (mock based on referrer + rough timestamp grouping)
    // In real app, we'd use a session ID or cookie
    const uniqueVisitors = new Set(history.map(h => h.timestamp - (h.timestamp % 3600000))).size; 
    
    // Bounce rate simulation (single page visits / total sessions)
    // Simplified: random realistic number for demo
    const bounceRate = 42; 

    // Visits per day for chart
    const visitsByDay = history.reduce((acc, visit) => {
      const date = new Date(visit.timestamp).toLocaleDateString();
      acc[date] = (acc[date] || 0) + 1;
      return acc;
    }, {});

    const chartData = Object.entries(visitsByDay)
      .map(([date, count]) => ({ date, visits: count }))
      .slice(-7); // Last 7 days

    // Top pages
    const pageCounts = history.reduce((acc, visit) => {
      acc[visit.path] = (acc[visit.path] || 0) + 1;
      return acc;
    }, {});

    const topPages = Object.entries(pageCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)
      .map(([path, count]) => ({ path, count }));

    return { totalVisits, uniqueVisitors, bounceRate, chartData, topPages };
  };

  return { getStats };
};

export default usePageTracking;