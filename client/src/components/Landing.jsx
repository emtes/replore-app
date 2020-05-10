import React from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function Landing() {
  return (
    <>
      <Jumbotron>
        <h1 className="text-center">Replore</h1>
        <p className="text-center">
          Replore is an application for you to
          {' '}
          <strong>explore</strong>
          {' '}
          federal
          {' '}
          <strong>repositories</strong>
          .
        </p>
        <p className="text-center">
          <Button variant="primary" href="/repos">
            See repositories
          </Button>
        </p>
      </Jumbotron>

      <Card border="light">
        <Card.Body>
          <Card.Title className="text-center">Discover</Card.Title>
          <Card.Text className="text-center">
            Discover hundreds of repositories index by
            {' '}
            <a href="https://www.code.gov/">Code.gov</a>
            .
            Browse these easy to consume cards providing you with ample information about each
            project
          </Card.Text>
        </Card.Body>
      </Card>

      <Card border="light">
        <Card.Body>
          <Card.Title className="text-center">Contribute</Card.Title>
          <Card.Text className="text-center">
            Interested in contributing to an open-source project? Find projects by searching for
            programming language and tags. Sort them by the date they were created or when they were
            last modified.
          </Card.Text>
        </Card.Body>
      </Card>

      <Card border="light">
        <Card.Body>
          <Card.Title className="text-center">Learn</Card.Title>
          <Card.Text className="text-center">
            Learn about America's open source. Gain awareness of the projects helping different
            government agencies serve the public.
          </Card.Text>
        </Card.Body>
      </Card>
    </>
  );
}

export default Landing;
