import React from 'react';

function RepoCard({ repo }) {
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

  return (
    <article className="repo">
      <h1>{name}</h1>
      <p>{organization}</p>
      <p>{description}</p>

      <dl className="dates">
        <dt>Date Created</dt>
        <dd>{date.created}</dd>

        <dt>Last Modified</dt>
        <dd>{date.lastModified}</dd>
      </dl>

      <section className="languages">
        <h2>Languages</h2>
        <ul>{languages ? languages.map((l, i) => <li key={l + i}>{l}</li>) : null}</ul>
      </section>

      <section className="tags">
        <h2>Tags</h2>
        <ul>{tags ? tags.map((t, i) => <li key={t + i}>{t}</li>) : null}</ul>
      </section>

      <section className="project-links">
        <h2>Links</h2>
        <ul>
          {homepageURL ? (
            <li>
              <a href={homepageURL}>Homepage</a>
            </li>
          ) : null}

          <li>
            <a href={repositoryURL}>Repositoy</a>
          </li>
        </ul>
      </section>

      <dl className="agency-details">
        <dt>Agency</dt>
        <dd>{`${agency.name} (${agency.acronym})`}</dd>

        <dt>Website</dt>
        <dd>
          <a href={agency.website}>{agency.website}</a>
        </dd>
      </dl>

      <dl className="extras">
        <dt>VCS</dt>
        <dd>{vcs}</dd>

        <dt>Score</dt>
        <dd>{score}</dd>

        <dt>License</dt>
        <dd>{permissions.licenses ? permissions.licenses[0].name : 'Unknown'}</dd>
      </dl>
    </article>
  );
}

export default RepoCard;
