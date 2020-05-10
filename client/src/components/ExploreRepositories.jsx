import React, { useState, useEffect } from 'react';
import RepoCard from './RepoCard';
import RepoSearchForm from './RepoSearchForm';

const ReposList = ({ filteredRepos }) => (
  <ul>
    {filteredRepos.map((repo, i) => (
      <li key={repo.name + i}>
        <RepoCard repo={repo} />
      </li>
    ))}
  </ul>
);

function ExploreRepositories() {
  const [repos, setRepos] = useState([]);
  const [filteredRepos, setFilteredRepos] = useState([]);
  const [keywords, setKeywords] = useState('');
  const [language, setLanguage] = useState('');
  const [dateSort, setDateSort] = useState('');

  const getRepos = async () => {
    const res = await fetch('/repos');
    if (res.status === 200) {
      const { results } = await res.json();
      setRepos([...results]);
      setFilteredRepos([...results]);
    }
  };

  useEffect(() => {
    getRepos();
  }, []);

  // test
  useEffect(() => {
    if (keywords) {
      const keyWordArr = keywords.split(',').map((w) => w.trim());
      const newFilteredRepos = filteredRepos.filter((repo) => {
        for (let i = 0; i < keyWordArr.length; i += 1) {
          if (repo.tags) {
            if (repo.tags.includes(keyWordArr[i])) return true;
          }
        }
        return false;
      });
      setFilteredRepos(newFilteredRepos);
      setKeywords('');
      setLanguage('');
      setDateSort('');
    }
  }, [keywords, filteredRepos, setFilteredRepos]);

  // test
  useEffect(() => {
    if (language) {
      const newFilteredRepos = filteredRepos.filter((repo) => {
        if (repo.languages) {
          return repo.languages.includes(language);
        }
        return false;
      });
      setFilteredRepos(newFilteredRepos);
      setKeywords('');
      setLanguage('');
      setDateSort('');
    }
  }, [language, filteredRepos, setFilteredRepos]);

  // test
  useEffect(() => {
    if (dateSort === 'created') {
      const newFilteredRepos = filteredRepos.sort((a, b) => {
        const aDate = new Date(a.date.created);
        const bDate = new Date(b.date.created);
        return bDate - aDate;
      });
      setFilteredRepos(newFilteredRepos);
      setKeywords('');
      setLanguage('');
      setDateSort('');
    }

    if (dateSort === 'modified') {
      const newFilteredRepos = filteredRepos.sort((a, b) => {
        const aDate = new Date(a.date.lastModified);
        const bDate = new Date(b.date.lastModified);
        return bDate - aDate;
      });
      setFilteredRepos(newFilteredRepos);
      setKeywords('');
      setLanguage('');
      setDateSort('');
    }
  }, [dateSort, filteredRepos]);

  return (
    <main>
      <RepoSearchForm
        language={language}
        setLanguage={setLanguage}
        keywords={keywords}
        setKeywords={setKeywords}
        dateSort={dateSort}
        setDateSort={setDateSort}
      />
      {repos.length ? (
        <>
          <button
            type="button"
            onClick={() => {
              setKeywords('');
              setLanguage('');
              setDateSort('');
              setFilteredRepos(repos);
            }}
          >
            Reset Search
          </button>
          <p>
            Seeing:
            {filteredRepos.length}
          </p>
          <ReposList filteredRepos={filteredRepos} />
        </>
      ) : (
        <p>Loading...</p>
      )}
    </main>
  );
}

export default ExploreRepositories;
