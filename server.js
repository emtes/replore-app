require('dotenv').config();
const fetch = require('node-fetch');
const express = require('express');

const app = express();
const port = process.env.PORT || 5000;

app.get('/repos', async (req, res) => {
  try {
    const repos = await getFedRepos();
    res.status(200).json({ results: repos });
  } catch (e) {
    res.status(500).json({ error: '500 Failed to load resource.', details: e });
  }
});

app.get('/languages', async (req, res) => {
  try {
    const languages = await getFedLangs();
    res.status(200).json({ results: languages });
  } catch (e) {
    res.status(500).json({ error: '500 Failed to load resource.', details: e });
  }
});

app.listen(port, () => console.log(`Listening on port ${port}...`));

/**
 * Consumes response from /repos and cleans it for this usecase
 * @returns {Array} Array of objects representing repositories
 * @param {number} size - Amount of repositories to fetch. 300 default.
 */
async function getFedRepos(size = 300) {
  // arbitrary default, not too many/little. API default = 10, max = 1000
  const { repos } = await codeGovReq('/repos', size);
  return repos.map(repo => {
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
      score
    } = repo;
    return {
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
      agency: {
        name: agency.name,
        acronym: agency.acronym,
        website: agency.website
      },
      score
    };
  });
}

/**
 * Consumes response from /languages and formats it for usecase
 * @returns {Array} Array of strings representing languages
 */
async function getFedLangs() {
  const { languages } = await codeGovReq('/languages');
  return languages.sort((a, b) => b.numRepos - a.numRepos).map(l => l.name);
}

/**
 * Makes an authorized requeset to the specified Code.gov API endpoint
 * @param {string} endPoint - route appended to base URL
 * @param {number} size - amount of repos returned for /repos
 */
async function codeGovReq(endPoint, size) {
  const BASE_URL = 'https://api.code.gov';
  size = size ? `?size=${size}` : '';
  const reqInit = {
    headers: { 'x-api-key': process.env.GOV_API_KEY }
  };
  const res = await fetch(BASE_URL + endPoint + size, reqInit);
  return res.json();
}
