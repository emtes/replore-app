require('dotenv').config();
const path = require('path');
const fetch = require('node-fetch');
const express = require('express');

const app = express();
const port = process.env.PORT || 5000;

app.use(express.static(path.join(__dirname, 'client/build')));

/**
 * Makes an authorized requeset to the specified Code.gov API endpoint
 * @param {string} endPoint - route appended to base URL
 * @param {number} size - amount of repos returned for /repos
 */
const codeGovReq = async (endPoint, size) => {
  const BASE_URL = 'https://api.code.gov';
  const sizeQuery = size ? `?size=${size}` : '';
  const reqInit = {
    headers: { 'x-api-key': process.env.GOV_API_KEY },
  };
  const res = await fetch(BASE_URL + endPoint + sizeQuery, reqInit);
  return res.json();
};

/**
 * Consumes response from /repos and cleans it for this usecase
 * @returns {Array} Array of objects representing repositories
 * @param {number} size - Amount of repositories to fetch. 300 default.
 */
const getFedRepos = async (size = 300) => {
  const { repos } = await codeGovReq('/repos', size);

  return repos.map((repo) => {
    const {
      date,
      homepageURL,
      languages,
      name,
      description,
      organization,
      permissions,
      repositoryURL,
      tags,
      vcs,
      agency,
      score,
    } = repo;
    // not incredibly uniform data, for easier checks client-side
    return {
      date: date || null,
      homepageURL: homepageURL || null,
      languages: languages || null,
      name: name || null,
      description: description || null,
      organization: organization || null,
      permissions: permissions || null,
      repositoryURL: repositoryURL || null,
      tags: tags || null,
      vcs: vcs || null,
      agency: agency
        ? {
          name: agency.name,
          acronym: agency.acronym,
          website: agency.website,
        }
        : null,
      score: score || null,
    };
  });
};

app.get('/fed-repos', async (req, res) => {
  try {
    const repos = await getFedRepos();
    res.status(200).json({ results: repos });
  } catch (e) {
    res.status(500).json({ error: '500 Failed to load resource.', details: e });
  }
});

/**
 * Consumes response from /languages and formats it for usecase
 * @returns {Array} Array of strings representing languages
 */
const getFedLangs = async () => {
  const { languages } = await codeGovReq('/languages');
  // repo counds useful since they're from total and I just show a sample
  return languages.sort((a, b) => b.numRepos - a.numRepos).map((l) => l.name);
};

app.get('/fed-languages', async (req, res) => {
  try {
    const languages = await getFedLangs();
    res.status(200).json({ results: languages });
  } catch (e) {
    res.status(500).json({ error: '500 Failed to load resource.', details: e });
  }
});

app.get('*', (req, res) => {
  res.sendFile(path.join(`${__dirname}/client/build/index.html`));
});

app.listen(port, () => console.log(`Listening on port ${port}...`));
