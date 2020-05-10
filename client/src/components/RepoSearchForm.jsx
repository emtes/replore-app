import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';

class RepoSearchForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keywordsInput: '',
      languageInput: '',
      sortInput: '',
      fetchedLanguages: [],
    };

    this.handleLangChange = this.handleLangChange.bind(this);
    this.handleKeywordChange = this.handleKeywordChange.bind(this);
    this.handleDateSortChange = this.handleDateSortChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    fetch('/fed-languages')
      .then((res) => res.json())
      .then((data) => {
        const { results } = data;
        this.setState({ fetchedLanguages: results });
      });
  }

  handleKeywordChange(e) {
    let text = e.target.value;
    // I know, I don't like it either
    text = text.replace(/[!@#$%^&*()[\]\-_+=;:]/g, '');
    this.setState({ keywordsInput: text });
  }

  handleLangChange(e) {
    const language = e.target.value;
    this.setState({ languageInput: language });
  }

  handleDateSortChange(e) {
    const sortBy = e.target.value;
    this.setState({ sortInput: sortBy });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({ keywordsInput: '', languageInput: '', sortInput: '' });
    this.props.setLanguage(this.state.languageInput);
    this.props.setKeywords(this.state.keywordsInput);
    this.props.setDateSort(this.state.sortInput);
  }

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Row>
          <Form.Group as={Col} controlId="searchKeywords">
            <Form.Label>Keywords</Form.Label>
            <Form.Control
              placeholder="spending, github, API"
              onChange={this.handleKeywordChange}
              value={this.state.keywordsInput}
            />
          </Form.Group>

          <Form.Group as={Col} controlId="searchLanguage">
            <Form.Label>Language</Form.Label>
            <Form.Control
              as="select"
              value={this.state.languageInput}
              onChange={this.handleLangChange}
            >
              <option value="">Any</option>
              {this.state.fetchedLanguages.map((l, i) => (
                <option key={l + i} value={l}>
                  {l[0].toUpperCase().concat(l.substr(1))}
                </option>
              ))}
            </Form.Control>
          </Form.Group>

          <Form.Group as={Col} controlId="searchDates">
            <Form.Label>Sort By Dates</Form.Label>
            <Form.Control
              as="select"
              onChange={this.handleDateSortChange}
              value={this.state.sortInput}
            >
              <option value="">None</option>
              <option value="modified">Last modified</option>
              <option value="created">Last created</option>
            </Form.Control>
          </Form.Group>
        </Form.Row>
        <Button variant="primary" type="submit">
          Search
        </Button>
        {' '}
        <Button variant="secondary" type="submit" onClick={this.props.handleClearSearch}>
          Clear Search
        </Button>
      </Form>
    );
  }
}

export default RepoSearchForm;
