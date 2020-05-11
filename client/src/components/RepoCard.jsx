import React from 'react';
import Card from 'react-bootstrap/Card';

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
    <Card>
      <Card.Header>
        <Card.Text>
          <small className="text-muted">
            <strong>Score: </strong>
            {score}
          </small>
          <br />
          <small className="text-muted">
            <strong>Last Modified: </strong>
            {new Date(date.lastModified).toDateString()}
          </small>
          <br />
          <small className="text-muted">
            <strong>Created: </strong>
            {new Date(date.created).toDateString()}
          </small>
        </Card.Text>
      </Card.Header>

      <Card.Body>
        <Card.Title className="text-center">
          <code>{name}</code>
        </Card.Title>
        <Card.Subtitle className="text-center">{organization}</Card.Subtitle>
        <Card.Text>
          <br />
          <strong className="text-muted">About</strong>
          <br />
          {description}
        </Card.Text>

        {languages ? (
          <section>
            <strong className="text-muted">Languages</strong>
            <br />
            <ul>
              {languages.map((l, i) => (
                <li key={l + i}>{l}</li>
              ))}
            </ul>
          </section>
        ) : (
          ''
        )}

        {tags ? (
          <section>
            <strong className="text-muted">Tags</strong>
            <br />
            <ul>
              {tags.map((t, i) => (
                <li key={t + i}>{t}</li>
              ))}
            </ul>
          </section>
        ) : (
          ''
        )}

        <Card.Link href={repositoryURL}>Repository</Card.Link>
        {homepageURL ? <Card.Link href={homepageURL}>Homepage</Card.Link> : ''}
        {agency ? <Card.Link href={agency.website}>{agency.name}</Card.Link> : ''}
      </Card.Body>

      <Card.Footer>
        <Card.Text>
          <small className="text-muted">
            <strong>VCS: </strong>
            {vcs}
          </small>
          <br />
          {permissions.licenses ? (
            <small className="text-muted">
              <strong>License: </strong>
              {permissions.licenses[0].name}
            </small>
          ) : (
            ''
          )}
        </Card.Text>
      </Card.Footer>
    </Card>
  );
}

export default RepoCard;
