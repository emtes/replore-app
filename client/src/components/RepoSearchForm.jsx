import React, { Component } from 'react';

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
    fetch('/languages')
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
      <form onSubmit={this.handleSubmit}>
        <fieldset>
          <legend>Narrow Down Your Search</legend>
          <ul>
            <li>
              <label htmlFor="keywords">Keywords </label>
              <input
                id="keywords"
                type="text"
                onChange={this.handleKeywordChange}
                value={this.state.keywordsInput}
                placeholder="spending, transparency, API"
              />
            </li>

            <li>
              <label htmlFor="lang-select">Select a Language </label>
              {this.state.fetchedLanguages.length ? (
                <select
                  id="lang-select"
                  value={this.state.languageInput}
                  onChange={this.handleLangChange}
                >
                  <option value="">Any</option>
                  {this.state.fetchedLanguages.map((l, i) => (
                    <option key={l + i} value={l}>
                      {l[0].toUpperCase().concat(l.substr(1))}
                    </option>
                  ))}
                </select>
              ) : (
                <p>Loading...</p>
              )}
            </li>

            <li>
              <label htmlFor="repo-sort">Sort By </label>
              <select
                id="repo-sort"
                onChange={this.handleDateSortChange}
                value={this.state.sortInput}
              >
                <option value="" />
                <option value="modified">Last modified</option>
                <option value="created">Last created</option>
              </select>
            </li>

            <li>
              <input type="submit" value="Search" />
            </li>
          </ul>
        </fieldset>
      </form>
    );
  }
}

export default RepoSearchForm;
