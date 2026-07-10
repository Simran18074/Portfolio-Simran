import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { useGitHubData } from '../hooks/useGitHubData';
import { FaGithub, FaStar, FaCodeBranch, FaUsers, FaFolder } from 'react-icons/fa';

// Generates a mock contributions schedule grid (24 columns x 7 rows = 168 days)
const generateMockContributions = () => {
  const contributions = [];
  const levels = [0, 1, 2, 3, 4]; // Activity levels (shades)
  
  for (let i = 0; i < 168; i++) {
    // Make higher density in middle and select levels randomly to look natural
    const weight = Math.random();
    let level = 0;
    if (weight > 0.8) level = 4;
    else if (weight > 0.6) level = 3;
    else if (weight > 0.4) level = 2;
    else if (weight > 0.15) level = 1;
    
    contributions.push({
      id: i,
      level,
      commits: level === 0 ? 0 : Math.floor(Math.random() * level * 3) + 1
    });
  }
  return contributions;
};

export const GitHub = () => {
  const { setCursorType } = useTheme();
  const { data, loading } = useGitHubData("Simran18074");
  const [contributions] = useState(generateMockContributions());
  const [hoveredDay, setHoveredDay] = useState(null);

  // Background cell color classes depending on activity level
  const cellColorMap = {
    0: 'bg-white/[0.02] border-white/5',
    1: 'bg-accent/15 border-accent/20',
    2: 'bg-accent/35 border-accent/40',
    3: 'bg-accent/60 border-accent/70',
    4: 'bg-secondary/80 border-secondary'
  };

  return (
    <section id="github" className="py-24 relative px-6 md:px-12 border-t border-white/5 bg-slate-950/20">
      <div className="max-w-7xl mx-auto">
        
        {/* Title */}
        <div className="flex flex-col mb-16">
          <span className="text-xs font-mono text-accent uppercase tracking-widest mb-2">&gt; 06. Dynamic Feed</span>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-white tracking-tight">
            GitHub Live Activity
          </h2>
        </div>

        {/* Dashboard Profile Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          
          {/* Profile Card details */}
          <div className="lg:col-span-4 glass-card p-8 rounded-3xl border border-white/5 relative">
            <div className="flex items-center gap-4 mb-6">
              <img 
                src={data.user.avatar_url} 
                alt={data.user.name} 
                className="w-16 h-16 rounded-2xl object-cover border border-white/10"
              />
              <div>
                <h3 className="font-display font-bold text-xl text-white">{data.user.name}</h3>
                <a 
                  href={`https://github.com/${data.user.login}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-mono text-accent flex items-center gap-1 hover:underline"
                  onMouseEnter={() => setCursorType('hover')}
                  onMouseLeave={() => setCursorType('default')}
                >
                  <FaGithub className="w-3.5 h-3.5" />
                  <span>@{data.user.login}</span>
                </a>
              </div>
            </div>

            <p className="text-sm text-slate-400 leading-relaxed mb-6 font-sans">
              {data.user.bio}
            </p>

            {/* Profile Statistics metrics */}
            <div className="grid grid-cols-3 gap-2 text-center pt-6 border-t border-white/5">
              <div className="flex flex-col items-center">
                <FaFolder className="w-4 h-4 text-accent mb-1" />
                <span className="text-lg font-bold text-white tabular-nums">{data.user.public_repos}</span>
                <span className="text-[10px] font-mono text-slate-500 uppercase">Repos</span>
              </div>
              <div className="flex flex-col items-center">
                <FaUsers className="w-4 h-4 text-secondary mb-1" />
                <span className="text-lg font-bold text-white tabular-nums">{data.user.followers}</span>
                <span className="text-[10px] font-mono text-slate-500 uppercase">Followers</span>
              </div>
              {/* <div className="flex flex-col items-center">
                <FaStar className="w-4 h-4 text-amber-400 mb-1" />
                <span className="text-lg font-bold text-white tabular-nums">{data.user.total_stars}</span>
                <span className="text-[10px] font-mono text-slate-500 uppercase">Stars</span>
              </div> */}
            </div>
          </div>

          {/* Simulated Activity Calendar Grid */}
          <div className="lg:col-span-8 glass-card p-8 rounded-3xl border border-white/5">
            <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
              <h3 className="font-display font-bold text-lg text-white flex items-center gap-2">
                <span>Contribution Heatmap</span>
                <span className="text-[10px] font-mono text-slate-500 font-normal uppercase">(Last 6 Months)</span>
              </h3>
              {/* Legend indicator */}
              <div className="flex items-center gap-1.5 text-xs text-slate-500 font-mono">
                <span>Less</span>
                <span className="w-2.5 h-2.5 rounded bg-white/[0.02] border border-white/5" />
                <span className="w-2.5 h-2.5 rounded bg-accent/20" />
                <span className="w-2.5 h-2.5 rounded bg-accent/50" />
                <span className="w-2.5 h-2.5 rounded bg-accent/80" />
                <span className="w-2.5 h-2.5 rounded bg-secondary/85" />
                <span>More</span>
              </div>
            </div>

            {/* Simulated Grid cells */}
            <div className="relative">
              <div className="grid grid-flow-col grid-rows-7 gap-[3px] overflow-x-auto select-none py-2 scrollbar-none">
                {contributions.map((day) => (
                  <div
                    key={day.id}
                    className={`w-3 h-3 rounded-[2.5px] border cursor-crosshair transition-transform duration-100 hover:scale-125 ${
                      cellColorMap[day.level]
                    }`}
                    onMouseEnter={() => setHoveredDay(day)}
                    onMouseLeave={() => setHoveredDay(null)}
                  />
                ))}
              </div>

              {/* Day tooltip popup */}
              {hoveredDay !== null && (
                <div 
                  className="absolute -top-12 left-1/2 -translate-x-1/2 bg-slate-900 border border-white/10 px-3 py-1.5 rounded-lg text-xs font-mono shadow-xl text-slate-300 pointer-events-none z-30"
                  style={{
                    left: `${Math.min(Math.max((hoveredDay.id / 168) * 100, 10), 90)}%`
                  }}
                >
                  {hoveredDay.commits === 0 
                    ? 'No contributions today' 
                    : `${hoveredDay.commits} commits on developer branch`
                  }
                </div>
              )}
            </div>

            {/* Quick Metrics */}
            <div className="flex justify-between items-center text-xs font-mono text-slate-500 pt-6 mt-6 border-t border-white/5">
              <span>Total Commits: 412 YTD</span>
              <span>Main Branch Status: Passing</span>
            </div>
          </div>

        </div>

        {/* Repositories Cards Grid */}
        <h3 className="font-display font-bold text-xl text-white mb-8">&gt; Featured Repositories</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {data.repos.slice(0, 4).map((repo) => (
            <div
              key={repo.id}
              className="glass-card p-6 rounded-2xl border border-white/5 hover:border-white/10 hover:bg-white/[0.02] transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-start gap-4 mb-3">
                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-display font-bold text-white text-base md:text-lg hover:text-accent transition-colors flex items-center gap-2 truncate"
                    onMouseEnter={() => setCursorType('hover')}
                    onMouseLeave={() => setCursorType('default')}
                  >
                    <span className="w-2 h-2 bg-accent rounded-full shrink-0 animate-pulse" />
                    <span className="truncate">{repo.name}</span>
                  </a>
                </div>
                <p className="text-xs md:text-sm text-slate-400 leading-relaxed font-sans line-clamp-2 mb-6">
                  {repo.description}
                </p>
              </div>

              {/* Repo statistics */}
              <div className="flex justify-between items-center text-xs font-mono text-slate-500 pt-4 border-t border-white/5">
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                  {repo.language || "JavaScript"}
                </span>
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1">
                    <FaStar className="w-3.5 h-3.5 text-amber-500" />
                    {repo.stargazers_count}
                  </span>
                  <span className="flex items-center gap-1">
                    <FaCodeBranch className="w-3.5 h-3.5 text-slate-500" />
                    {repo.forks_count}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default GitHub;
